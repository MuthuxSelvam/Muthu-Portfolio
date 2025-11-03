from flask import Flask, render_template, send_from_directory, request, jsonify
import os

app = Flask(__name__)

# Route for static files
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Main portfolio route (single page application)
@app.route('/')
def home():
    return render_template('index.html')

# Legacy routes for backward compatibility
@app.route('/about')
def about():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('index.html')

@app.route('/publications')
def publications():
    return render_template('publications.html')

@app.route('/experience')
def experience():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('index.html')

# Health check endpoint
@app.route('/health')
def health():
    return {'status': 'healthy', 'message': 'Portfolio API is running'}, 200

# --- AI Chatbot API Route ---
@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get("message", "")
        
        # Simple chatbot response based on keywords (no external API needed)
        user_message_lower = user_message.lower()
        
        # Keyword-based responses
        if any(word in user_message_lower for word in ['diabetes', 'prediction', 'medical', 'health']):
            bot_message = "I developed a Diabetes Prediction System using Python (scikit-learn, SVM) that analyzes patient data to enable early interventions. The model was trained on 1000+ patient records and achieved a 15% reduction in predicted hospitalizations. It uses key indicators like BMI, glucose levels, and age for accurate predictions."
        
        elif any(word in user_message_lower for word in ['ai', 'generated', 'image', 'detection', 'deepfake']):
            bot_message = "I worked on AI-Generated Image Detection using CNNs and Vision Transformers. This project focuses on detecting synthetic patterns and assessing authenticity in images. It analyzes minute inconsistencies and deepfake signatures to distinguish real from AI-generated content. Published at ICSEIT 2025 conference."
        
        elif any(word in user_message_lower for word in ['oncology', 'cancer', 'prediction', 'medical']):
            bot_message = "I developed an Oncology Prediction Model using SVM and Reinforcement Learning for early cancer detection. This machine learning system helps healthcare professionals make data-driven decisions for improved patient care and treatment planning."
        
        elif any(word in user_message_lower for word in ['volunteer', 'community', 'service']):
            bot_message = "I'm passionate about community service! I led educational workshops at Community Connect, reaching 200+ participants on health awareness and digital literacy. I also volunteer at Anbagam Old Age Home, providing companionship and supporting 40+ residents with daily operations."
        
        elif any(word in user_message_lower for word in ['experience', 'intern', 'work']):
            bot_message = "I'm currently an AI Intern at Dexian India, working on cutting-edge AI projects involving neural networks, computer vision, and NLP. I'm constantly learning and building solutions that combine technology with real-world impact."
        
        elif any(word in user_message_lower for word in ['skill', 'technology', 'tools']):
            bot_message = "My core skills include Python, TensorFlow, PyTorch, scikit-learn, Pandas, and Flask. I specialize in machine learning, deep learning, data analysis, and AI model deployment. I also work with Docker, Git, and Jupyter for development workflows."
        
        elif any(word in user_message_lower for word in ['hello', 'hi', 'hey', 'greeting']):
            bot_message = "Hello! I'm an AI Intern and Python Developer passionate about machine learning and solving real-world problems. Ask me about my projects, research, or experience!"
        
        elif any(word in user_message_lower for word in ['help', 'what', 'tell']):
            bot_message = "I can tell you about my AI projects (Diabetes Prediction, Image Detection, Oncology Model), my research publications, community service work, technical skills, or professional experience. What would you like to know?"
        
        else:
            bot_message = "That's interesting! Could you ask me about my projects, research publications, community work, technical skills, or experience? I'd love to share more about what I do."
        
        return jsonify({"reply": bot_message})
    
    except Exception as e:
        return jsonify({"reply": "I'm sorry, I'm having trouble processing that. Please try asking about my projects, research, or experience!"}), 500

if __name__ == '__main__':
    # Run the app in debug mode
    app.run(debug=True, host='0.0.0.0', port=5000)
