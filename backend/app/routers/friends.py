
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..models import Goal, User
from ..schemas import GoalResponse, GoalCreate, GoalUpdate
from ..database import get_db
from ..services.scores import recalculate_score_for_date
from datetime import date as Date

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
    db: Session = Depends(get_db)
):
    pass


