from datetime import date

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from fastapi.testclient import TestClient

import os
os.environ["COMPOUND_SECRET_KEY"] = "test-secret"

from app.main import app
from app.database import Base, get_db
from app.models import User

import pytest


@pytest.fixture
def db():
    
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False}, poolclass=StaticPool)
    Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    
    session = Session()

    yield session
    
    session.close()


@pytest.fixture
def user(db):

    new_user = User(
        email="test@example.com",
        username="testuser",
        password_hash="x",
        last_active_day=date(2026, 10, 29),
        sign_up_date=date(2026, 10, 29),
    )

    db.add(new_user)
    db.flush()

    return new_user


@pytest.fixture
def client(db):

    def override_get_db():
        yield db

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()

@pytest.fixture
def auth_client(client):

    signup_response = client.post("/auth/signup", json={
        "email": "test@gmail.com",
        "username": "testuser",
        "password": "testpassword",
    })

    assert signup_response.status_code == 200

    login_response = client.post("/auth/login", json={
        "email": "test@gmail.com",
        "password": "testpassword",
    })

    assert login_response.status_code == 200

    yield client