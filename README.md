# AI-First CRM HCP Module

## Project Overview
This project is an AI-powered CRM interface for logging interactions with Healthcare Professionals (HCPs). It features a structured form and a LangGraph-powered conversational AI assistant. 

## Tech Stack Used
* **Frontend:** React.js, Redux Toolkit, Google Inter Font
* **Backend:** Python, FastAPI
* **AI Agent Framework:** LangGraph, LangChain
* **LLM:** Groq API (gemma2-9b-it)
* **Database:** SQLite (SQLAlchemy)

## 5 LangGraph Tools Implemented
1. **log_interaction:** Extracts interaction details from the chat and saves them to the database.
2. **edit_interaction:** Modifies existing interaction logs in the database.
3. **schedule_follow_up:** Schedules a calendar follow-up meeting with an HCP.
4. **send_brochure:** Triggers an email to send product brochures to the HCP.
5. **analyze_sentiment_history:** Analyzes past logs to determine the general sentiment of the HCP.

## How to Run Locally
### Backend Setup
1. Navigate to the `backend/` folder.
2. Install dependencies: `pip install fastapi uvicorn sqlalchemy langchain-groq langgraph pydantic`
3. Add your Groq API key in `agent.py`.
4. Run the server: `uvicorn main:app --reload`

### Frontend Setup
1. Navigate to the `frontend/` folder.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4.
