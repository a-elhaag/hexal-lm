from __future__ import annotations

import time
import uuid

import jwt
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa

from app.auth.models import AuthUser


def generate_test_keypair() -> tuple[bytes, rsa.RSAPublicKey]:
    """Generate RSA keypair for mocking JWT signing."""
    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    pem = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    return pem, key.public_key()


def mint_test_jwt(pem: bytes, user_id: str | None = None, email: str | None = None) -> str:
    """Mint a test JWT token for testing."""
    now = int(time.time())
    claims = {
        "sub": user_id or str(uuid.uuid4()),
        "email": email or "test@example.com",
        "aud": "authenticated",
        "iat": now,
        "exp": now + 3600,
    }
    return jwt.encode(claims, pem, algorithm="RS256")


_MOCK_USER_ID = uuid.UUID("ea7509a1-0c0c-45c7-9f5c-db45aedf3fd7")

def mock_get_current_user(user_id: str | None = None, email: str | None = None) -> AuthUser:
    """Return mock AuthUser for testing (no JWT validation). Uses fixed test user."""
    return AuthUser(
        id=uuid.UUID(user_id) if user_id else _MOCK_USER_ID,
        email=email or "test@example.com",
    )
