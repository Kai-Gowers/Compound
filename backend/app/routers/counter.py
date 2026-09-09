from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Counter

router = APIRouter(
    prefix="/counter",
    tags=["counter"]
)

@router.get("/")
def get_counter(db: Session = Depends(get_db)):
    
    counter = db.get(Counter, 1)

    if counter is None:
        counter = Counter(id=1, value=0)
        db.add(counter)
        db.commit()
        db.refresh(counter)
    
    return {
        "value": counter.value
    }

@router.post("/increment")
def increment_counter(db: Session = Depends(get_db)):
    
    counter = db.get(Counter, 1)

    if counter is None:
        counter = Counter(id=1, value=0)
        db.add(counter)
    
    counter.value += 1

    db.commit()
    db.refresh(counter)

    return {"value": counter.value}

