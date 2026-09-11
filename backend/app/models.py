from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date as Date

from .database import Base


class User(Base):

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    password_hash: Mapped[str]

    counter: Mapped["Counter"] = relationship(
        back_populates="user"
    )

    scores: Mapped[list["Score"]] = relationship(
        back_populates="user"
    )


class Counter(Base):
    __tablename__ = "counters"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[int] = mapped_column(default=0)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        unique=True
    )

    user: Mapped["User"] = relationship(
        back_populates="counter"
    )

class Score(Base):
    __tablename__ = "scores"
    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "date",
            name="uq_scores_user_date",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    score: Mapped[float] = mapped_column(default=0)
    date: Mapped[Date] = mapped_column(default=Date.today)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
    )

    user: Mapped["User"] = relationship(
        back_populates="scores"
    )




