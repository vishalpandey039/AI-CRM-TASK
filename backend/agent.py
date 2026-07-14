import os
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import tool
from database import SessionLocal, Interaction

# Yahan baad mein API key lagani hogi
os.environ["GROQ_API_KEY"] = "YOUR_GROQ_API_KEY"

@tool
def log_interaction(hcp_name: str, interaction_type: str, topics_discussed: str, sentiment: str, follow_up: str) -> str:
    """Logs a new interaction with a Healthcare Professional (HCP) into the database."""
    db = SessionLocal()
    new_log = Interaction(hcp_name=hcp_name, interaction_type=interaction_type, topics_discussed=topics_discussed, sentiment=sentiment, follow_up=follow_up)
    db.add(new_log)
    db.commit()
    db.close()
    return f"Successfully logged interaction with {hcp_name}."

@tool
def edit_interaction(log_id: int, new_topics: str) -> str:
    """Edits an existing interaction by ID to update the topics discussed."""
    db = SessionLocal()
    log = db.query(Interaction).filter(Interaction.id == log_id).first()
    if log:
        log.topics_discussed = new_topics
        db.commit()
        db.close()
        return f"Interaction {log_id} updated successfully."
    db.close()
    return "Interaction not found."

@tool
def schedule_follow_up(hcp_name: str, date: str) -> str:
    """Schedules a calendar follow-up meeting with an HCP."""
    return f"Follow-up meeting scheduled with {hcp_name} on {date}."

@tool
def send_brochure(hcp_email: str, product_name: str) -> str:
    """Sends a product brochure via email to the HCP."""
    return f"Brochure for {product_name} sent to {hcp_email}."

@tool
def analyze_sentiment_history(hcp_name: str) -> str:
    """Checks previous logs to analyze the general sentiment of the HCP."""
    return f"Analyzed history for {hcp_name}: Generally Positive."

# Yahan paancho (5) tools ko ek list mein daal diya hai
tools = [log_interaction, edit_interaction, schedule_follow_up, send_brochure, analyze_sentiment_history]

# LLM aur Agent Setup
llm = ChatGroq(model="gemma2-9b-it", temperature=0)
agent_executor = create_react_agent(llm, tools)

def process_chat(message: str):
    response = agent_executor.invoke({"messages": [("user", message)]})
    return response["messages"][-1].content
