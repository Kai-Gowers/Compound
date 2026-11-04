
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

