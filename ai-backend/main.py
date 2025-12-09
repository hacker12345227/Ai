from fastapi import FastAPI
from pydantic import BaseModel
import httpx, os

app = FastAPI()

OPENAI_KEY = os.getenv("OPENAI_API_KEY")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    headers = {"Authorization": f"Bearer " + OPENAI_KEY}
    data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": req.message}]
    }
    async with httpx.AsyncClient() as client:
        r = await client.post("https://api.openai.com/v1/chat/completions",
                              json=data, headers=headers)
    return r.json()
