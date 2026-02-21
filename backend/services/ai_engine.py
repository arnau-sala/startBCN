"""
AIEngine Service — The Bridge for Persona 2 (AI Integration)

This module contains placeholder functions for AI-powered features.
Persona 2 will replace the implementations with actual OpenAI logic.

Functions:
    - translateToELI10: Simplifies financial text for a 10-year-old audience
    - getChatResponse: Generates AI-powered chat responses about finance
"""


async def translateToELI10(text: str) -> str:
    """
    Translate financial text into simple language a 10-year-old can understand.

    TODO (Persona 2): Replace this placeholder with OpenAI API call.
    
    Suggested prompt strategy:
        - System role: "You are a friendly financial educator for kids"
        - Ask the model to explain using simple words, analogies, and emojis
    
    Args:
        text: The original financial news summary or article text.
    
    Returns:
        A simplified version of the text. Currently returns a placeholder.
    """
    # ============================================================
    # 🔌 PERSONA 2: INSERT YOUR OPENAI LOGIC HERE
    # 
    # Example implementation:
    #   from openai import AsyncOpenAI
    #   client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    #   response = await client.chat.completions.create(
    #       model="gpt-4",
    #       messages=[
    #           {"role": "system", "content": "Explain like I'm 10..."},
    #           {"role": "user", "content": text}
    #       ]
    #   )
    #   return response.choices[0].message.content
    # ============================================================
    return f"[ELI10 PENDING] {text}"


async def getChatResponse(message: str, context: dict = None) -> str:
    """
    Generate an AI-powered response to a user's financial question.

    TODO (Persona 2): Replace this placeholder with OpenAI API call.
    
    Suggested prompt strategy:
        - System role: "You are an AI financial advisor assistant"
        - Include portfolio context for personalized answers
        - Keep responses concise and actionable
    
    Args:
        message: The user's question or message.
        context: Optional dict with user's portfolio data for personalized responses.
                 Example: {"assets": [...], "total_balance": 1760}
    
    Returns:
        An AI-generated response string. Currently returns a placeholder.
    """
    # ============================================================
    # 🔌 PERSONA 2: INSERT YOUR OPENAI LOGIC HERE
    #
    # Example implementation:
    #   from openai import AsyncOpenAI
    #   client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    #   system_msg = f"You are a financial advisor. User portfolio: {context}"
    #   response = await client.chat.completions.create(
    #       model="gpt-4",
    #       messages=[
    #           {"role": "system", "content": system_msg},
    #           {"role": "user", "content": message}
    #       ]
    #   )
    #   return response.choices[0].message.content
    # ============================================================
    return (
        f"[AI PLACEHOLDER] Recibí tu pregunta: '{message}'. "
        "Cuando Persona 2 conecte OpenAI, recibirás una respuesta inteligente aquí. 🤖"
    )
