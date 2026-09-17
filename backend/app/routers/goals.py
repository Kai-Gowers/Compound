from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..security import get_current_user
from ..models import Goal, User
from ..schemas import GoalResponse, GoalCreate, GoalUpdate
from ..database import get_db
from datetime import date as Date
from scores import update_scores


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

    new_goal = Goal(
        description=data.description,
        user_id=current_user.id
    )

    db.add(new_goal)
    db.commit()
    db.refresh(new_goal)

    update_scores(current_user=current_user)
    
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

    db.commit()
    db.refresh(goal)

    update_scores(current_user=current_user)

    return goal
