/**
 * Utility for anonymizing sensitive PII before submitting data to external LLM APIs,
 * and rehydrating the response afterwards.
 */

export interface RedactionResult {
  redactedContent: string;
  piiMap: Record<string, string>; // placeholder -> original value
}

/**
 * Redacts target strings and PII patterns from text.
 * Replaces company names, emails, and custom entities with synthetic tokens.
 */
export function redactPII(
  content: string,
  entityMap?: { companyName?: string | null; customPii?: Record<string, string> }
): RedactionResult {
  if (!content) {
    return { redactedContent: '', piiMap: {} };
  }

  let redacted = content;
  const piiMap: Record<string, string> = {};

  // 1. Redact Client Company Name
  if (entityMap?.companyName && entityMap.companyName.trim().length > 1) {
    const origName = entityMap.companyName.trim();
    const token = '[CLIENT_ORGANIZATION]';
    
    // Escaping special characters in regex
    const escaped = origName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    
    if (regex.test(redacted)) {
      redacted = redacted.replace(regex, token);
      piiMap[token] = origName;
    }
  }

  // 2. Redact Custom PII pairs if provided
  if (entityMap?.customPii) {
    let tokenIndex = 1;
    for (const [key, value] of Object.entries(entityMap.customPii)) {
      if (value && typeof value === 'string' && value.trim().length > 1) {
        const orig = value.trim();
        const token = `[ANONYMIZED_ENTITY_${tokenIndex}]`;
        const escaped = orig.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, 'gi');

        if (regex.test(redacted)) {
          redacted = redacted.replace(regex, token);
          piiMap[token] = orig;
          tokenIndex++;
        }
      }
    }
  }

  // 3. Email Pattern Redaction
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  let emailCount = 1;
  redacted = redacted.replace(emailRegex, (match) => {
    const token = `[ANONYMIZED_EMAIL_${emailCount++}]`;
    piiMap[token] = match;
    return token;
  });

  return {
    redactedContent: redacted,
    piiMap,
  };
}

/**
 * Restores original PII strings back into the LLM-generated output text.
 */
export function rehydratePII(content: string, piiMap: Record<string, string>): string {
  if (!content || !piiMap || Object.keys(piiMap).length === 0) {
    return content;
  }

  let rehydrated = content;
  for (const [token, originalValue] of Object.entries(piiMap)) {
    const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedToken, 'g');
    rehydrated = rehydrated.replace(regex, originalValue);
  }

  return rehydrated;
}
