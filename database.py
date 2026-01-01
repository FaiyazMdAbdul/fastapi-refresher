from urllib.parse import quote_plus
from sqlalchemy import create_engine
from sqlalchemy.engine import create_engine
from sqlalchemy.orm import  sessionmaker

username = "postgres"
password = "Pgadmin@123!"
db_url = f"postgresql://{username}:{quote_plus(password)}@localhost:5432/fastapi-refresher"
engine = create_engine(db_url)
session = sessionmaker(autocommit =False,autoflush=False,bind=engine)