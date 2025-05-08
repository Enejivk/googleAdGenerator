from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from ..services.claude_service import ClaudeService
from ..services.google_ads_service import GoogleAdsService
from ..utils.rate_limiter import RateLimiter
from typing import List



ai_response = {
  "ads": [
    "Illuminate your outdoor adventures with the SolarBright Lantern - compact, eco-friendly, and powered by the sun. Bright LED light, up to 12 hours runtime.",
    "Never be left in the dark - the SolarBright Lantern charges in sunlight and provides reliable, long-lasting light for camping, emergencies, and more.",
    "Durable, waterproof, and easy to carry - the SolarBright Lantern is the ultimate solar-powered companion for your outdoor explorations."
  ],
  "usageCount": 0
}
router = APIRouter()
claude_service = ClaudeService()
google_ads_service = GoogleAdsService()
rate_limiter = RateLimiter(max_requests=2, window_minutes=60)

class AdGenerateRequest(BaseModel):
    company_name: str
    product_name: str
    description: str

class AdCreateRequest(BaseModel):
    ad_text: str

class AdGenerateResponse(BaseModel):
    ads: List[str]

@router.post("/generate-ads", response_model=AdGenerateResponse)
async def generate_ads(request: AdGenerateRequest, req: Request):
    return ai_response

    client_ip = req.client.host
    if not rate_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=429, 
            detail="Rate limit exceeded. Maximum 2 requests per hour allowed."
        )
    
    try:
        # I WILL CALL YOU WHEN THE APPLICATION IS LIVE
        # ad_variations = await claude_service.generate_ad_variations(
        #     product_name=request.product_name,
        #     company_name=request.company_name,
        #     description=request.description
        # )
        return ai_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
