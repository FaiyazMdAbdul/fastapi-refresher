from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, session
import databasemodels
from models import Product, ProductCreate, ProductUpdate

app = FastAPI()

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

databasemodels.base.metadata.create_all(bind = engine)

@app.get("/")
def HelloWorld():
    return {"message": "Hello, World!!"}


products = [
    Product(id=1, name="Product 1", price=100, description="Product 1 description", quantity=100, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=2, name="Product 2", price=200, description="Product 2 description", quantity=200, image="https://dummyimage.com/150x150/000/fff"),  
    Product(id=3, name="Product 3", price=300, description="Product 3 description", quantity=300, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=4, name="Product 4", price=400, description="Product 4 description", quantity=400, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=5, name="Product 5", price=500, description="Product 5 description", quantity=500, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=6, name="Product 6", price=600, description="Product 6 description", quantity=600, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=7, name="Product 7", price=700, description="Product 7 description", quantity=700, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=8, name="Product 8", price=800, description="Product 8 description", quantity=800, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=9, name="Product 9", price=900, description="Product 9 description", quantity=900, image="https://dummyimage.com/150x150/000/fff"),
    Product(id=10, name="Product 10", price=1000, description="Product 10 description", quantity=1000, image="https://dummyimage.com/150x150/000/fff"),
]

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

def seed_data():
    db = session()

    exists = db.query(databasemodels.Product).count() > 0
    if not exists:
        for product in products:
            db.add(databasemodels.Product(**product.model_dump()))
        db.commit()

seed_data()

@app.get("/products", response_model=list[Product])
def getProducts(db: Session = Depends(get_db)):
    return db.query(databasemodels.Product).all()

@app.get("/product/{id}", response_model=Product)
def getProductById(id : int,db:Session = Depends(get_db)):
   product = db.query(databasemodels.Product).filter(databasemodels.Product.id == id).first()
   if not product:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product with id {id} not found")
   return product


@app.post("/product", response_model=Product, status_code=status.HTTP_201_CREATED)
def addProduct(product:ProductCreate,db:Session = Depends(get_db)):
  db_product = databasemodels.Product(**product.model_dump())
  db.add(db_product)
  db.commit()
  db.refresh(db_product)
  return db_product

@app.put("/product", response_model=Product)
def updateProduct(updatedProduct:ProductUpdate,db:Session =  Depends(get_db)):
  db_product = db.query(databasemodels.Product).filter(databasemodels.Product.id == updatedProduct.id).first()
  if not db_product:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product with id {updatedProduct.id} not found")

  db_product.name = updatedProduct.name
  db_product.price = updatedProduct.price
  db_product.description = updatedProduct.description
  db_product.quantity = updatedProduct.quantity
  db_product.image = updatedProduct.image
  db.commit()
  db.refresh(db_product)
  return db_product


@app.delete("/product/{id}", status_code=status.HTTP_204_NO_CONTENT)
def deleteProduct(id : int, db:Session = Depends(get_db)):
    db_product = db.query(databasemodels.Product).filter(databasemodels.Product.id == id).first()
    if not db_product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Product with id {id} not found")

    db.delete(db_product)
    db.commit()
    return None


