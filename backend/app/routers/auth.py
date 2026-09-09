from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from sqlalchemy import select

from ..security import create_access_token, hash_password, verify_password
from ..database import get_db
from ..models import Counter, User
from ..schemas import UserCreate, UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/signup")
def signup(
    data: UserCreate, 
    db: Session = Depends(get_db)
):

    existing_user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    password_hash = hash_password(data.password)

    user = User(
        email = data.email,
        password_hash = password_hash
    )
    db.add(user)
    db.flush()

    counter = Counter(
        user_id=user.id,
        value=0
    )
    db.add(counter)

    db.commit()
    db.refresh(user)

    return {"message": "You can now log in"}


@router.post("/login")
def login(
    data: UserLogin,
    response: Response,
    db: Session = Depends(get_db)
):
    user = db.scalar(
        select(User).where(User.email == data.email)
    )

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    if not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    
    token = create_access_token(user.id)

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )

    return {"message": "Logged in"}


@router.post("/logout")
def logout(
    response: Response
):
    response.delete_cookie(
        key="access_token"
    )

    return {"message": "Logged out"}