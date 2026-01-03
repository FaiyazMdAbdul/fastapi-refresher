from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

username = os.getenv("DATABASE_USERNAME", "postgres")
password = os.getenv("DATABASE_PASSWORD", "")
host = os.getenv("DATABASE_HOST", "localhost")
port = os.getenv("DATABASE_PORT", "5432")
database = os.getenv("DATABASE_NAME", "fastapi-refresher")

db_url = f"postgresql://{username}:{quote_plus(password)}@{host}:{port}/{database}"
engine = create_engine(db_url)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)