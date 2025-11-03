"""
WSGI entry point for Vercel deployment
"""
from app import app

# Export the app for Vercel
application = app

if __name__ == "__main__":
    app.run()

