from fastapi import FastAPI
from datetime import datetime, timezone

app = FastAPI(title="Codebase RAG API", version="0.1.0")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "Codebase RAG API",
        "version": "0.1.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "service": "api"
    }
