from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request

from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pymongo

app = FastAPI()
templates=Jinja2Templates(directory='templates')


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5175"], # Allow the  frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiaryEntry(BaseModel):
    entry: str
    date: str  # Added date field

def create_connection():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    db = client["Reviews"]
    collection = db["reviews"]
    return collection

@app.post("/submit/")
async def submit_entry(diary_entry: DiaryEntry):
    collection=create_connection()
    collection.insert_one(diary_entry.dict())
    return {"message": "Diary entry received", "entry": diary_entry.entry, "date": diary_entry.date}

@app.get("/", response_class=HTMLResponse)
async def read_root(request:Request):
    with open("backend/templates/index.html") as f: #apre il file della pagina da mostrare
        content = f.read() #ne legge il contenuto
    return HTMLResponse(content)    #restituisce in output la pagina renderizzata


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
