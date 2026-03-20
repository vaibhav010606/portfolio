import asyncio
import os
import logging
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from data import PORTFOLIO_DATA

# Load environment variables
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB_NAME", "ai_portfolio")

async def init_db():
    try:
        logger.info(f"Connecting to MongoDB at {MONGO_URI}...")
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        
        # Ping to check connection
        await client.admin.command('ping')
        
        db = client[DB_NAME]
        collection = db.portfolio_config
        
        # Check if config already exists
        existing_config = await collection.find_one({"_configSelected": "primary"})
        
        if existing_config:
            logger.info("Found existing portfolio configuration. Updating...")
            await collection.update_one(
                {"_configSelected": "primary"},
                {"$set": PORTFOLIO_DATA}
            )
            logger.info("Portfolio configuration updated successfully.")
        else:
            logger.info("No configuration found. Seeding initial data...")
            data_to_insert = PORTFOLIO_DATA.copy()
            data_to_insert["_configSelected"] = "primary"
            await collection.insert_one(data_to_insert)
            logger.info("Initial portfolio configuration seeded successfully.")
            
    except Exception as e:
        logger.error(f"Failed to seed database. Ensure MongoDB is running. Error: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(init_db())
