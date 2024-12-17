export class EngineTheme {
  constructor(options = {}) {
    // Default theme
    this.default = {
      cylinder: {
        body: {
          gradient: ['#555555', '#666666', '#444444'],
          rim: '#777777',
          texture: null
        },
        fins: {
          color: '#353535',
          border: '#444444',
          texture: null
        }
      },
      piston: {
        body: {
          gradient: ['#808080', '#909090', '#707070'],
          rim: '#A0A0A0',
          texture: null
        },
        details: {
          gradient: ['#707070', '#606060'],
          border: '#808080',
          texture: null
        },
        bolts: {
          fill: '#505050',
          border: '#606060',
          texture: null
        }
      },
      connectingRod: {
        gradient: ['#909090', '#707070', '#909090'],
        highlight: '#A0A0A0',
        texture: null
      },
      hub: {
        body: {
          gradient: ['#707070', '#505050'],
          border: '#808080',
          texture: null
        },
        inner: {
          gradient: ['#606060', '#404040'],
          texture: null
        },
        shaft: {
          fill: '#303030',
          border: '#404040',
          texture: null
        },
        marker: {
          gradient: ['#808080', '#606060'],
          texture: null
        }
      }
    };

    // Merge custom options with defaults
    this.current = this.mergeThemes(this.default, options);
  }

  mergeThemes(defaultTheme, customTheme) {
    const merged = { ...defaultTheme };
    
    for (const key in customTheme) {
      if (typeof customTheme[key] === 'object' && !Array.isArray(customTheme[key])) {
        merged[key] = this.mergeThemes(defaultTheme[key], customTheme[key]);
      } else {
        merged[key] = customTheme[key];
      }
    }
    
    return merged;
  }

  getTheme() {
    return this.current;
  }

  setTheme(newTheme) {
    this.current = this.mergeThemes(this.default, newTheme);
  }

  resetTheme() {
    this.current = { ...this.default };
  }
}