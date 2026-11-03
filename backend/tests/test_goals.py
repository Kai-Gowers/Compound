
def test_get_current_goals_with_no_cookie(client):

    response = client.get("/goals")
    assert response.status_code == 401

