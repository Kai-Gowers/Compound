
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import Boolean
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

@router.post("/unfollow/{followee_id}")
def unfollow(
    followee_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> None:

    if followee_id == current_user.id:
        raise HTTPException(status_code=400, detail="You cannot unfollow yourself")
    
    followee = db.query(User).filter(
        User.id == followee_id,
    ).first()

    if not followee:
        raise HTTPException(status_code=404, detail="Followee not found")
    
    follows = db.query(Follow).filter(
        Follow.follower_id == current_user.id,
        Follow.followee_id == followee_id,
    ).first()

    if not follows:
        raise HTTPException(status_code=400, detail="You don't follow this person")
    
    db.delete(follows)
    db.commit()


@router.get("/{user_id}")
def get_followers(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> list[UserResponse]:

    followers = db.query(User).join(
        Follow,
        Follow.follower_id == User.id,
    ).filter(
        Follow.followee_id == user_id,
    ).all()
    
    return [
        UserResponse(
            id=follower.id,
            email=follower.email,
            sign_up_date=follower.sign_up_date,
        )
        for follower in followers
    ]

@router.get("/{user_id}")
def get_following(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> list[UserResponse]:

    following = db.query(User).join(
        Follow,
        Follow.followee_id == User.id,
    ).filter(
        Follow.follower_id == user_id,
    ).all()
    
    return [
        UserResponse(
            id=followee.id,
            email=followee.email,
            sign_up_date=followee.sign_up_date,
        )
        for followee in following
    ]

'''
@router.get("/{user_id}")
def check_follow_status(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Boolean:

    follow = db.query(Follow).filter(
        Follow.followee_id == user_id,
        Follow.follower_id == current_user.id,
    ).first()

    return True if follow else False
'''

@router.get("/")
def get_users_with_prefix(
    num_users: int,
    search_prefix: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
  
    users = db.query(User).filter(
        User.email.startswith(search_prefix),
    ).limit(num_users).all()

    return [
        UserResponse(
            id=user.id,
            email=user.email,
            sign_up_date=user.sign_up_date,
        )
        for user in users
    ]
