from datetime import datetime, timedelta, timezone
import jwt
from pwdlib import PasswordHash

from fastapi import Cookie, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import get_db
from .models import User

import os



SECRET_KEY = os.environ["COMPOUND_SECRET_KEY"]
ALGORITHM = "HS256"

password_hash = PasswordHash.recommended()

def create_access_token(user_id: int):

    payload = {
        "sub": str(user_id),
        "exp": datetime.now(timezone.utc) + timedelta(days=7)
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)

def get_current_user(
    access_token: str | None = Cookie(default=None),
    db: Session = Depends(get_db)
):

    if access_token is None:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated"
        )
    
    try:
        payload = jwt.decode(
            access_token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = int(payload["sub"])

    except (jwt.InvalidTokenError, KeyError, ValueError):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication"
        )
    
    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User no longer exists"
        )
    
    return user


