from datetime import date

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base
from app.models import User, Goal, Score
from app.services.scores import recalculate_score_for_date

import pytest

@pytest.fixture
def db():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()

@pytest.fixture
def user(db):
    new_user = User(
        email="test@example.com",
        password_hash="x",
        last_active_day=date(2026, 10, 29),
        sign_up_date=date(2026, 10, 29),
    )
    db.add(new_user)
    db.flush()
    return new_user


def test_score_is_zero_when_there_are_no_goals(db, user):

    score = recalculate_score_for_date(
        db=db,
        user_id=user.id,
        target_date=date(2026, 10, 29),
    )

    assert score.score == 0


def test_score_is_half_when_two_of_four_completed(db, user):

    for i in range(4):
        goal = Goal(
            completed=(i % 2 == 0),
            date=date(2026, 10, 29),
            user_id=user.id,
        )
        db.add(goal)
    
    db.flush()

    score = recalculate_score_for_date(
        db=db,
        user_id=user.id,
        target_date=date(2026, 10, 29),
    )

    assert score.score == 0.5


def test_recalculate_updates_existing_score_row(db, user):

    first = recalculate_score_for_date(
        db=db,
        user_id=user.id,
        target_date=date(2026, 10, 29),
    )

    assert first.score == 0

    for i in range(4):
        goal = Goal(
            completed=(i == 1),
            date=date(2026, 10, 29),
            user_id=user.id,
        )
        db.add(goal)
    db.flush()

    second = recalculate_score_for_date(
        db=db,
        user_id=user.id,
        target_date=date(2026, 10, 29),
    )

    count = db.query(Score).filter(
        Score.user_id == user.id,
        Score.date == date(2026, 10, 29),
    ).count()

    assert second.score == 0.25
    assert first.id == second.id
    assert count == 1






