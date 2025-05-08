#!/bin/bash

if [ -z "$1"]; then
    echo "Error: no commit message provided"
    echo "Usage: <fileName> <commit message>"
    exit 1
fi

git add .
git commit -m "$1"

ip = "16.171.238.39"