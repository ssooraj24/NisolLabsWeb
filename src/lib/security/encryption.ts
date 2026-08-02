import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recommended for GCM

function getMasterKey(): Buffer {
  const envKey = process.env.PII_ENCRYPTION_KEY || 'nisol-discovery-default-dev-secret-key-32b';
  // Ensure the key is exactly 32 bytes using SHA-256
  return crypto.createHash('sha256').update(envKey).digest();
}

/**
 * Encrypts any JSON-serializable payload using AES-256-GCM.
 * Output format: "iv_hex:auth_tag_hex:ciphertext_hex"
 */
export function encryptPayload(data: any): string {
  if (data === null || data === undefined) return '';
  
  const text = typeof data === 'string' ? data : JSON.stringify(data);
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getMasterKey();

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted payload string.
 * Returns the parsed JSON object or raw string.
 */
export function decryptPayload<T = any>(encryptedText: string | null | undefined): T | null {
  if (!encryptedText || !encryptedText.includes(':')) {
    return null;
  }

  try {
    const parts = encryptedText.split(':');
    if (parts.length !== 3) return null;

    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const key = getMasterKey();

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    try {
      return JSON.parse(decrypted) as T;
    } catch {
      return decrypted as unknown as T;
    }
  } catch (error) {
    console.error('[Encryption] Failed to decrypt payload:', error);
    return null;
  }
}
