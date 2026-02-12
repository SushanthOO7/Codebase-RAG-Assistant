from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.responses import PlainTextResponse
from fastapi.concurrency import run_in_threadpool
from contextlib import asynccontextmanager

app = FastAPI ()

@app.get("/health")
async def health_check():
    return {"status": "ok"}