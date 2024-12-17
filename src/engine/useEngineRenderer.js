export function useEngineRenderer({ canvas, engine, container }) {
  let animationFrameId = null;
  let lastTime = 0;

  function resizeCanvas() {
    if (!container || !canvas) return;
    
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }

  function render(currentTime) {
    if (!canvas) return;
    
    if (!lastTime) lastTime = currentTime;
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw engine
    engine.update(deltaTime);
    engine.draw(ctx, width, height);

    animationFrameId = requestAnimationFrame(render);
  }

  function startRenderer() {
    if (!canvas || !container) return;
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(render);
  }

  function stopRenderer() {
    window.removeEventListener('resize', resizeCanvas);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  return {
    startRenderer,
    stopRenderer
  };
}