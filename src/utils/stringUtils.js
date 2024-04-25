export async function encrypt(message) {
    const msgBuffer = new TextEncoder().encode(message); 
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); 
    return hashHex
}

export const originalPassword = "a576c6a4ab598305992e69351780a6f108f7a844377bf84b6812bcccd6d47f28"
