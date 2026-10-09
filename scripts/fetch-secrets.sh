#!/usr/bin/env bash
# =============================================================================
# Automated AWS SSM Parameter Store Secret Injector
# Directly fetches known Nisol SSM parameters into .env
# =============================================================================

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
OUTPUT_ENV_FILE="${1:-.env}"

echo "[*] Fetching SSM parameters from AWS (Region: ${AWS_REGION})..."

BATCH1="ANTHROPIC_API_KEY BETTER_AUTH_SECRET BETTER_AUTH_URL GEMINI_API_KEY GROQ_API_KEY LITELLM_MASTER_KEY MGMT_ADMIN_USER NEXT_PUBLIC_APP_URL OPENAI_API_KEY POSTGRES_DB"
BATCH2="POSTGRES_MULTIPLE_DATABASES POSTGRES_PASSWORD POSTGRES_USER REDIS_PASSWORD S3_BACKUP_BUCKET"

TMP_ENV=$(mktemp)
chmod 600 "$TMP_ENV"

for BATCH in "$BATCH1" "$BATCH2"; do
    aws ssm get-parameters \
        --region "$AWS_REGION" \
        --with-decryption \
        --names $BATCH \
        --query "Parameters[*].[Name,Value]" \
        --output text | while IFS=$'\t' read -r name value; do
            if [ -n "$name" ] && [ -n "$value" ]; then
                echo "${name}=${value}" >> "$TMP_ENV"
                
                # Aliases for Next.js app
                if [ "$name" = "GEMINI_API_KEY" ]; then
                    echo "Gemini_NisolLabs_API_Key=${value}" >> "$TMP_ENV"
                elif [ "$name" = "OPENAI_API_KEY" ]; then
                    echo "OpenAI_NisolLabs_API_Key=${value}" >> "$TMP_ENV"
                elif [ "$name" = "ANTHROPIC_API_KEY" ]; then
                    echo "Claude_NisolLab_API_Key=${value}" >> "$TMP_ENV"
                fi
            fi
        done
done

mv "$TMP_ENV" "$OUTPUT_ENV_FILE"
chmod 600 "$OUTPUT_ENV_FILE"

COUNT=$(grep -v '^#' "$OUTPUT_ENV_FILE" | grep -v '^$' | wc -l)
echo "[+] Successfully generated '${OUTPUT_ENV_FILE}' with ${COUNT} parameters!"
