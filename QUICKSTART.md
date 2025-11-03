# Quick Start Guide

## 🚀 Get Your Portfolio Running in 5 Minutes

### Prerequisites
- Python 3.7 or higher installed
- pip package manager

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run the Application

```bash
python app.py
```

### Step 3: Open in Browser

Navigate to: **http://localhost:5000**

That's it! Your portfolio is now running! 🎉

---

## 🎨 Customization Quick Tips

### Change Your Name
Edit `templates/index.html` line 19 and 44

### Update Typing Animation
Edit `static/js/script.js` line 5-8

### Modify Colors
Edit `static/css/style.css` lines 6-15

### Add Your Projects
Edit `templates/index.html` starting at line 262

### Update Social Links
Edit `templates/index.html` lines 60-63

### Add Contact Information
Edit `templates/index.html` lines 396-422

---

## 📸 Add Your Profile Photo

1. Place your photo in `static/images/` folder
2. Name it `profile.jpg`
3. Update line 21 in `templates/index.html` if needed

---

## 🌐 Deploy Online

### Deploy to Heroku (Free)

1. Create account on [Heroku](https://heroku.com)
2. Install Heroku CLI
3. Run:
```bash
heroku create your-portfolio-name
git push heroku main
```

### Deploy to PythonAnywhere (Free)

1. Create account on [PythonAnywhere](https://www.pythonanywhere.com)
2. Upload your files
3. Configure WSGI file

---

## ❓ Need Help?

Check the full [README.md](README.md) for detailed documentation.

## 🐛 Troubleshooting

**Port already in use?**
```bash
python app.py
# Or change port in app.py line 40
```

**Module not found?**
```bash
pip install flask
```

**CSS not loading?**
Make sure Flask serves static files correctly. Check `app.py` configuration.

---

Enjoy your new portfolio! ⭐

