
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    correct_answer = Column(String(1), nullable=False)

    choices = relationship("Choice", back_populates="question")


class Choice(Base):
    __tablename__ = "choices"

    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey("questions.id"))
    label = Column(String(1))  # A, B, C, etc.
    text = Column(String)

    question = relationship("Question", back_populates="choices")
