from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="My FastAPI Application",
    description="This is a sample FastAPI application with CORS enabled.",
    version="1.0.0",
)

details = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class SignupModel(BaseModel):
    name: str
    email: str
    gender: str
    password: str

class LoginModel(BaseModel):
    email: str
    password: str

@app.get('/')
async def home():
    return {'message': 'Login api running'}

@app.post('/signup')
async def signup(e: SignupModel):
    for user in details:
        if user["email"] == e.email:
            return {"message": "Email already exists"}

    user_data = e.model_dump()
    details.append(user_data)

    return {
        "message": "Signup successful",
        "data": user_data
    }

@app.post('/login')
async def login(e: LoginModel):
    for user in details:
        if user["email"] == e.email and user["password"] == e.password:
            return {"message": "Login successful"}

    return {"message": "Invalid email or password"}

@app.get('/users')
async def get_users():
    return {"users": details}