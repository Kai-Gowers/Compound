from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..database import get_db
from ..models import User
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


@router.put("")
def update_scores(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> list[ScoreResponse]:

    sorted_scores = sorted(
        current_user.scores,
        key=lambda score: score.date
    )[-100:]

    responses = []

    for score in sorted_scores:
        goals_for_date= [
            goal for goal in current_user.goals
            if goal.date == score.date
        ]

        if goals_for_date:
            completed = sum(goal.completed for goal in goals_for_date)
            calculated_score = completed / len(goals_for_date)
        else:
            calculated_score = 0
        
        score.score = calculated_score

        db.commit(score)
        db.refresh(score)
        
        responses.append(
            ScoreResponse(
                id=score.id,
                score=calculated_score,
                date=score.date
            )
        )

    return responses

