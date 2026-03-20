/* ============================================================
   Birthday Website for Chanchal – script.js
   Interactive features: loader, smooth scroll, typing, chat,
   compliment generator, confetti, music toggle
   ============================================================ */

// ========== DOM REFERENCES ==========
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typedMessageEl = document.getElementById('typed-message');
const typingCursor = document.getElementById('typing-cursor');
const chatBody = document.getElementById('chat-body');
const chatStatus = document.getElementById('chat-status');
const complimentBtn = document.getElementById('compliment-btn');
const complimentText = document.getElementById('compliment-text');
const surpriseBtn = document.getElementById('surprise-btn');
const musicToggle = document.getElementById('music-toggle');
const musicControls = document.getElementById('music-controls');
const confettiCanvas = document.getElementById('confetti-canvas');
const surpriseMessage = document.getElementById('surprise-message');
const birthdayAudio = document.getElementById('birthday-audio');

// ========== 1. LOADER ==========
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2400);
});

// ========== 2. NAVBAR – MOBILE TOGGLE ==========
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

// ========== 3. ACTIVE NAV ON SCROLL ==========
const sections = document.querySelectorAll('.section');

function highlightNav() {
  let scrollPos = window.scrollY + 150;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

window.addEventListener('scroll', highlightNav);

// ========== 4. SCROLL ANIMATIONS ==========
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  scrollObserver.observe(el);
});

// ========== 5. TYPING ANIMATION (Message Section) ==========
const birthdayMessage = `Happy Birthday Chanchal! 🎉🎂💖`

`On your special day, I just want to remind you how truly amazing you are and how lucky I feel to have you as my best friend. You bring so much happiness, laughter, and positivity into my life, and I honestly can’t imagine my life without you ✨😊`
`Thank you for always being there for me, for understanding me like no one else, and for making every moment we share so special 💕🌸 You deserve all the love, success, and happiness in the world today and always 🌟💫`
`May this year bring you closer to your dreams and fill your life with beautiful memories 🥳🌈 Keep shining, keep smiling, and never change—you’re perfect just the way you are 💛✨`;

let messageTyped = false;

function typeMessage(text, element, speed = 30) {
  let i = 0;
  element.textContent = '';
  typingCursor.style.display = 'inline-block';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Hide cursor after typing is done
      setTimeout(() => {
        typingCursor.style.display = 'none';
      }, 1500);
    }
  }
  type();
}

// Trigger typing when message section comes into view
const messageSection = document.getElementById('message');
const messageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !messageTyped) {
      messageTyped = true;
      setTimeout(() => {
        typeMessage(birthdayMessage, typedMessageEl, 28);
      }, 500);
    }
  });
}, { threshold: 0.3 });

messageObserver.observe(messageSection);

// ========== 6. FAKE CHAT MESSAGES ==========
const chatMessages = [
  { sender: 'me', text: 'Hey Chanchal! 🎉', time: '10:00 AM' },
  { sender: 'other', text: 'Hiii! 😄', time: '10:01 AM' },
  { sender: 'me', text: 'Guess what day it is? 🤔', time: '10:01 AM' },
  { sender: 'other', text: 'Hmmm… Tuesday? 😂', time: '10:02 AM' },
  { sender: 'me', text: "Noo silly! It's YOUR BIRTHDAY! 🎂🎈🎊", time: '10:02 AM' },
  { sender: 'other', text: 'OMG yesss!! I almost forgot!! 🤣🎉', time: '10:03 AM' },
  { sender: 'me', text: 'How could you forget YOUR OWN birthday 😂', time: '10:03 AM' },
  { sender: 'other', text: "Haha I was too busy being awesome 😎💅", time: '10:04 AM' },
  { sender: 'me', text: "That's actually true not gonna lie 😤💖", time: '10:04 AM' },
  { sender: 'me', text: 'I made something special for you… keep scrolling! 🎁✨', time: '10:05 AM' },
  { sender: 'other', text: "Awww you're the best!! 🥺💕", time: '10:05 AM' },
];

let chatStarted = false;

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.classList.add('chat-typing');
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(typing);
  chatBody.scrollTop = chatBody.scrollHeight;
  return typing;
}

function addChatBubble(msg) {
  const bubble = document.createElement('div');
  bubble.classList.add('chat-bubble', msg.sender === 'me' ? 'me' : 'other');
  bubble.innerHTML = `${msg.text}<span class="time">${msg.time}</span>`;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function animateChat(messages, index = 0) {
  if (index >= messages.length) {
    chatStatus.textContent = 'online';
    return;
  }

  const msg = messages[index];
  const isOther = msg.sender === 'other';

  if (isOther) {
    chatStatus.textContent = 'typing…';
  }

  // Show typing indicator
  const typingEl = showTypingIndicator();

  setTimeout(() => {
    // Remove typing indicator and add actual message
    typingEl.remove();
    addChatBubble(msg);

    if (isOther) {
      chatStatus.textContent = 'online';
    }

    // Move to next message
    setTimeout(() => {
      animateChat(messages, index + 1);
    }, 400);
  }, 1200 + Math.random() * 600);
}

// Trigger chat when section comes into view
const chatSection = document.getElementById('chat');
const chatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !chatStarted) {
      chatStarted = true;
      setTimeout(() => {
        animateChat(chatMessages);
      }, 600);
    }
  });
}, { threshold: 0.3 });

chatObserver.observe(chatSection);

// ========== 7. COMPLIMENT GENERATOR ==========
const compliments = [
  "You have the most beautiful soul 💫",
  "Your smile can light up the darkest days ☀️",
  "You're one in a million, literally! 💎",
  "The world is blessed to have you 🌍💖",
  "You make everything better just by being you ✨",
  "Your kindness is contagious 🤗",
  "You're braver than you believe 💪",
  "Your laughter is the best sound ever 😂💕",
  "You inspire everyone around you 🌟",
  "You're the definition of awesome 🔥",
  "Your heart is pure gold 💛",
  "You're a gift to this world 🎁",
  "You make ordinary days extraordinary 🌈",
  "Your positivity is magnetic 🧲✨",
  "You're the kind of person everyone deserves 💝",
  "You have a sparkle that nobody else has ✨",
  "You make people feel loved and valued 🥰",
  "You're the main character in everyone's story 🎬",
  "Your energy is absolutely infectious! 💃",
  "You're basically a real-life superhero 🦸‍♀️"
];

let lastComplimentIndex = -1;

complimentBtn.addEventListener('click', () => {
  let index;
  // Avoid repeating the last compliment
  do {
    index = Math.floor(Math.random() * compliments.length);
  } while (index === lastComplimentIndex);

  lastComplimentIndex = index;

  // Animate the text change
  complimentText.classList.remove('pop');
  // Trigger reflow to restart animation
  void complimentText.offsetWidth;
  complimentText.textContent = compliments[index];
  complimentText.classList.add('pop');

  // Button pulse effect
  complimentBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    complimentBtn.style.transform = '';
  }, 150);
});

// ========== 8. CONFETTI ANIMATION ==========
const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiAnimating = false;

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const confettiColors = [
  '#ff6b9d', '#c44dff', '#ffb347', '#7c4dff',
  '#ff4081', '#ffd54f', '#4fc3f7', '#69f0ae',
  '#ff8a65', '#e040fb', '#40c4ff', '#ffab40'
];

class ConfettiPiece {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = Math.random() * confettiCanvas.height - confettiCanvas.height;
    this.size = Math.random() * 8 + 4;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 6 - 3;
    this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    this.opacity = 1;
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Fade out near the bottom
    if (this.y > confettiCanvas.height - 100) {
      this.opacity -= 0.02;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(this.opacity, 0);
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;

    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

function startConfetti() {
  confettiPieces = [];
  confettiAnimating = true;

  // Create confetti pieces in waves
  for (let i = 0; i < 200; i++) {
    confettiPieces.push(new ConfettiPiece());
  }

  animateConfetti();

  // Stop after 6 seconds
  setTimeout(() => {
    confettiAnimating = false;
  }, 6000);
}

function animateConfetti() {
  if (!confettiAnimating && confettiPieces.every(p => p.opacity <= 0)) {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    return;
  }

  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach(piece => {
    piece.update();
    piece.draw();
  });

  // Remove fully transparent pieces
  confettiPieces = confettiPieces.filter(p => p.opacity > 0);

  // Add more confetti while animating
  if (confettiAnimating && Math.random() > 0.7) {
    confettiPieces.push(new ConfettiPiece());
  }

  requestAnimationFrame(animateConfetti);
}

// ========== 9. SURPRISE BUTTON ==========
let surpriseTriggered = false;

surpriseBtn.addEventListener('click', () => {
  if (surpriseTriggered) return;
  surpriseTriggered = true;

  // Start confetti
  startConfetti();

  // Show surprise message
  surpriseMessage.classList.remove('hidden');

  // Play music
  birthdayAudio.volume = 0.5;
  birthdayAudio.play().catch(() => {
    // Autoplay may be blocked, that's okay
    console.log('Audio autoplay blocked by browser. User can click play.');
  });

  // Show music controls
  musicControls.classList.remove('hidden');

  // Change button text
  surpriseBtn.textContent = '🎉 Celebration Unlocked!';
  surpriseBtn.disabled = true;
  surpriseBtn.style.opacity = '0.7';
  surpriseBtn.style.cursor = 'default';
});

// ========== 10. MUSIC TOGGLE ==========
let musicPlaying = true;

musicToggle.addEventListener('click', () => {
  if (musicPlaying) {
    birthdayAudio.pause();
    musicToggle.textContent = '🎵 Play Music';
    musicPlaying = false;
  } else {
    birthdayAudio.play();
    musicToggle.textContent = '🎵 Pause Music';
    musicPlaying = true;
  }
});

// ========== 11. SMOOTH SCROLL FOR "Start the Surprise" BUTTON ==========
document.getElementById('start-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.querySelector(e.currentTarget.getAttribute('href'));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// ========== 12. NAVBAR SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    navbar.style.background = 'rgba(255, 255, 255, 0.92)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
    navbar.style.background = 'rgba(255, 255, 255, 0.75)';
  }
});
