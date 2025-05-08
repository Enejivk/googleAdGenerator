from datetime import datetime, timedelta
from typing import Dict, List
import threading
import time

class RateLimiter:
    def __init__(self, max_requests: int = 2, window_minutes: int = 60):
        self.max_requests = max_requests
        self.window_minutes = window_minutes
        self.requests: Dict[str, List[datetime]] = {}
        self._start_cleanup_thread()
    
    def is_allowed(self, ip: str) -> bool:
        now = datetime.now()
        window_start = now - timedelta(minutes=self.window_minutes)
        
        if ip not in self.requests:
            self.requests[ip] = [now]
            return True
            
        # Clean old requests
        self.requests[ip] = [req_time for req_time in self.requests[ip] 
                           if req_time > window_start]
        
        if len(self.requests[ip]) < self.max_requests:
            self.requests[ip].append(now)
            return True
            
        return False
    
    def _cleanup_old_entries(self):
        while True:
            time.sleep(300)  # Clean every 5 minutes
            now = datetime.now()
            window_start = now - timedelta(minutes=self.window_minutes)
            
            for ip in list(self.requests.keys()):
                self.requests[ip] = [req_time for req_time in self.requests[ip] 
                                   if req_time > window_start]
                if not self.requests[ip]:
                    del self.requests[ip]
    
    def _start_cleanup_thread(self):
        cleanup_thread = threading.Thread(target=self._cleanup_old_entries, daemon=True)
        cleanup_thread.start()
