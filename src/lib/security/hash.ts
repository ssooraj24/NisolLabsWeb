import crypto from 'crypto';

function getHmacSalt(): string {
  return process.env.PII_HMAC_SALT || 'nisol-discovery-blind-index-salt-dev';
}

/**
 * Computes a deterministic HMAC-SHA256 blind index hash for exact matching.
 * Value is normalized (lowercased and trimmed) before hashing.
 */
export function generateBlindIndex(value: string | null | undefined): string | null {
  if (!value || !value.trim()) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  const salt = getHmacSalt();

  return crypto
    .createHmac('sha256', salt)
    .update(normalized)
    .digest('hex');
}
