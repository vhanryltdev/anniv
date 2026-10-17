// Background Floating Hearts Canvas Effect
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

let hearts = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 1.2 + 0.5;
    this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = `hsla(${Math.random() * 30 + 330}, 100%, 65%, ${this.opacity})`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
    ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }
}

// Initialize 35 Floating Hearts
for (let i = 0; i < 35; i++) {
  hearts.push(new Heart());
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateHearts);
}
animateHearts();

// Entrance Overlay & Audio Controller
const music = document.getElementById('bg-music');
const enterModal = document.getElementById('enterModal');
const enterBtn = document.getElementById('enterBtn');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

let isPlaying = false;

// Audio Auto-play on First User Interaction
function startAudio() {
  music.play().then(() => {
    isPlaying = true;
    musicIcon.className = "fa-solid fa-disc-doc spin-disc";
  }).catch(e => {
    console.log("Autoplay blocked:", e);
  });
  
  enterModal.style.opacity = '0';
  setTimeout(() => {
    enterModal.style.display = 'none';
  }, 500);
}

enterBtn.addEventListener('click', startAudio);

// Floating Audio Play/Pause Button
musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicIcon.className = "fa-solid fa-pause";
  } else {
    music.play();
    isPlaying = true;
    musicIcon.className = "fa-solid fa-disc-doc spin-disc";
  }
});

// Live Relationship Time Counter
const startDate = new Date('2022-10-26T00:00:00');

function updateCounter() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
  document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}
setInterval(updateCounter, 1000);
updateCounter();

// Gallery Horizontal Scroll Controls
const track = document.getElementById('galleryTrack');
document.getElementById('prevBtn').addEventListener('click', () => {
  track.scrollBy({ left: -250, behavior: 'smooth' });
});
document.getElementById('nextBtn').addEventListener('click', () => {
  track.scrollBy({ left: 250, behavior: 'smooth' });
});

// Photo Lightbox Zoom Modal
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.textContent = caption;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}