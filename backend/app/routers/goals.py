from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..models import Goal, User
from ..schemas import GoalResponse, GoalCreate, GoalUpdate
from ..database import get_db
from ..services.scores import recalculate_score_for_date
from datetime import date as Date


router = APIRouter(
    prefix="/goals",
    tags=["goals"]
)


@router.get("/")
def get_goals(
    current_user: User = Depends(get_current_user)
) -> list[GoalResponse]:
    today = Date.today()

    return [
        GoalResponse(
            id=goal.id,
            description=goal.description,
            completed=goal.completed,
            date=goal.date,
        )
        for goal in current_user.goals
        if goal.date == today
    ]


@router.post("/", response_model=GoalResponse)
def create_goal(
    data: GoalCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> GoalResponse:

    today = Date.today()

    new_goal = Goal(
        description=data.description,
        date=today,
        user_id=current_user.id
    )

    db.add(new_goal)
    db.flush()

    recalculate_score_for_date(
        db=db,
        user_id=current_user.id,
        target_date=today,
    )

    db.commit()
    db.refresh(new_goal)
    
    return new_goal


@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal(
    goal_id: int,
    data: GoalUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> GoalResponse:

    goal = db.query(Goal).filter(
        Goal.id == goal_id,
        Goal.user_id == current_user.id
    ).first()

    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    goal.description = data.description
    goal.completed = data.completed

    db.flush()

    recalculate_score_for_date(
        db=db,
        user_id=current_user.id,
        target_date=goal.date,
    )

    db.commit()
    db.refresh(goal)
    return goal
