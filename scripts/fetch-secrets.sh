#!/usr/bin/env bash
# =============================================================================
# Automated AWS SSM Parameter Store Secret Injector
# Fetches all parameters (root & path-based) directly from AWS SSM
# =============================================================================

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
OUTPUT_ENV_FILE="${1:-.env}"

echo "[*] Discovering SSM parameters in region '${AWS_REGION}'..."

# Query all parameter names
PARAM_NAMES=$(aws ssm describe-parameters --region "$AWS_REGION" --query "Parameters[*].Name" --output text 2>/dev/null || true)

if [ -z "$PARAM_NAMES" ]; then
    echo "[!] No parameters returned from AWS SSM describe-parameters. Check your IAM role or region."
    exit 1
fi

TMP_ENV=$(mktemp)
chmod 600 "$TMP_ENV"

cat <<EOF > "$TMP_ENV"
# =============================================================================
# Dynamically generated from AWS SSM Parameter Store
# Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
# Region: ${AWS_REGION}
# =============================================================================
EOF

echo "[*] Fetching parameter values with decryption..."

# AWS SSM get-parameters accepts up to 10 names at a time
echo "$PARAM_NAMES" | tr '\t' '\n' | tr ' ' '\n' | grep -v '^$' | while read -r name; do
    echo "$name"
done | xargs -n 10 aws ssm get-parameters --region "$AWS_REGION" --with-decryption --query "Parameters[*].[Name,Value]" --output text --names | while IFS=$'\t' read -r name value; do
    key=$(basename "$name")
    echo "${key}=${value}" >> "$TMP_ENV"
    
    # Aliases for Next.js app environment variables
    if [ "$key" = "GEMINI_API_KEY" ]; then
        echo "Gemini_NisolLabs_API_Key=${value}" >> "$TMP_ENV"
    elif [ "$key" = "OPENAI_API_KEY" ]; then
        echo "OpenAI_NisolLabs_API_Key=${value}" >> "$TMP_ENV"
    elif [ "$key" = "ANTHROPIC_API_KEY" ]; then
        echo "Claude_NisolLab_API_Key=${value}" >> "$TMP_ENV"
    fi
done

mv "$TMP_ENV" "$OUTPUT_ENV_FILE"
chmod 600 "$OUTPUT_ENV_FILE"

echo "[+] Successfully exported $(grep -v '^#' "$OUTPUT_ENV_FILE" | grep -v '^$' | wc -l) secrets to '${OUTPUT_ENV_FILE}'!"
