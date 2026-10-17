
/* ==========================================
   1. FLOATING HEARTS CANVAS EFFECT
========================================== */

const canvas = document.getElementById("heartCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const hearts = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Heart {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial
      ? Math.random() * canvas.height
      : canvas.height + Math.random() * 100;

    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 1.2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.opacity = Math.random() * 0.5 + 0.2;

    this.color = `hsla(${Math.random() * 30 + 330}, 100%, 65%, ${this.opacity})`;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;

    if (this.y < -20) {
      this.reset();
    }

    if (this.x < -20) {
      this.x = canvas.width + 20;
    } else if (this.x > canvas.width + 20) {
      this.x = -20;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(
      -this.size / 2,
      -this.size / 2,
      -this.size,
      this.size / 3,
      0,
      this.size
    );

    ctx.bezierCurveTo(
      this.size,
      this.size / 3,
      this.size / 2,
      -this.size / 2,
      0,
      0
    );

    ctx.fill();
    ctx.restore();
  }
}

function animateHearts() {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  hearts.forEach((heart) => {
    heart.update();
    heart.draw();
  });

  requestAnimationFrame(animateHearts);
}

if (canvas && ctx) {
  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < 35; i++) {
    hearts.push(new Heart());
  }

  animateHearts();
}


/* ==========================================
   2. ENTRANCE SCREEN AND MUSIC PLAYER
========================================== */

const music = document.getElementById("bg-music");
const enterModal = document.getElementById("enterModal");
const enterBtn = document.getElementById("enterBtn");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let isPlaying = false;

function updateMusicIcon(playing) {
  if (!musicIcon) return;

  if (playing) {
    musicIcon.className =
      "fa-solid fa-compact-disc spin-disc";
  } else {
    musicIcon.className = "fa-solid fa-play";
  }
}

function hideEntranceScreen() {
  if (!enterModal) return;

  enterModal.style.opacity = "0";
  enterModal.style.pointerEvents = "none";

  setTimeout(() => {
    enterModal.style.display = "none";
  }, 500);
}

async function playMusic() {
  if (!music) {
    console.error(
      "Music player not found. Check for id='bg-music' in your HTML."
    );
    return false;
  }

  try {
    await music.play();

    isPlaying = true;
    updateMusicIcon(true);

    return true;
  } catch (error) {
    isPlaying = false;
    updateMusicIcon(false);

    console.error("Music playback failed:", error);

    return false;
  }
}

function pauseMusic() {
  if (!music) return;

  music.pause();
  isPlaying = false;
  updateMusicIcon(false);
}

// Called when the user taps "Pindota labs".
async function startAudio() {
  // Hide the entrance screen even if audio fails.
  hideEntranceScreen();

  // Attempt playback directly from the user's tap.
  await playMusic();
}

if (enterBtn) {
  enterBtn.addEventListener("click", startAudio);
}

// Floating music play/pause button.
if (musicToggle) {
  musicToggle.addEventListener("click", async () => {
    if (!music) return;

    if (!music.paused) {
      pauseMusic();
    } else {
      await playMusic();
    }
  });
}

// Keep the icon synchronized with the real audio state.
if (music) {
  music.addEventListener("play", () => {
    isPlaying = true;
    updateMusicIcon(true);
  });

  music.addEventListener("pause", () => {
    isPlaying = false;
    updateMusicIcon(false);
  });

  music.addEventListener("ended", () => {
    isPlaying = false;
    updateMusicIcon(false);
  });

  music.addEventListener("error", () => {
    isPlaying = false;
    updateMusicIcon(false);

    console.error(
      "Audio could not load. Check the music file path and network."
    );
  });
}


/* ==========================================
   3. LIVE RELATIONSHIP TIME COUNTER
========================================== */

const startDate = new Date("2022-10-26T00:00:00");

function updateCounter() {
  const now = new Date();
  const difference = now.getTime() - startDate.getTime();

  if (difference < 0) return;

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (daysElement) {
    daysElement.textContent = days;
  }

  if (hoursElement) {
    hoursElement.textContent = String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent = String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent = String(seconds).padStart(2, "0");
  }
}

updateCounter();
setInterval(updateCounter, 1000);


/* ==========================================
   4. GALLERY HORIZONTAL SCROLL
========================================== */

const track = document.getElementById("galleryTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (track && prevBtn) {
  prevBtn.addEventListener("click", () => {
    track.scrollBy({
      left: -250,
      behavior: "smooth"
    });
  });
}

if (track && nextBtn) {
  nextBtn.addEventListener("click", () => {
    track.scrollBy({
      left: 250,
      behavior: "smooth"
    });
  });
}


/* ==========================================
   5. PHOTO LIGHTBOX
========================================== */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function openLightbox(src, caption = "") {
  if (!lightbox || !lightboxImg) {
    console.error("Lightbox elements are missing from the HTML.");
    return;
  }

  lightboxImg.src = src;
  lightboxImg.alt = caption || "Enlarged photo";

  if (lightboxCaption) {
    lightboxCaption.textContent = caption;
  }

  lightbox.style.display = "flex";
}

function closeLightbox() {
  if (lightbox) {
    lightbox.style.display = "none";
  }
}

// Allow existing inline onclick handlers in index.html to work.
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Close the lightbox when Escape is pressed.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

console.log("Anniversary website JavaScript loaded successfully.");
