from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
import logging
from dotenv import load_dotenv

from data import PORTFOLIO_DATA

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Portfolio API", version="1.0.0")

# Allow CORS for local React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/?serverSelectionTimeoutMS=2000")
DB_NAME = os.getenv("MONGO_DB_NAME", "ai_portfolio")

client: AsyncIOMotorClient = None
db = None

@app.on_event("startup")
async def startup_db_client():
    global client, db
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        # Attempt a quick ping to confirm connection
        await client.admin.command('ping')
        db = client[DB_NAME]
        logger.info(f"Connected to MongoDB at {MONGO_URI}")
    except Exception as e:
        logger.warning(f"Could not connect to MongoDB (it might be offline). Running in offline mode! Error: {e}")
        db = None

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()
        logger.info("Closed MongoDB connection")

# Pydantic schema for Contact request
class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/api/health")
async def health_check():
    """Simple health check endpoint."""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@app.get("/api/portfolio-data")
async def get_portfolio_data():
    """Endpoint serving the entire dynamic portfolio data payload."""
    try:
        if db is not None:
            config = await db.portfolio_config.find_one({"_configSelected": "primary"})
            if config:
                # Remove the mongo _id so it can be serialized easily
                config.pop("_id", None)
                config.pop("_configSelected", None)
                return config
            else:
                logger.warning("MongoDB connected but no config found. Falling back to static data.")
                return PORTFOLIO_DATA
        else:
            return PORTFOLIO_DATA
    except Exception as e:
        logger.error(f"Database error while fetching portfolio data: {e}. Falling back to static data.")
        return PORTFOLIO_DATA

@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
async def submit_contact(contact: ContactRequest):
    """
    Endpoint to receive contact form submissions.
    Saves the submission to MongoDB if configured, otherwise logs it.
    """
    contact_dict = contact.model_dump()
    contact_dict["created_at"] = datetime.utcnow()
    
    try:
        if db is not None:
            await db.contact_messages.insert_one(contact_dict)
            logger.info(f"Saved contact message from {contact.email}")
            return {"message": "Contact form submitted successfully!"}
        else:
            # Fallback if DB is not connected
            logger.warning(f"DB not connected. Received message from: {contact.email} - Content: {contact.message}")
            return {"message": "Contact form received (DB disabled)."}
            
    except Exception as e:
        logger.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8001, reload=True)
