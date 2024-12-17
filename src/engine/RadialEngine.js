import { EngineTheme } from './EngineTheme';
import { EngineTextures } from './EngineTextures';

export class RadialEngine {
  constructor({ cylinderCount = 4, radius = 120, rpm = 60, theme = {}, texturePack = null } = {}) {
    this.cylinderCount = cylinderCount;
    this.radius = radius;
    this.rpm = rpm;
    this.rotation = 0;
    this.theme = new EngineTheme(theme);
    this.textures = new EngineTextures();
    this.pistons = Array(cylinderCount).fill(null).map((_, i) => ({
      angle: (i * 2 * Math.PI) / cylinderCount,
      offset: 0
    }));

    if (texturePack) {
      this.loadTexturePack(texturePack).catch(error => {
        console.warn('Texture pack loading failed, falling back to default theme:', error);
      });
    }
  }

  async loadTexturePack(texturePack) {
    const textureLoadPromises = [];
    
    for (const [key, url] of Object.entries(texturePack)) {
      textureLoadPromises.push(
        this.textures.loadTexture(key, url).catch(error => {
          console.warn(`Failed to load texture ${key}:`, error);
          return null;
        })
      );
    }

    await Promise.all(textureLoadPromises);
  }

  createPattern(ctx, texture, width, height) {
    if (!texture) return null;
    
    const pattern = ctx.createPattern(texture, 'repeat');
    if (pattern) {
      const matrix = new DOMMatrix();
      matrix.scaleSelf(width / texture.width, height / texture.height);
      pattern.setTransform(matrix);
    }
    return pattern;
  }

  update(deltaTime) {
    const rotationSpeed = (this.rpm * 2 * Math.PI) / (60 * 1000);
    this.rotation += deltaTime * rotationSpeed;

    this.pistons.forEach(piston => {
      piston.offset = Math.sin(this.rotation + piston.angle) * 20;
    });
  }

  draw(ctx, width, height) {
    ctx.save();
    ctx.translate(width / 2, height / 2);
    
    // Draw cylinders first (background layer)
    this.pistons.forEach((piston) => {
      const x = Math.cos(piston.angle) * this.radius;
      const y = Math.sin(piston.angle) * this.radius;
  
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(piston.angle);
      this.drawCylinder(ctx);
      ctx.restore();
    });
  
    // Draw connecting rods (middle layer)
    this.pistons.forEach((piston) => {
      const pistonX = Math.cos(piston.angle) * (this.radius + piston.offset);
      const pistonY = Math.sin(piston.angle) * (this.radius + piston.offset);
      this.drawConnectingRod(ctx, 0, 0, pistonX, pistonY);
    });

    // Draw pistons (top layer)
    this.pistons.forEach((piston) => {
      const pistonX = Math.cos(piston.angle) * (this.radius + piston.offset);
      const pistonY = Math.sin(piston.angle) * (this.radius + piston.offset);
      ctx.save();
      ctx.translate(pistonX, pistonY);
      ctx.rotate(piston.angle);
      this.drawPiston(ctx);
      ctx.restore();
    });

    // Draw central hub (foreground)
    this.drawHub(ctx);
    ctx.restore();
  }

  createMetallicGradient(ctx, x, y, radius, color1, color2) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  }

  drawCylinder(ctx) {
    const theme = this.theme.getTheme().cylinder;
    
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;

    // Main cylinder body
    ctx.beginPath();
    ctx.rect(-15, -30, 54, 60);

    // Try texture first
    let fillStyle = null;
    if (theme.body.texture) {
      const texture = this.textures.getTexture('cylinder-body');
      if (texture && !this.textures.hasError('cylinder-body')) {
        fillStyle = this.createPattern(ctx, texture, 54, 60);
      }
    }

    // Fallback to gradient if no texture or texture loading failed
    if (!fillStyle) {
      const cylinderGradient = ctx.createLinearGradient(-15, -30, 39, 30);
      theme.body.gradient.forEach((color, index) => {
        cylinderGradient.addColorStop(index / (theme.body.gradient.length - 1), color);
      });
      fillStyle = cylinderGradient;
    }

    ctx.fillStyle = fillStyle;
    ctx.fill();
    
    // Cylinder rim highlight
    ctx.strokeStyle = theme.body.rim;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Cooling fins
    ctx.shadowColor = 'transparent';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.rect(-12 - (i * 28), -25, 25, 50);

      // Try fin texture
      fillStyle = null;
      if (theme.fins.texture) {
        const texture = this.textures.getTexture('cylinder-fins');
        if (texture && !this.textures.hasError('cylinder-fins')) {
          fillStyle = this.createPattern(ctx, texture, 25, 50);
        }
      }

      // Fallback to color if no texture or texture loading failed
      if (!fillStyle) {
        fillStyle = `${theme.fins.color}${Math.round((1 - i * 0.15) * 255).toString(16).padStart(2, '0')}`;
      }

      ctx.fillStyle = fillStyle;
      ctx.fill();
      ctx.strokeStyle = theme.fins.border;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    ctx.restore();
  }

  drawPiston(ctx) {
    const theme = this.theme.getTheme().piston;
    
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    const pistonWidth = 24;
    const pistonHeight = 32;
    const cornerRadius = 4;

    // Main piston body
    let fillStyle = null;
    if (theme.body.texture) {
      const texture = this.textures.getTexture('piston-body');
      if (texture && !this.textures.hasError('piston-body')) {
        fillStyle = this.createPattern(ctx, texture, pistonWidth, pistonHeight);
      }
    }

    if (!fillStyle) {
      fillStyle = ctx.createLinearGradient(
        -pistonWidth/2, -pistonHeight/2,
        pistonWidth/2, pistonHeight/2
      );
      theme.body.gradient.forEach((color, index) => {
        fillStyle.addColorStop(index / (theme.body.gradient.length - 1), color);
      });
    }

    // Rounded rectangle for piston body
    ctx.beginPath();
    ctx.moveTo(-pistonWidth/2 + cornerRadius, -pistonHeight/2);
    ctx.lineTo(pistonWidth/2 - cornerRadius, -pistonHeight/2);
    ctx.arcTo(pistonWidth/2, -pistonHeight/2, pistonWidth/2, -pistonHeight/2 + cornerRadius, cornerRadius);
    ctx.lineTo(pistonWidth/2, pistonHeight/2 - cornerRadius);
    ctx.arcTo(pistonWidth/2, pistonHeight/2, pistonWidth/2 - cornerRadius, pistonHeight/2, cornerRadius);
    ctx.lineTo(-pistonWidth/2 + cornerRadius, pistonHeight/2);
    ctx.arcTo(-pistonWidth/2, pistonHeight/2, -pistonWidth/2, pistonHeight/2 - cornerRadius, cornerRadius);
    ctx.lineTo(-pistonWidth/2, -pistonHeight/2 + cornerRadius);
    ctx.arcTo(-pistonWidth/2, -pistonHeight/2, -pistonWidth/2 + cornerRadius, -pistonHeight/2, cornerRadius);
    ctx.closePath();

    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = theme.body.rim;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawConnectingRod(ctx, x1, y1, x2, y2) {
    const theme = this.theme.getTheme().connectingRod;
    
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Main rod
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    
    let strokeStyle = null;
    if (theme.texture) {
      const texture = this.textures.getTexture('connecting-rod');
      if (texture && !this.textures.hasError('connecting-rod')) {
        strokeStyle = this.createPattern(ctx, texture, Math.abs(x2 - x1), Math.abs(y2 - y1));
      }
    }

    if (!strokeStyle) {
      strokeStyle = ctx.createLinearGradient(x1, y1, x2, y2);
      theme.gradient.forEach((color, index) => {
        strokeStyle.addColorStop(index / (theme.gradient.length - 1), color);
      });
    }
    
    ctx.strokeStyle = strokeStyle;
    ctx.lineCap = 'round';
    ctx.lineWidth = 6;
    ctx.stroke();

    // Rod highlight
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = theme.highlight;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawHub(ctx) {
    const theme = this.theme.getTheme().hub;
    
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    // Main hub body
    let fillStyle = null;
    if (theme.body.texture) {
      const texture = this.textures.getTexture('hub-body');
      if (texture && !this.textures.hasError('hub-body')) {
        fillStyle = this.createPattern(ctx, texture, 60, 60);
      }
    }

    if (!fillStyle) {
      fillStyle = this.createMetallicGradient(ctx, 0, 0, 30, theme.body.gradient[0], theme.body.gradient[1]);
    }

    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fillStyle = fillStyle;
    ctx.fill();
    ctx.strokeStyle = theme.body.border;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner hub
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    const innerGradient = this.createMetallicGradient(ctx, 0, 0, 20, theme.inner.gradient[0], theme.inner.gradient[1]);
    ctx.fillStyle = innerGradient;
    ctx.fill();

    // Center shaft
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = theme.shaft.fill;
    ctx.fill();
    ctx.strokeStyle = theme.shaft.border;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rotation indicator
    ctx.save();
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -25);
    const markerGradient = ctx.createLinearGradient(0, 0, 0, -25);
    theme.marker.gradient.forEach((color, index) => {
      markerGradient.addColorStop(index / (theme.marker.gradient.length - 1), color);
    });
    ctx.strokeStyle = markerGradient;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  setTheme(newTheme) {
    this.theme.setTheme(newTheme);
  }

  resetTheme() {
    this.theme.resetTheme();
  }

  async setTexturePack(texturePack) {
    this.textures.clear();
    if (texturePack) {
      await this.loadTexturePack(texturePack);
    }
  }
}