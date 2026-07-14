from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import process_chat

app = FastAPI()

# Frontend ko backend se baat karne ki permission dena
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_with_agent(request: ChatRequest):
    # Yeh function aapke agent.py se AI ka reply layega
    ai_response = process_chat(request.message)
    return {"reply": ai_response}
