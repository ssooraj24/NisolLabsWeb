#!/usr/bin/env bash
# =============================================================================
# Automated AWS SSM Parameter Store Secret Injector
# Fetches encrypted parameters from AWS SSM Parameter Store by project path
# Uses EC2 IAM Instance Profile
# =============================================================================

set -euo pipefail

AWS_REGION="${AWS_REGION:-ap-south-1}"
ENV_NAME="${ENV_NAME:-production}"
PROJECT_NAME="${1:-nisolai}" # e.g., nisolai, conductos, rosense, trypost, shared
OUTPUT_ENV_FILE="${2:-.env}"

echo "[*] Fetching encrypted secrets from AWS SSM for project: '${PROJECT_NAME}' (Env: ${ENV_NAME}, Region: ${AWS_REGION})..."

FETCH_PATHS=(
    "/nisol/${ENV_NAME}/shared/"
    "/nisol/${ENV_NAME}/${PROJECT_NAME}/"
)

TMP_ENV=$(mktemp)
chmod 600 "$TMP_ENV"

cat <<EOF > "$TMP_ENV"
# =============================================================================
# Dynamically generated from AWS SSM Parameter Store
# Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")
# Project: ${PROJECT_NAME} | Region: ${AWS_REGION}
# DO NOT EDIT DIRECTLY — UPDATE IN AWS SSM PARAMETER STORE
# =============================================================================
EOF

for PATH_PREFIX in "${FETCH_PATHS[@]}"; do
    echo "  -> Fetching path: ${PATH_PREFIX}"
    aws ssm get-parameters-by-path \
        --path "$PATH_PREFIX" \
        --recursive \
        --with-decryption \
        --region "$AWS_REGION" \
        --output json 2>/dev/null | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    for p in data.get('Parameters', []):
        key = p['Name'].split('/')[-1]
        val = p['Value']
        print(f'{key}={val}')
except Exception as e:
    pass
" >> "$TMP_ENV" || true
done

mv "$TMP_ENV" "$OUTPUT_ENV_FILE"
chmod 600 "$OUTPUT_ENV_FILE"

echo "[+] Successfully generated '${OUTPUT_ENV_FILE}' with AWS SSM secrets!"
