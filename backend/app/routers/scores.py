from fastapi import APIRouter, Depends
from ..security import get_current_user
from ..models import User
from ..schemas import ScoreResponse
from datetime import date, timedelta


router = APIRouter(
    prefix="/scores",
    tags=["scores"]
)

@router.get("")
def get_scores(
    current_user: User = Depends(get_current_user)
) -> list[ScoreResponse]:

    today = date.today()

    score_by_date = {
        score.date: score
        for score in current_user.scores
    }

    responses = []

    for days_ago in range(99, -1, -1):
        
        current_date = today - timedelta(days=days_ago)

        existing_score = score_by_date.get(current_date)

        if existing_score:
            responses.append(
                ScoreResponse(
                    id=existing_score.id,
                    score=existing_score.score,
                    date=current_date,
                )
            )
        else:
            responses.append(
                ScoreResponse(
                    id=None,
                    score=0,
                    date=current_date,
                )
            )
    
    return responses


    

