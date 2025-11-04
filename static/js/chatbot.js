const chatMessages = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const voiceButton = document.getElementById("voiceButton");
const themeToggle = document.getElementById("themeToggle");
const typingIndicator = document.getElementById("typingIndicator");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const resumeBtn = document.getElementById("resumeDownload");

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addMessage(content, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat-message", `${sender}-message`);

  const avatar = document.createElement("div");
  avatar.classList.add("message-avatar");
  avatar.innerHTML = sender === "bot" ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';

  const textDiv = document.createElement("div");
  textDiv.classList.add("message-content");
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(textDiv);
  chatMessages.appendChild(messageDiv);
  scrollToBottom();

  if (sender === "bot") {
    let i = 0;
    const typing = setInterval(() => {
      textDiv.textContent += content.charAt(i);
      i++;
      if (i >= content.length) clearInterval(typing);
    }, 25);
  } else {
    textDiv.textContent = content;
  }

  scrollToBottom();
}

function showTyping() {
  typingIndicator.classList.remove("hidden");
  scrollToBottom();
}
function hideTyping() {
  typingIndicator.classList.add("hidden");
}

sendButton.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";

  showTyping();

  // Send message to Flask backend
  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
    .then(res => res.json())
    .then(data => {
      hideTyping();
      addMessage(data.reply, "bot");
    })
    .catch(() => {
      hideTyping();
      addMessage("Oops! I couldn’t connect to the server. Please try again.", "bot");
    });
});

// Suggestion chips
document.querySelectorAll(".suggestion-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    chatInput.value = chip.dataset.query;
    sendButton.click();
  });
});

// Dark/Light Mode Toggle
// --- Theme: Dark/Light with persistence ---
const DARK_KEY = "prefers-dark";
function applyDarkMode(enabled) {
  if (enabled) document.body.classList.add("dark-mode");
  else document.body.classList.remove("dark-mode");
  if (themeToggle) themeToggle.textContent = enabled ? "☀️" : "🌙";
}
applyDarkMode(localStorage.getItem(DARK_KEY) === "1");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const enabled = !document.body.classList.contains("dark-mode");
    applyDarkMode(enabled);
    localStorage.setItem(DARK_KEY, enabled ? "1" : "0");
  });
}

// --- Accent color switcher ---
const ACCENT_KEY = "accent-color";
function normalizeColor(c){return (c||"").trim().toLowerCase();}
function setAccent(color) {
  if (!color) return;
  document.documentElement.style.setProperty("--accent", color);
  localStorage.setItem(ACCENT_KEY, color);
  document.querySelectorAll('.accent-switcher .accent-dot').forEach(b=>{
    const isActive = normalizeColor(b.getAttribute('data-accent')) === normalizeColor(color);
    b.classList.toggle('is-active', isActive);
  });
}
const storedAccent = localStorage.getItem(ACCENT_KEY);
const defaultAccent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7c3aed";
setAccent(storedAccent || defaultAccent);
document.querySelectorAll('.accent-switcher .accent-dot').forEach(btn => {
  btn.addEventListener('click', () => setAccent(btn.getAttribute('data-accent')));
});

// Voice Input (Web Speech API)
if ("webkitSpeechRecognition" in window && voiceButton) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  voiceButton.addEventListener("click", () => recognition.start());
  recognition.onresult = (event) => {
    chatInput.value = event.results[0][0].transcript;
    sendButton.click();
  };
} else if (voiceButton) {
  voiceButton.style.display = "none";
}

// --- Hero Typing Effect ---
(() => {
  const typingTextEl = document.querySelector(".typing-effect .typing-text");
  const cursorEl = document.querySelector(".typing-effect .typing-cursor");
  if (!typingTextEl || !cursorEl) return;

  // Hide static subtitle to prevent duplication with typed text sequence
  const subtitleEl = document.querySelector(".hero-subtitle");
  if (subtitleEl) subtitleEl.textContent = "";

  const phrases = [
    "AI Intern @Dexian",
    "Python Developer & Final Year Student"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  // Blink cursor with CSS-class toggle if desired
  setInterval(() => cursorEl.classList.toggle("is-blinking"), 500);

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typingTextEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        // Pause at full phrase
        setTimeout(() => {
          deleting = true;
          requestAnimationFrame(typeLoop);
        }, 1200);
        return;
      }
    } else {
      typingTextEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(() => requestAnimationFrame(typeLoop), deleting ? 40 : 90);
  }

  requestAnimationFrame(typeLoop);
})();

// --- Scroll progress bar ---
function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const percent = docHeight ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
  scrollProgress.style.width = percent + "%";
}
window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

// --- Back to Top ---
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.style.opacity = window.scrollY > 400 ? "1" : "0";
    backToTop.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --- Resume download ---
if (resumeBtn) {
  resumeBtn.addEventListener("click", async () => {
    try {
      resumeBtn.classList.add("is-downloading");
      // Update this path if you place the file elsewhere
      const resp = await fetch("/static/resume.pdf", { cache: "no-store" });
      if (!resp.ok) throw new Error("Resume not found");
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Muthu_Selvam_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      // Fallback to static link in case of 404
      window.location.href = "/static/resume.pdf";
    } finally {
      setTimeout(() => resumeBtn.classList.remove("is-downloading"), 1200);
    }
  });
}

// --- Cursor glowing trail ---
(function initCursorTrail(){
  const MAX_DOTS = 16;
  const dots = [];
  const positions = [];
  for (let i=0;i<MAX_DOTS;i++){
    const el = document.createElement("div");
    el.className = "cursor-trail-dot";
    el.style.opacity = String(0.25 + (i/(MAX_DOTS-1))*0.75);
    document.body.appendChild(el);
    dots.push(el);
    positions.push({x: window.innerWidth/2, y: window.innerHeight/2});
  }
  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  window.addEventListener("mousemove", (e)=>{mouseX=e.clientX; mouseY=e.clientY;});
  function animate(){
    // ease positions toward the mouse for a trailing effect
    positions[0].x += (mouseX - positions[0].x) * 0.18;
    positions[0].y += (mouseY - positions[0].y) * 0.18;
    for (let i=1;i<MAX_DOTS;i++){
      positions[i].x += (positions[i-1].x - positions[i].x) * 0.24;
      positions[i].y += (positions[i-1].y - positions[i].y) * 0.24;
    }
    for (let i=0;i<MAX_DOTS;i++){
      const d = dots[i];
      const p = positions[i];
      d.style.left = p.x + "px";
      d.style.top = p.y + "px";
      d.style.transform = "translate(-50%,-50%) scale(" + (0.35 + i/MAX_DOTS) + ")";
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// --- 3D rotating cube with Three.js ---
(function initThree(){
  const canvas = document.getElementById("threeCanvas");
  if (!canvas || !window.THREE) return;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 100);
  camera.position.set(2.2, 1.6, 3.2);
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(3,3,2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x8899ff, 0.5));
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshStandardMaterial({ color: 0x7c3aed, metalness: 0.3, roughness: 0.35 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  function resize(){
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height || 1;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();
  let t=0;
  function tick(){
    t += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.02;
    cube.position.y = Math.sin(t)*0.1;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
