// 64 characters, so mapping a random byte with `% 64` stays uniform.
const keyCharset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

/**
 * The node uses the raw key string as key material and base64-encodes it
 * itself, so the string length — not its decoded length — must be exact:
 * 16 characters for 2022-blake3-aes-128-gcm, 32 for the other 2022 ciphers.
 */
export function shadowsocks2022KeyLength(cipher: string | undefined) {
  return cipher === "2022-blake3-aes-128-gcm" ? 16 : 32;
}

export function generateShadowsocks2022Key(cipher: string | undefined) {
  const bytes = crypto.getRandomValues(
    new Uint8Array(shadowsocks2022KeyLength(cipher))
  );
  return Array.from(bytes, (byte) => keyCharset[byte % keyCharset.length]).join(
    ""
  );
}
