
from app.models import User, Goal
from datetime import timedelta

def test_get_current_goals_with_no_cookie(client):

    response = client.get("/goals")
    assert response.status_code == 401


def test_get_current_goals_with_cookie(client):

    signup_response = client.post("/auth/signup", json={
        "email": "test@gmail.com",
        "password": "testpassword",
    })

    assert signup_response.status_code == 200
    assert signup_response.json()["message"] == "You can now log in"


    login_response = client.post("/auth/login", json={
        "email": "test@gmail.com",
        "password": "testpassword",
    })

    assert login_response.status_code == 200
    assert login_response.json()["message"] == "Logged in"

    
    response = client.get("/goals")

    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_get_current_goals_carry_over(auth_client, db):

    user = db.query(User).filter(
        User.email == "test@gmail.com",
    ).first()

    user.last_active_day -= timedelta(days=2)

    new_goal = Goal(
        description="test goal",
        completed=True,
        user_id=user.id,
        date=user.last_active_day
    )
    
    db.add(new_goal)
    db.flush()

    response = auth_client.get("/goals")

    assert response.status_code == 200
    assert response.json()[0]["description"] == new_goal.description
    assert response.json()[0]["completed"] == False

    response2 = auth_client.get("/goals")
    assert len(response2.json()) == len(response.json())


def test_get_past_goals_not_carry_over(auth_client, db):

    user = db.query(User).filter(
        User.email == "test@gmail.com",
    ).first()

    user.last_active_day = user.last_active_day - timedelta(days=2)
    past_last_active_day = user.last_active_day

    goal_2_days_ago = Goal(
        description="2 days ago test goal",
        completed=True,
        user_id=user.id,
        date=user.last_active_day
    )

    db.add(goal_2_days_ago)
    db.flush()

    response = auth_client.get(f"/goals?date={user.last_active_day + timedelta(days=1)}")

    assert response.status_code == 200
    assert len(response.json()) == 0
    assert user.last_active_day == past_last_active_day


