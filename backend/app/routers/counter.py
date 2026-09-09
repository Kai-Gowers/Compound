from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..security import get_current_user

from ..models import User


router = APIRouter(
    prefix="/counter",
    tags=["counter"]
)

@router.get("/")
def get_counter(
    current_user: User = Depends(get_current_user)
):
    return {
        "value": current_user.counter.value
    }

@router.post("/increment")
def increment_counter(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    current_user.counter.value += 1

    db.commit()
    db.refresh(current_user.counter)

    return {
        "value": current_user.counter.value
    }
