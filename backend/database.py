from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./crm_app.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Interaction(Base):
    __tablename__ = "interactions"
    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(100), index=True)
    interaction_type = Column(String(50))
    date_time = Column(DateTime, default=datetime.datetime.utcnow)
    topics_discussed = Column(Text)
    sentiment = Column(String(50))
    follow_up = Column(Text)

Base.metadata.create_all(bind=engine)
