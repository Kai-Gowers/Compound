
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..models import User
from ..schemas import UserResponse
from ..database import get_db

router = APIRouter(
    prefix="/friends",
    tags=["friends"]
)

@router.post("/follow")
def follow(
    followee_email: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> None:
    pass


@router.post("/unfollow")
def unfollow(
    followee_email: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> None:
    pass


@router.get("/{user_id}")
def get_followers(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> list[UserResponse]:

    if not user_id:
        user_id = current_user.id

        



