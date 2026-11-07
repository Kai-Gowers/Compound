
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..models import User, Follow
from ..schemas import UserResponse
from ..database import get_db

router = APIRouter(
    prefix="/friends",
    tags=["friends"]
)

@router.post("/follow/{followee_id}")
def follow(
    followee_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> None:

    if followee_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot follow yourself")

    followee = db.query(User).filter(
        User.id == followee_id,
    ).first()

    if not followee:
        raise HTTPException(status_code=404, detail="Followee not found")

    follows = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.followee_id == followee_id,
    ).first()

    if follows:
        raise HTTPException(status_code=400, detail="You already follow this person")

    new_follow = Follow(
        follower_id=current_user.id,
        followee_id=followee_id,
    )

    db.add(new_follow)
    db.commit()

@router.post("/unfollow")
def unfollow(
    followee_id: int,
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

    pass

        



