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

    last_day_of_year = date(date.today().year, 12, 31)

    score_by_date = {
        score.date: score
        for score in current_user.scores
    }

    responses = []

    for days_ago in range(365, -1, -1):
        
        current_date = last_day_of_year - timedelta(days=days_ago)

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


    

