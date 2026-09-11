from pydantic import BaseModel, field_validator
from datetime import date as Date

class UserCreate(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("email cannot be empty")
        if "@" not in v:
            raise ValueError("email must contain @")
        return v
    
    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("password cannot be empty")
        if len(v) < 5:
            raise ValueError("password has to be at least 5 characters")
        return v

class UserLogin(BaseModel):
    email: str
    password: str

    @field_validator("email")
    @classmethod
    def validate_email(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("email cannot be empty")
        if "@" not in v:
            raise ValueError("email must contain @")
        return v


class ScoreResponse(BaseModel):
    id: int
    score: float
    date: Date

