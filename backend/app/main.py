from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routers import ads
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Google Ads Copy Generator API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(ads.router, prefix="/api", tags=["ads"])

@app.get("/")
async def root():
    return {"message": "Welcome to Google Ads Copy Generator API"}