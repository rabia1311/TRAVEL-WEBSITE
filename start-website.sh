#!/bin/bash
echo "Starting Travel Website..."
echo
echo "Step 1: Installing dependencies..."
npm install
echo
echo "Step 2: Building the React application..."
npm run build
echo
echo "Step 3: Starting the server on port 8080..."
npm run server