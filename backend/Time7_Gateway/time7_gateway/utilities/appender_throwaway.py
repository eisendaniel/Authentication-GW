import json
import secrets
from pathlib import Path


from time7_gateway.utilities.simulate_encryption import generate_response

BASE_DIR = Path(__file__).resolve().parent

INPUT_FILE = BASE_DIR / "t7datastream.ndjson"
OUTPUT_FILE = BASE_DIR / "output.json"



def generate_hex_string(length: int) -> str:
    """Generate an uppercase hex string of exact length."""
    if length % 2 != 0:
        raise ValueError("Hex string length must be even")

    return secrets.token_hex(length // 2).upper()


def generate_message_hex() -> str:
    """
    Generates a 12-character hex challenge message.
    Schema:
    - type: string
    - minLength = maxLength = 12
    - pattern: ^[0-9A-F]+$
    """
    return generate_hex_string(12)


def generate_tag_authentication_response(tidHex: str, success: bool = True) -> dict:
    """
    Generates a complete tagAuthenticationResponse object.
    Uses shared hash-based generate_response().
    """

    messageHex = generate_message_hex()

    if not success:
        return {
            "messageHex": messageHex,
            "responseHex": ""
        }

    # ✅ Use your shared HMAC-based function
    responseHex = generate_response(tidHex, messageHex)

    return {
        "messageHex": messageHex,
        "responseHex": responseHex,
        "tidHex": tidHex
    }


epc_auth_map = {}

with open(INPUT_FILE, "r") as infile, open(OUTPUT_FILE, "w") as outfile:
    for line in infile:

        if not line.strip():
            continue  # skip empty lines

        event = json.loads(line)

        epc = event["tagInventoryEvent"]["epc"]
        tidHex = event["tagInventoryEvent"]["tidHex"]

        # If EPC already processed, reuse auth data
        if epc in epc_auth_map:
            AUTH_DATA = epc_auth_map[epc]

        else:
            AUTH_DATA = generate_tag_authentication_response(tidHex)

            # Store to avoid duplicates
            epc_auth_map[epc] = AUTH_DATA

        # Append authentication data
        event["tagInventoryEvent"]["tagAuthenticationResponse"] = AUTH_DATA

        # Write back as single-line JSON
        outfile.write(json.dumps(event) + "\n")
