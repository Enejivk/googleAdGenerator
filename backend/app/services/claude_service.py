import os
import json
from typing import List
import anthropic
from dotenv import load_dotenv

class ClaudeService:
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY environment variable is not set")
        self.client = anthropic.Anthropic(api_key=api_key)

    async def generate_ad_variations(self, company_name: str, product_name: str, description: str) -> List[str]:
        prompt = f"""
        You are an expert ad copywriter. Based on the following company and product information, return a JSON object with an "ads" array containing exactly 3 concise and compelling ad copy variations.

        Company: {company_name}
        Product: {product_name}
        Description: {description}

        Each variation should follow Google Ads best practices and be suitable for digital ads.
=
        Respond only with JSON in this format:
        {{
            "ads": [
                "Ad copy variation 1",
                "Ad copy variation 2",
                "Ad copy variation 3"
            ]
        }}
        """

        message = self.client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=1000,
            temperature=1,
            system="You must respond only with a valid JSON object containing the ads array.",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )

        try:
            content = message.content[0].text.strip()
            json_start = content.find('{')
            json_data = content[json_start:]
            ads_object = json.loads(json_data)
            return ads_object.get("ads", [])
        except Exception as e:
            raise Exception(f"Error parsing Claude response: {e}")
