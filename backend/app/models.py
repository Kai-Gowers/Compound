from sqlalchemy.orm import Mapped, mapped_column

from .database import Base

class Counter(Base):
    __tablename__ = "counters"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[int] = mapped_column(default=0)

