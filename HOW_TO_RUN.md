# How to Run the Travel Website

Follow these simple steps to run the travel website on your computer:

## Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) installed on your computer
- You should have npm (Node Package Manager) which comes with Node.js

## Running the Website

### Option 1: Using the Provided Scripts (Easiest)

#### For Windows:
1. Double-click the `start-website.bat` file
2. Wait for the process to complete
3. Open your browser and go to http://localhost:8080

#### For macOS/Linux:
1. Open Terminal
2. Navigate to the travel-website folder
3. Run: `chmod +x start-website.sh` (to make the script executable)
4. Run: `./start-website.sh`
5. Open your browser and go to http://localhost:8080

### Option 2: Manual Steps

1. Open a terminal or command prompt
2. Navigate to the travel-website folder
3. Run: `npm install` (to install dependencies)
4. Run: `npm run build` (to build the React application)
5. Run: `npm run server` (to start the server)
6. Open your browser and go to http://localhost:8080

### Option 3: Development Mode

If you want to run the website in development mode (with hot reloading):

#### For Windows:
1. Open a terminal or command prompt
2. Navigate to the travel-website folder
3. Run: `npm install` (to install dependencies)
4. Run: `npm run start-windows`
5. Your browser should automatically open to http://localhost:8080

#### For macOS/Linux:
1. Open Terminal
2. Navigate to the travel-website folder
3. Run: `npm install` (to install dependencies)
4. Run: `npm start`
5. Your browser should automatically open to http://localhost:8080

## Troubleshooting

If you encounter any issues:

1. Make sure port 8080 is not being used by another application
2. Check that you have Node.js installed correctly
3. If you see any errors in the terminal, try running `npm install` again
4. Make sure you're in the correct folder (travel-website) when running commands