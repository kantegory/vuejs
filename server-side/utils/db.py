from sqlalchemy import Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


Base = declarative_base()
engine = create_engine("sqlite:///rzhd.db")
session = sessionmaker(bind=engine)


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)


class Tasks(Base):
    __tablename__ = "critical_parameters"
    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    whatWatch = Column(String)
    time = Column(String)
    tags = Column(String)
    completed = Column(String)
    editing = Column(String)
    user_id = Column(Integer)


class Tags(Base):
    __tablename__ = "parameters"
    id = Column(Integer, primary_key=True)
    title = Column(String)


Base.metadata.create_all(bind=engine)
