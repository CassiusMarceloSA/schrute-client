import crypto from "crypto";

/**
 * Generates a consistent hash from a string input (works only on the server side)
 * @param input - The string to be hashed
 * @returns A hexadecimal string representing the hash
 */
export function generateHash(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}
