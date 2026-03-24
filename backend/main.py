from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import SessionLocal
from models import User
from schemas import UserCreate

app = FastAPI()

# ✅ CORS (VERY IMPORTANT for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Get all users
@app.get("/users")
def get_users():
    db = SessionLocal()
    users = db.query(User).all()
    db.close()
    return users


# 🔹 Create user
@app.post("/users")
def create_user(user: UserCreate):
    db = SessionLocal()
    new_user = User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.close()
    return {"message": "User added successfully"}


# 🔹 Update user
@app.put("/users/{id}")
def update_user(id: int, user: UserCreate):
    db = SessionLocal()
    existing_user = db.query(User).filter(User.id == id).first()

    if existing_user:
        existing_user.name = user.name
        existing_user.email = user.email
        db.commit()

    db.close()
    return {"message": "User updated successfully"}


# 🔹 Delete user
@app.delete("/users/{id}")
def delete_user(id: int):
    db = SessionLocal()
    existing_user = db.query(User).filter(User.id == id).first()

    if existing_user:
        db.delete(existing_user)
        db.commit()

    db.close()
    return {"message": "User deleted successfully"}