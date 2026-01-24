import { useEffect, useRef, useCallback } from 'react';

export default function ParticleScanner({ isScanning = false, height = 200 }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const stateRef = useRef({
    intensity: 0.8,
    maxParticles: 400,
    fadeZone: 120,
    currentIntensity: 0.8,
    currentMaxParticles: 400,
    currentFadeZone: 120,
    currentGlowIntensity: 1,
    count: 0
  });

  // Target values for scanning state
  const scanTargets = {
    intensity: 1.8,
    maxParticles: 1200,
    fadeZone: 80,
    glowIntensity: 3.5
  };

  const baseValues = {
    intensity: 0.8,
    maxParticles: 400,
    fadeZone: 120,
    glowIntensity: 1
  };

  const transitionSpeed = 0.05;

  // Create gradient cache
  const gradientCanvasRef = useRef(null);

  const createGradientCache = useCallback(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 16;
    canvas.height = 16;

    const half = canvas.width / 2;
    const gradient = ctx.createRadialGradient(half, half, 0, half, half, half);

    // Coral/salmon accent colors
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(224, 123, 93, 0.8)');
    gradient.addColorStop(0.7, 'rgba(224, 123, 93, 0.4)');
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(half, half, half, 0, Math.PI * 2);
    ctx.fill();

    gradientCanvasRef.current = canvas;
  }, []);

  const createParticle = useCallback((w, h, lightBarX, lightBarWidth) => {
    const state = stateRef.current;
    const intensityRatio = state.intensity / baseValues.intensity;
    const speedMultiplier = 1 + (intensityRatio - 1) * 1.2;
    const sizeMultiplier = 1 + (intensityRatio - 1) * 0.7;

    return {
      x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
      y: Math.random() * h,
      vx: (0.2 + Math.random() * 0.8) * speedMultiplier,
      vy: (Math.random() - 0.5) * 0.3 * speedMultiplier,
      radius: (0.4 + Math.random() * 0.6) * sizeMultiplier,
      alpha: 0.6 + Math.random() * 0.4,
      decay: (0.005 + Math.random() * 0.02) * (2 - intensityRatio * 0.5),
      originalAlpha: 0,
      life: 1.0,
      time: 0,
      twinkleSpeed: (0.02 + Math.random() * 0.06) * speedMultiplier,
      twinkleAmount: 0.1 + Math.random() * 0.15
    };
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const state = stateRef.current;
    const particles = particlesRef.current;
    const gradientCanvas = gradientCanvasRef.current;

    const lightBarX = w / 2;
    const lightBarWidth = 3;

    // Smooth transitions
    const targetIntensity = isScanning ? scanTargets.intensity : baseValues.intensity;
    const targetMaxParticles = isScanning ? scanTargets.maxParticles : baseValues.maxParticles;
    const targetFadeZone = isScanning ? scanTargets.fadeZone : baseValues.fadeZone;
    const targetGlowIntensity = isScanning ? scanTargets.glowIntensity : baseValues.glowIntensity;

    state.currentIntensity += (targetIntensity - state.currentIntensity) * transitionSpeed;
    state.currentMaxParticles += (targetMaxParticles - state.currentMaxParticles) * transitionSpeed;
    state.currentFadeZone += (targetFadeZone - state.currentFadeZone) * transitionSpeed;
    state.currentGlowIntensity += (targetGlowIntensity - state.currentGlowIntensity) * transitionSpeed;

    state.intensity = state.currentIntensity;
    state.maxParticles = Math.floor(state.currentMaxParticles);
    state.fadeZone = state.currentFadeZone;

    // Clear canvas
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    // Draw light bar
    drawLightBar(ctx, w, h, lightBarX, lightBarWidth, state);

    // Draw and update particles
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!p) continue;

      // Update particle
      p.x += p.vx;
      p.y += p.vy;
      p.time++;
      p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
      p.life -= p.decay;

      // Reset if off screen or dead
      if (p.x > w + 10 || p.life <= 0) {
        particles[i] = createParticle(w, h, lightBarX, lightBarWidth);
        particles[i].originalAlpha = particles[i].alpha;
      }

      // Draw particle
      if (p.life > 0 && gradientCanvas) {
        let fadeAlpha = 1;
        if (p.y < state.fadeZone) {
          fadeAlpha = p.y / state.fadeZone;
        } else if (p.y > h - state.fadeZone) {
          fadeAlpha = (h - p.y) / state.fadeZone;
        }
        fadeAlpha = Math.max(0, Math.min(1, fadeAlpha));

        ctx.globalAlpha = p.alpha * fadeAlpha;
        ctx.drawImage(
          gradientCanvas,
          p.x - p.radius,
          p.y - p.radius,
          p.radius * 2,
          p.radius * 2
        );
      }
    }

    // Spawn new particles based on intensity
    const intensityRatio = state.intensity / baseValues.intensity;
    if (Math.random() < state.intensity && state.count < state.maxParticles) {
      const particle = createParticle(w, h, lightBarX, lightBarWidth);
      particle.originalAlpha = particle.alpha;
      particles.push(particle);
      state.count++;
    }

    // Extra particles when scanning
    if (intensityRatio > 1.1 && Math.random() < (intensityRatio - 1.0) * 1.2) {
      const particle = createParticle(w, h, lightBarX, lightBarWidth);
      particle.originalAlpha = particle.alpha;
      particles.push(particle);
      state.count++;
    }

    // Cleanup excess particles
    if (state.count > state.maxParticles + 100) {
      particles.splice(state.maxParticles, particles.length - state.maxParticles);
      state.count = particles.length;
    }

    animationRef.current = requestAnimationFrame(render);
  }, [isScanning, createParticle]);

  const drawLightBar = (ctx, w, h, lightBarX, lightBarWidth, state) => {
    const glowIntensity = state.currentGlowIntensity;

    // Vertical fade gradient
    const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
    verticalGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    verticalGradient.addColorStop(state.fadeZone / h, 'rgba(255, 255, 255, 1)');
    verticalGradient.addColorStop(1 - state.fadeZone / h, 'rgba(255, 255, 255, 1)');
    verticalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.globalCompositeOperation = 'lighter';

    // Core beam - coral accent
    const coreGradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth / 2, 0,
      lightBarX + lightBarWidth / 2, 0
    );
    coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    coreGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
    coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${1 * glowIntensity})`);
    coreGradient.addColorStop(0.7, `rgba(255, 255, 255, ${0.9 * glowIntensity})`);
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.globalAlpha = 1;
    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth / 2, 0, lightBarWidth, h, 15);
    ctx.fill();

    // Glow layer 1 - coral
    const glow1Gradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth * 2, 0,
      lightBarX + lightBarWidth * 2, 0
    );
    glow1Gradient.addColorStop(0, 'rgba(224, 123, 93, 0)');
    glow1Gradient.addColorStop(0.5, `rgba(224, 123, 93, ${0.8 * glowIntensity})`);
    glow1Gradient.addColorStop(1, 'rgba(224, 123, 93, 0)');

    ctx.globalAlpha = isScanning ? 1.0 : 0.8;
    ctx.fillStyle = glow1Gradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth * 2, 0, lightBarWidth * 4, h, 25);
    ctx.fill();

    // Glow layer 2
    const glow2Gradient = ctx.createLinearGradient(
      lightBarX - lightBarWidth * 4, 0,
      lightBarX + lightBarWidth * 4, 0
    );
    glow2Gradient.addColorStop(0, 'rgba(224, 123, 93, 0)');
    glow2Gradient.addColorStop(0.5, `rgba(224, 123, 93, ${0.4 * glowIntensity})`);
    glow2Gradient.addColorStop(1, 'rgba(224, 123, 93, 0)');

    ctx.globalAlpha = isScanning ? 0.8 : 0.6;
    ctx.fillStyle = glow2Gradient;
    ctx.beginPath();
    ctx.roundRect(lightBarX - lightBarWidth * 4, 0, lightBarWidth * 8, h, 35);
    ctx.fill();

    // Extra glow when scanning
    if (isScanning) {
      const glow3Gradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth * 8, 0,
        lightBarX + lightBarWidth * 8, 0
      );
      glow3Gradient.addColorStop(0, 'rgba(224, 123, 93, 0)');
      glow3Gradient.addColorStop(0.5, 'rgba(224, 123, 93, 0.2)');
      glow3Gradient.addColorStop(1, 'rgba(224, 123, 93, 0)');

      ctx.globalAlpha = 0.6;
      ctx.fillStyle = glow3Gradient;
      ctx.beginPath();
      ctx.roundRect(lightBarX - lightBarWidth * 8, 0, lightBarWidth * 16, h, 45);
      ctx.fill();
    }

    // Apply vertical fade mask
    ctx.globalCompositeOperation = 'destination-in';
    ctx.globalAlpha = 1;
    ctx.fillStyle = verticalGradient;
    ctx.fillRect(0, 0, w, h);
  };

  // Initialize
  useEffect(() => {
    createGradientCache();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = height;
      }
    };

    resizeCanvas();

    // Initialize particles
    const w = canvas.width;
    const h = canvas.height;
    const lightBarX = w / 2;
    const lightBarWidth = 3;

    for (let i = 0; i < 200; i++) {
      const particle = createParticle(w, h, lightBarX, lightBarWidth);
      particle.originalAlpha = particle.alpha;
      particlesRef.current.push(particle);
      stateRef.current.count++;
    }

    animationRef.current = requestAnimationFrame(render);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createGradientCache, createParticle, render, height]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none z-10"
      style={{ height: `${height}px` }}
    />
  );
}
