#!/usr/bin/env python3
"""
AWS SSM Parameter Store Manager for Nisol Labs Infrastructure
Supports zero-leakage SecureString encryption, batch ingestion, 
and export for Nisol AI / ConductOS deployments.
"""

import os
import sys
import argparse
import getpass
from typing import Dict, List, Optional

try:
    import boto3
    from botocore.exceptions import ClientError, NoCredentialsError
except ImportError:
    print("[!] Error: 'boto3' is required. Install with: pip install boto3")
    sys.exit(1)


DEFAULT_REGION = os.environ.get("AWS_REGION", "ap-south-1")
DEFAULT_ENV = os.environ.get("ENV_NAME", "production")


def get_ssm_client(region_name: str = DEFAULT_REGION, profile_name: Optional[str] = None):
    try:
        session = boto3.Session(profile_name=profile_name, region_name=region_name)
        return session.client("ssm")
    except Exception as e:
        print(f"[!] Error creating AWS SSM client: {e}")
        sys.exit(1)


def put_parameter(
    client,
    name: str,
    value: str,
    param_type: str = "SecureString",
    description: str = "",
    overwrite: bool = True,
    kms_key_id: Optional[str] = None,
    tags: Optional[List[Dict[str, str]]] = None
) -> bool:
    try:
        kwargs = {
            "Name": name,
            "Value": value,
            "Type": param_type,
            "Description": description or f"Managed by Nisol Labs SSM Tool",
            "Overwrite": overwrite,
            "Tier": "Standard"
        }
        if param_type == "SecureString" and kms_key_id:
            kwargs["KeyId"] = kms_key_id
        if tags and not overwrite:
            kwargs["Tags"] = tags

        client.put_parameter(**kwargs)
        if tags:
            try:
                client.add_tags_to_resource(
                    ResourceType="Parameter",
                    ResourceId=name,
                    Tags=tags
                )
            except Exception:
                pass
        print(f"[+] Successfully set parameter: {name} (Type: {param_type})")
        return True
    except ClientError as e:
        print(f"[!] Failed to set parameter {name}: {e.response['Error']['Message']}")
        return False


def get_parameter(client, name: str, with_decryption: bool = True):
    try:
        res = client.get_parameter(Name=name, WithDecryption=with_decryption)
        return res["Parameter"]["Value"]
    except ClientError as e:
        print(f"[!] Parameter not found or access denied: {name} ({e.response['Error']['Message']})")
        return None


def list_parameters_by_path(client, path_prefix: str, with_decryption: bool = False) -> List[Dict]:
    params = []
    next_token = None
    try:
        while True:
            kwargs = {
                "Path": path_prefix,
                "Recursive": True,
                "WithDecryption": with_decryption,
                "MaxResults": 10
            }
            if next_token:
                kwargs["NextToken"] = next_token

            res = client.get_parameters_by_path(**kwargs)
            params.extend(res.get("Parameters", []))
            next_token = res.get("NextToken")
            if not next_token:
                break
        return params
    except ClientError as e:
        print(f"[!] Error listing parameters under {path_prefix}: {e.response['Error']['Message']}")
        return []


def push_env_file(client, env_file_path: str, path_prefix: str, secure_all: bool = True):
    if not os.path.exists(env_file_path):
        print(f"[!] Error: File '{env_file_path}' does not exist.")
        return

    if not path_prefix.endswith("/"):
        path_prefix += "/"

    print(f"[*] Ingesting parameters from '{env_file_path}' into AWS SSM path: {path_prefix}")
    count = 0
    with open(env_file_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" not in line:
                continue

            key, _, val = line.partition("=")
            key = key.strip()
            val = val.strip()

            # Remove optional quotes
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                val = val[1:-1]

            if not val:
                print(f"  [-] Skipping empty variable: {key}")
                continue

            param_name = f"{path_prefix}{key}"
            param_type = "SecureString" if secure_all else "String"
            if put_parameter(client, param_name, val, param_type=param_type):
                count += 1

    print(f"[+] Completed! Ingested {count} parameters into SSM.")


def export_env(client, project_name: str, env_name: str = DEFAULT_ENV, output_path: str = ".env"):
    fetch_paths = [
        f"/nisol/{env_name}/shared/",
        f"/nisol/{env_name}/{project_name}/"
    ]

    print(f"[*] Exporting parameters for project '{project_name}' (Environment: {env_name})...")
    secrets = {}

    for path in fetch_paths:
        print(f"  -> Querying SSM path: {path}")
        params = list_parameters_by_path(client, path, with_decryption=True)
        for p in params:
            key = p["Name"].split("/")[-1]
            secrets[key] = p["Value"]

    if not secrets:
        print(f"[!] No parameters found for '{project_name}' in environment '{env_name}'.")
        return

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"# Auto-generated from AWS SSM Parameter Store\n")
        f.write(f"# Project: {project_name} | Environment: {env_name}\n\n")
        for k, v in sorted(secrets.items()):
            f.write(f"{k}={v}\n")

    print(f"[+] Successfully exported {len(secrets)} parameters to '{output_path}'.")


def interactive_setup_nisolai(client, env_name: str = DEFAULT_ENV):
    print("=" * 70)
    print(f"  NISOL AI & LLM GATEWAY - AWS SSM PARAMETER STORE SETUP ({env_name})")
    print("=" * 70)
    print("This wizard will configure the parameters in AWS SSM Parameter Store under:")
    print(f"  - /nisol/{env_name}/shared/   (Shared Infra & LLM Gateway Keys)")
    print(f"  - /nisol/{env_name}/nisolai/  (Nisol AI Application Config)")
    print()

    shared_prefix = f"/nisol/{env_name}/shared/"
    nisol_prefix = f"/nisol/{env_name}/nisolai/"

    # --- 1. LLM API Keys ---
    print("--- STEP 1: Central LLM API Keys (LiteLLM Cascading Router) ---")
    llm_keys = [
        ("OPENAI_API_KEY", "OpenAI API Key (sk-proj-...)", "Tier 2 Safety Net / GPT-4o"),
        ("ANTHROPIC_API_KEY", "Anthropic Claude API Key (sk-ant-...)", "Claude 3.5 Sonnet / Haiku"),
        ("GEMINI_API_KEY", "Google Gemini API Key (AIzaSy...)", "Gemini 2.0 Flash / 1.5 Flash"),
        ("GROQ_API_KEY", "Groq Cloud API Key (gsk_...)", "Tier 1 Ultra-fast Llama 3.3"),
        ("CEREBRAS_API_KEY", "Cerebras API Key (csk-...) [Optional]", "Tier 1 High-speed Llama 70B"),
        ("OPENROUTER_API_KEY", "OpenRouter API Key (sk-or-...) [Optional]", "Universal LLM Failover")
    ]

    for env_var, label, desc in llm_keys:
        val = getpass.getpass(f"Enter {label} [{desc}] (leave blank to skip): ").strip()
        if val:
            tags = [
                {"Key": "Project", "Value": "shared"},
                {"Key": "Environment", "Value": env_name},
                {"Key": "Category", "Value": "llm"},
                {"Key": "ManagedBy", "Value": "ssm-tool"}
            ]
            put_parameter(client, f"{shared_prefix}{env_var}", val, "SecureString", description=desc, tags=tags)

    # --- 2. LiteLLM Master Key ---
    print("\n--- STEP 2: LiteLLM Internal Gateway Master Key ---")
    litellm_key = getpass.getpass("Enter LITELLM_MASTER_KEY (leave blank for default): ").strip()
    if litellm_key:
        tags = [
            {"Key": "Project", "Value": "shared"},
            {"Key": "Environment", "Value": env_name},
            {"Key": "Category", "Value": "gateway"},
            {"Key": "ManagedBy", "Value": "ssm-tool"}
        ]
        put_parameter(client, f"{shared_prefix}LITELLM_MASTER_KEY", litellm_key, "SecureString", "Internal AI Gateway Master Key", tags=tags)

    # --- 3. Better Auth & URLs ---
    print("\n--- STEP 3: Nisol AI Web Application & Auth Secrets ---")
    app_url = input("Enter NEXT_PUBLIC_APP_URL [default: https://app.nisolai.com]: ").strip() or "https://app.nisolai.com"
    app_tags = [
        {"Key": "Project", "Value": "nisolai"},
        {"Key": "Environment", "Value": env_name},
        {"Key": "Category", "Value": "app"},
        {"Key": "ManagedBy", "Value": "ssm-tool"}
    ]
    put_parameter(client, f"{nisol_prefix}NEXT_PUBLIC_APP_URL", app_url, "String", "Nisol AI Main URL", tags=app_tags)
    put_parameter(client, f"{nisol_prefix}BETTER_AUTH_URL", app_url, "String", "Better Auth Callback URL", tags=app_tags)

    better_auth_sec = getpass.getpass("Enter BETTER_AUTH_SECRET (32+ chars, leave blank to skip): ").strip()
    if better_auth_sec:
        auth_tags = [
            {"Key": "Project", "Value": "nisolai"},
            {"Key": "Environment", "Value": env_name},
            {"Key": "Category", "Value": "auth"},
            {"Key": "ManagedBy", "Value": "ssm-tool"}
        ]
        put_parameter(client, f"{nisol_prefix}BETTER_AUTH_SECRET", better_auth_sec, "SecureString", "Better Auth Encryption Secret", tags=auth_tags)

    # --- 4. Database Credentials ---
    print("\n--- STEP 4: PostgreSQL & Redis Passwords ---")
    db_tags = [
        {"Key": "Project", "Value": "shared"},
        {"Key": "Environment", "Value": env_name},
        {"Key": "Category", "Value": "database"},
        {"Key": "ManagedBy", "Value": "ssm-tool"}
    ]
    pg_pass = getpass.getpass("Enter POSTGRES_PASSWORD (leave blank to skip): ").strip()
    if pg_pass:
        put_parameter(client, f"{shared_prefix}POSTGRES_PASSWORD", pg_pass, "SecureString", "PostgreSQL Admin Password", tags=db_tags)
        put_parameter(client, f"{shared_prefix}POSTGRES_USER", "postgres", "String", "PostgreSQL User", tags=db_tags)
        put_parameter(client, f"{shared_prefix}POSTGRES_DB", "nisolai", "String", "PostgreSQL Main DB", tags=db_tags)
        put_parameter(client, f"{shared_prefix}POSTGRES_MULTIPLE_DATABASES", "conductos,nisolai,rosense,rofinvo,trypost,langfuse", "String", "Databases list", tags=db_tags)

    redis_pass = getpass.getpass("Enter REDIS_PASSWORD (leave blank to skip): ").strip()
    if redis_pass:
        cache_tags = [
            {"Key": "Project", "Value": "shared"},
            {"Key": "Environment", "Value": env_name},
            {"Key": "Category", "Value": "cache"},
            {"Key": "ManagedBy", "Value": "ssm-tool"}
        ]
        put_parameter(client, f"{shared_prefix}REDIS_PASSWORD", redis_pass, "SecureString", "Redis Main Password", tags=cache_tags)

    print("\n[+] SSM Setup wizard completed for Nisol AI!")


def main():
    parser = argparse.ArgumentParser(description="AWS SSM Parameter Store Manager for Nisol Labs")
    parser.add_argument("--region", default=DEFAULT_REGION, help=f"AWS Region (default: {DEFAULT_REGION})")
    parser.add_argument("--env", default=DEFAULT_ENV, help=f"Environment name (default: {DEFAULT_ENV})")
    parser.add_argument("--profile", default=None, help="AWS CLI profile name (optional)")

    subparsers = parser.add_subparsers(dest="command")

    # Interactive wizard
    subparsers.add_parser("wizard", help="Run interactive setup wizard for Nisol AI & LLM keys")

    # Put single
    put_p = subparsers.add_parser("put", help="Put a single parameter into SSM")
    put_p.add_argument("--name", required=True, help="Full parameter name e.g. /nisol/production/shared/OPENAI_API_KEY")
    put_p.add_argument("--value", required=True, help="Parameter value")
    put_p.add_argument("--type", default="SecureString", choices=["String", "SecureString", "StringList"], help="Parameter type")
    put_p.add_argument("--desc", default="", help="Description")

    # Put batch from .env
    batch_p = subparsers.add_parser("push-env", help="Push all variables from a .env file to SSM path")
    batch_p.add_argument("--file", default=".env", help="Path to .env file")
    batch_p.add_argument("--path", required=True, help="SSM Path prefix e.g. /nisol/production/nisolai/")

    # Get single
    get_p = subparsers.add_parser("get", help="Get a parameter value from SSM")
    get_p.add_argument("--name", required=True, help="Parameter name")
    get_p.add_argument("--no-decrypt", action="store_true", help="Do not decrypt SecureString")

    # List
    list_p = subparsers.add_parser("list", help="List parameters under a path")
    list_p.add_argument("--path", default="/nisol/production/", help="SSM Path prefix")

    # Export
    export_p = subparsers.add_parser("export", help="Export parameters to .env file for deployment")
    export_p.add_argument("--project", default="nisolai", help="Project name (nisolai, conductos, etc.)")
    export_p.add_argument("--output", default=".env", help="Output .env file path")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(0)

    client = get_ssm_client(region_name=args.region, profile_name=args.profile)

    if args.command == "wizard":
        interactive_setup_nisolai(client, env_name=args.env)
    elif args.command == "put":
        put_parameter(client, args.name, args.value, param_type=args.type, description=args.desc)
    elif args.command == "push-env":
        push_env_file(client, args.file, args.path)
    elif args.command == "get":
        val = get_parameter(client, args.name, with_decryption=not args.no_decrypt)
        if val is not None:
            print(f"{args.name} = {val}")
    elif args.command == "list":
        params = list_parameters_by_path(client, args.path, with_decryption=False)
        print(f"\nParameters under '{args.path}':")
        for p in params:
            print(f"  - {p['Name']} (Type: {p['Type']}, LastModified: {p['LastModifiedDate']})")
        print(f"Total: {len(params)} parameters\n")
    elif args.command == "export":
        export_env(client, project_name=args.project, env_name=args.env, output_path=args.output)


if __name__ == "__main__":
    main()
