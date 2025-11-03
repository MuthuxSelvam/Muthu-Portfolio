# Portfolio Website

A modern, responsive portfolio website built with Flask, featuring advanced CSS animations and interactive JavaScript.

## 🚀 Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive Layout**: Works perfectly on all devices (mobile, tablet, desktop)
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Interactive Elements**: 
  - Typing effect on hero section
  - Animated skill bars
  - Scroll-triggered animations
  - Smooth scrolling navigation
- **AI Chatbot**: Interactive chatbot that answers questions about your work
- **Publications Page**: Dedicated page for research papers and publications
- **Single Page Application**: Fast navigation without page reloads
- **Contact Form**: Ready-to-use contact form
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📋 Sections

1. **Hero Section**: Eye-catching introduction with typing animation
2. **About**: Personal information and statistics
3. **Skills**: Technical skills with animated progress bars
4. **Projects**: Featured projects with hover effects
5. **Experience**: Professional timeline with volunteering work
6. **Publications**: Research papers and conference publications
7. **AI Chatbot**: Interactive assistant answering questions
8. **Contact**: Contact information and form

## 🛠️ Technologies Used

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd Tryy
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🚀 Running the Application

1. **Start the Flask server**:
   ```bash
   python app.py
   ```

2. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
Tryy/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── README.md              # This file
├── templates/
│   └── index.html         # Main HTML template
└── static/
    ├── css/
    │   └── style.css      # Main stylesheet
    ├── js/
    │   └── script.js      # JavaScript functionality
    └── images/            # Image assets
```

## 🎨 Customization

### Colors
Edit CSS variables in `static/css/style.css`:
```css
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #00b894;
  --accent-color: #fd79a8;
  /* ... */
}
```

### Content
Modify `templates/index.html` to update:
- Personal information
- Skills and experience
- Projects
- Contact details

### Typing Effect
Edit the text array in `static/js/script.js`:
```javascript
const typingTexts = [
  'AI Intern @Dexian',
  'Python Developer',
  'ML Researcher',
  'Data Scientist'
];
```

### Chatbot Responses
Edit the chatbot logic in `app.py`:
```python
# Add your own keyword-based responses
if any(word in user_message_lower for word in ['your_keyword']):
    bot_message = "Your custom response here"
```

### Publications
Update `templates/publications.html` to add:
- Your research papers
- Conference details
- Abstracts and keywords

## 🌐 Deployment

### Deploy to Heroku

1. Create a `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Add Heroku config:
   ```bash
   heroku create your-portfolio-name
   git push heroku main
   ```

### Deploy to PythonAnywhere

1. Upload your project files
2. Configure WSGI file
3. Point to `app.py`

### Deploy to Netlify/Vercel

1. Add a `vercel.json` or `netlify.toml` config
2. Or use their CLI tools

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Muthu Selvam**
- AI Intern
- Python Developer
- ML Researcher

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Flask community for excellent documentation

