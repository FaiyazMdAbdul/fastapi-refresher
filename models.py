from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    description: str
    quantity: int = Field(..., ge=0)
    image: str

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    id: int

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
    