from fastapi import APIRouter, Depends

from ..security import get_current_user

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




