// ============================================
// DESIGN MASTERCLASS — FIGMA DESIGN SYSTEM
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('prompt-input');
  const charCount = document.getElementById('char-count');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('submit-btn');
  const successOverlay = document.getElementById('success-overlay');

  // --- Character Counter ---
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = len.toLocaleString();

    if (len > 1800) {
      charCounter.classList.add('near-limit');
    } else {
      charCounter.classList.remove('near-limit');
    }
  });

  // --- Auto-resize textarea to fill available space ---
  function adjustTextareaHeight() {
    const vh = window.innerHeight;
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    const label = document.querySelector('.caption');
    const subhead = document.querySelector('.subhead');
    const counter = document.querySelector('.char-counter');

    if (!header || !footer) return;

    const headerH = header.offsetHeight;
    const footerH = footer.offsetHeight;
    const labelH = label ? label.offsetHeight + 12 : 0;
    const subheadH = subhead ? subhead.offsetHeight + 24 : 0;
    const counterH = counter ? counter.offsetHeight + 8 : 0;
    const blockPadding = 96; // top + bottom xxl padding of color block
    const extra = 24;

    const available = vh - headerH - footerH - labelH - subheadH - counterH - blockPadding - extra;
    const minH = 200;
    textarea.style.minHeight = Math.max(available, minH) + 'px';
  }

  adjustTextareaHeight();
  window.addEventListener('resize', adjustTextareaHeight);

  // --- Ripple effect on button ---
  submitBtn.addEventListener('pointerdown', (e) => {
    const rect = submitBtn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    submitBtn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });

  // --- Submit handler ---
  submitBtn.addEventListener('click', () => {
    const prompt = textarea.value.trim();

    if (!prompt) {
      // Shake animation for empty submit
      textarea.style.animation = 'none';
      textarea.offsetHeight; // trigger reflow
      textarea.style.animation = 'shake 0.4s ease';
      textarea.focus();

      // Temporary border emphasis
      textarea.style.borderColor = '#000000';
      setTimeout(() => {
        textarea.style.borderColor = '';
        textarea.style.animation = '';
      }, 1200);
      return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').textContent = '전송 중…';

    // Simulate sending (replace with actual API call)
    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.querySelector('.btn-text').textContent = '프롬프트 전송하기';

      // Show success overlay
      successOverlay.classList.add('visible');
      successOverlay.setAttribute('aria-hidden', 'false');

      // Auto-hide after 2.5 seconds
      setTimeout(() => {
        successOverlay.classList.remove('visible');
        successOverlay.setAttribute('aria-hidden', 'true');
        textarea.value = '';
        charCount.textContent = '0';
        charCounter.classList.remove('near-limit');
        textarea.focus();
      }, 2500);
    }, 1200);
  });

  // --- Dismiss success overlay on tap ---
  successOverlay.addEventListener('click', () => {
    successOverlay.classList.remove('visible');
    successOverlay.setAttribute('aria-hidden', 'true');
    textarea.value = '';
    charCount.textContent = '0';
    charCounter.classList.remove('near-limit');
    textarea.focus();
  });
});
