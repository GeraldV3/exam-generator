from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from models import Question, Choice
from aiken_parser import parse_aiken
from database import SessionLocal

app = FastAPI()

@app.post("/upload/")
async def upload_aiken_file(file: UploadFile = File(...)):
    # Check file extension
    if not file.filename.endswith(".txt"):
        raise HTTPException(status_code=400, detail="Only .txt files are allowed.")

    try:
        content = (await file.read()).decode("utf-8")
        parsed_questions = parse_aiken(content)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")

    db: Session = SessionLocal()
    try:
        for item in parsed_questions:
            question = Question(text=item["text"], correct_answer=item["correct"])
            db.add(question)
            db.flush()  # Get question.id before adding choices

            for label, choice_text in item["choices"]:
                db.add(Choice(label=label, text=choice_text, question_id=question.id))

        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    finally:
        db.close()

    return JSONResponse(content={"message": f"{len(parsed_questions)} questions uploaded successfully!"})
