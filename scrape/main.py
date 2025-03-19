import asyncio
import httpx
import os
from dotenv import load_dotenv
load_dotenv('../.env')

async def push_data(dining_hall: str):
    url = "http://localhost:3000/api/push"
    payload = {
        "supabaseUrl": os.environ.get("VUE_APP_SUPABASE_URL"),
        "supabaseKey": os.environ.get("VUE_APP_SUPABASE_KEY"),
        "dhall": dining_hall
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        print(response.json())


asyncio.run(push_data("stone-davis"))