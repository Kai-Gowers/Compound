from sqlalchemy.orm import Session
from ..models import Score, Goal
from datetime import date

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