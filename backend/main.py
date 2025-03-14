from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],  # Allow the frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DiaryEntry(BaseModel):
    entry: str
    date: str  # Added date field

@app.post("/submit/")
async def submit_entry(diary_entry: DiaryEntry):
    # Here you can process the diary entry, e.g., save it to a database
    return {"message": "Diary entry received", "entry": diary_entry.entry, "date": diary_entry.date}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
