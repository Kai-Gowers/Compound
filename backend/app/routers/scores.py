from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..database import get_db
from ..models import Score, User, Goal
from ..schemas import ScoreResponse


router = APIRouter(
    prefix="/scores",
    tags=["scores"]
)

@router.get("")
def get_scores(
    current_user: User = Depends(get_current_user)
) -> list[ScoreResponse]:

    sorted_scores = sorted(
        current_user.scores,
        key=lambda score: score.date
    )[-100:]

    return [
        ScoreResponse(
            id=score.id,
            score=score.score,
            date=score.date,
        )
        for score in sorted_scores
    ]

def recalculate_score_for_date(
    db: Session,
    user_id: int,
    target_date: date,
) -> Score:

    goals = db.query(Goal).filter(
        Goal.user_id == user_id,
        Goal.date == target_date,
    ).all()

    completed_count = sum(goal.completed for goal in goals)
    calculated_score = completed_count / len(goals) if goals else 0

    score = db.query(Score).filter(
        Score.user_id == user_id,
        Score.date == target_date,
    ).first()

    if score is None:
        score = Score(
            user_id=user_id,
            date=target_date,
            score=calculated_score,
        )
        db.add(score)
    else:
        score.score = calculated_score
    
    return score
    

