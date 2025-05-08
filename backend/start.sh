#!/bin/bash

# Activate the virtual environment
source .venv/bin/activate

# Navigate to the project directory
cd /path/to/your/app

# Run Uvicorn with desired options
uvicorn main:app --host 127.0.0.1 --port 8000 --workers 1
