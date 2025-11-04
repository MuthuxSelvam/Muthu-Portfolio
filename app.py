from flask import Flask, render_template, send_from_directory, request, jsonify, abort
import os

app = Flask(__name__, static_folder='static', template_folder='templates')

# ---------------------------
# Knowledge Base for Chatbot
# ---------------------------
knowledge = {
    "projects": "Muthu has worked on AI-based projects including Diabetes Prediction, Oncology Prediction, and AI-generated Image Detection using CNNs and Vision Transformers.",
    "skills": "Muthu's technical skills include Python, Flask, TensorFlow, PyTorch, scikit-learn, Pandas, and Flask. He specializes in machine learning, deep learning, data analysis, and AI model deployment.",
    "publications": "Muthu published 'Generated Image Detection Identifies Synthetic Patterns and Authenticity' at the International Conference on Sustainable Energy and Innovation Technology (ICSEIT 2K25).",
    "community": "Muthu participates in community service projects, helping promote sustainable technology education and volunteering at Anbagam Old Age Home.",
    "experience": "Muthu is currently an AI Intern at Dexian India, working on neural networks, computer vision, and NLP-based applications.",
}

# ---------------------------
# Portfolio Routes
# ---------------------------
@app.route('/')
def home():
    # Debug: verify resume path exists
    resume_path = os.path.join(app.static_folder, 'docs', 'MUTHU_SELVAM_Resume.pdf')
    print("DEBUG: resume path:", resume_path, "exists:", os.path.exists(resume_path))
    return render_template('index.html')

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

# Serve static files
@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

# Explicit download route to ensure reliability and force attachment
@app.route('/download-resume')
def download_resume():
    # Prefer file at static root with space in name (as per user's path)
    static_dir = app.static_folder
    preferred_filename = 'MUTHU SELVAM_Resume.pdf'
    alt_filename = 'MUTHU_SELVAM_Resume.pdf'

    # Try preferred filename first
    preferred_path = os.path.join(static_dir, preferred_filename)
    if os.path.exists(preferred_path):
        return send_from_directory(static_dir, preferred_filename, as_attachment=True)

    # Fallback: try alternative filename in static root
    alt_path_root = os.path.join(static_dir, alt_filename)
    if os.path.exists(alt_path_root):
        return send_from_directory(static_dir, alt_filename, as_attachment=True)

    # Fallback: try within static/docs for either naming
    docs_dir = os.path.join(static_dir, 'docs')
    preferred_in_docs = os.path.join(docs_dir, preferred_filename)
    alt_in_docs = os.path.join(docs_dir, alt_filename)
    if os.path.exists(preferred_in_docs):
        return send_from_directory(docs_dir, preferred_filename, as_attachment=True)
    if os.path.exists(alt_in_docs):
        return send_from_directory(docs_dir, alt_filename, as_attachment=True)

    print("ERROR: resume not found at", preferred_path, alt_path_root, preferred_in_docs, alt_in_docs)
    abort(404, description="Resume not found on the server.")

# Health check
@app.route('/health')
def health():
    return {'status': 'healthy', 'message': 'Portfolio API is running'}, 200

# ---------------------------
# Chatbot Route
# ---------------------------
@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_msg = request.json.get("message", "").lower().strip()

        if not user_msg:
            return jsonify({"reply": "Please type something — I can tell you about Muthu’s projects, research, or skills!"})

        if "project" in user_msg:
            reply = knowledge["projects"]
        elif "skill" in user_msg or "technology" in user_msg or "tool" in user_msg:
            reply = knowledge["skills"]
        elif "publication" in user_msg or "paper" in user_msg or "conference" in user_msg:
            reply = knowledge["publications"]
        elif "community" in user_msg or "service" in user_msg or "volunteer" in user_msg:
            reply = knowledge["community"]
        elif "experience" in user_msg or "intern" in user_msg or "work" in user_msg:
            reply = knowledge["experience"]
        elif "hello" in user_msg or "hi" in user_msg or "hey" in user_msg:
            reply = "Hello there! I'm Muthu’s AI assistant — I can tell you about his projects, research, skills, or experience!"
        elif "help" in user_msg or "what" in user_msg or "tell" in user_msg:
            reply = "I can share details about Muthu’s AI projects, research publications, community service, or professional experience. What would you like to know?"
        else:
            reply = "That’s a great question! Muthu’s still updating his portfolio with more details. Try asking about 'projects', 'skills', or 'experience'!"

        return jsonify({"reply": reply})

    except Exception:
        return jsonify({"reply": "I'm sorry, I'm having trouble processing that. Please try again!"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))
