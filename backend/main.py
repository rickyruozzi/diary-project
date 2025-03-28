from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
from bson import ObjectId

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

@app.get('/test',response_class=HTMLResponse)
async def test(request:Request):
    with open("backend/templates/testPage.html") as f: #apre il file della pagina dawith open("backend/templates/index.html") as f: #apre il file della pagina da mostrare
        content = f.read() #ne legge il contenuto
    return HTMLResponse(content)

@app.post('/delete/')
async def delete_entry(entry_id: str):  # Change entry_id type to str for ObjectID
    print(f"Attempting to delete entry with ID: {entry_id}")  # Log the ObjectID being deleted
    if not ObjectId.is_valid(entry_id):
        return {"error": "Invalid ObjectID format"}
    collection = create_connection()
    collection.delete_one({"_id": ObjectId(entry_id)})  # Convert entry_id to ObjectId
    return {"message": "Diary entry deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
