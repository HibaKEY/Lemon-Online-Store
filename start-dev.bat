@echo off
echo Starting Lemon App Development Environment...
echo.

echo Installing backend dependencies...
cd backend
call npm install
echo.

echo Starting backend server...
start "Backend Server" cmd /k "npm start"
echo.

echo Starting frontend development server...
cd ..
start "Frontend Server" cmd /k "npm start"
echo.

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause

