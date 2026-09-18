/**
 * WTMA — Section Metamorphosis (From Thread to Garment)
 * Interactive Apple-Style Canvas Sequence Scrubbing & WTMA Logo Reveal
 */

document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('metamorphosis');
  const canvas = document.getElementById('metamorphosisCanvas');
  const logoOverlay = document.getElementById('metaLogoOverlay');

  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  const totalFrames = 120;
  const frames = [];
  let loadedCount = 0;
  let currentDrawnIndex = -1;
  let isTicking = false;

  // Set internal canvas resolution
  canvas.width = 1280;
  canvas.height = 720;

  // Preload frames
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    const padNum = String(i).padStart(3, '0');
    img.src = `images/gemini-sequence/frame_${padNum}.jpg`;
    img.onload = () => {
      loadedCount++;
      if (loadedCount === 1) {
        // Draw first frame immediately
        drawFrame(1);
      }
    };
    frames.push(img);
  }

  function drawFrame(frameIdx) {
    const idx = Math.min(Math.max(frameIdx, 1), totalFrames);
    if (idx === currentDrawnIndex) return;

    const img = frames[idx - 1];
    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      currentDrawnIndex = idx;
    }

    const progress = (idx - 1) / (totalFrames - 1);

    // =========================================================================
    // WTMA LOGO REVEAL (Appears smoothly from bottom when garment is finished)
    // =========================================================================
    if (logoOverlay) {
      if (progress >= 0.82) {
        logoOverlay.classList.add('is-revealed');
      } else {
        logoOverlay.classList.remove('is-revealed');
      }
    }
  }

  // Scroll event listener
  function onScroll() {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        updateFromScroll();
        isTicking = false;
      });
      isTicking = true;
    }
  }

  function updateFromScroll() {
    const rect = section.getBoundingClientRect();
    const scrollableDist = rect.height - window.innerHeight;

    if (scrollableDist <= 0) return;

    // Fraction from 0.0 (top entered) to 1.0 (bottom reached)
    const scrollFraction = Math.min(Math.max(-rect.top / scrollableDist, 0), 1);
    const targetFrame = Math.round(1 + scrollFraction * (totalFrames - 1));

    drawFrame(targetFrame);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial check
  updateFromScroll();
});
