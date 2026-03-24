from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100))

# Create table
Base.metadata.create_all(bind=engine)