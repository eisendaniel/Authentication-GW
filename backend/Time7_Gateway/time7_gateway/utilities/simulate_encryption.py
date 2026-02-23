
import hashlib
# Use SHA256 hashing to generate response
FAKE_SECRET = "times7-demo-secret"

def generate_response(tid: str, challenge: str) -> str:
    """
    Simulate tag-side response generation using a shared secret.
    """

    combined = FAKE_SECRET + tid + challenge
    digest = hashlib.sha256(combined.encode()).hexdigest()

    # Return first 16 chars in line with responseHex schema
    return digest[:16]