import { ml_kem768 } from "@noble/post-quantum/ml-kem.js";
import { toB64Url } from "./util";

/**
 * Generate an ML-KEM-768 key pair for VLESS encryption.
 *
 * Xray treats the 64-byte seed as the private key and the encapsulation key as
 * the client-side password, so both are emitted in base64url.
 */
export function generateMLKEM768KeyPair() {
  const seed = crypto.getRandomValues(new Uint8Array(64));
  const { publicKey } = ml_kem768.keygen(seed);
  return { privateKey: toB64Url(seed), publicKey: toB64Url(publicKey) };
}
