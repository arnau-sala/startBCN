"""
Servicio AIEngine — Puente con Persona 2 (integración IA).

Si está definida NEXTJS_API_URL (ej. http://localhost:3000), llama a la API de Next.js
para ELI10 y chat real. Si no, usa placeholders para que el backend funcione solo.
"""

import os
import httpx

NEXTJS_API = os.getenv("NEXTJS_API_URL", "").rstrip("/")


async def translateToELI10(text: str) -> str:
    """
    Convierte texto financiero a lenguaje sencillo (ELI10).
    Si NEXTJS_API_URL está definida, hace POST a {NEXTJS_API}/api/eli10.
    """
    if NEXTJS_API:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                r = await client.post(
                    f"{NEXTJS_API}/api/eli10",
                    json={
                        "title": "Noticia",
                        "technical_content": text,
                        "category": "macro",
                    },
                )
                if r.is_success:
                    data = r.json()
                    return data.get("eli10_content", "") or f"[ELI10] {text}"
        except Exception:
            pass
    return f"[ELI10 pending] {text}"


async def getChatResponse(message: str, context: dict = None) -> str:
    """
    Respuesta del chat con IA. Si NEXTJS_API_URL está definida, hace POST a {NEXTJS_API}/api/chat
    con contexto de cartera.
    """
    if NEXTJS_API:
        try:
            payload = {"message": message}
            if context:
                total = context.get("total_balance")
                assets = context.get("assets", [])
                if total is not None or assets:
                    payload["assetsSummary"] = (
                        f"Balance total {total} EUR. "
                        + ", ".join(
                            f"{a.get('name', a.get('symbol', ''))} {a.get('value')}€"
                            for a in assets[:5]
                        )
                    )
            async with httpx.AsyncClient(timeout=30.0) as client:
                r = await client.post(f"{NEXTJS_API}/api/chat", json=payload)
                if r.is_success:
                    data = r.json()
                    return data.get("reply", "")
        except Exception:
            pass
    return (
        f"[AI placeholder] Received your question: '{message}'. "
        "Set NEXTJS_API_URL (e.g. http://localhost:3000) and LLM_API_KEY in Next.js for real responses."
    )
