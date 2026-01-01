from sqlalchemy import Column, Float, Index, Integer, String
from sqlalchemy.ext.declarative import declarative_base

base = declarative_base()

class Product(base):
    __tablename__ = "product"
    
    id = Column(Integer,primary_key=True,index = True)
    name = Column(String)
    price = Column(Float)
    description = Column(String)
    quantity = Column(Integer)
    image = Column(String)