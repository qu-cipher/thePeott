<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { RadialEngine } from '../engine/RadialEngine';
import { useEngineRenderer } from '../engine/useEngineRenderer';

const containerRef = ref(null);
const canvasRef = ref(null);

const texturePack = {
  'cylinder-body': '',
  'cylinder-fins': '',
  'piston-body': '',
  'hub-body': '',
  'connecting-rod': '' // not working
};

const colors = { 
  cylinder: {
    body: {
      gradient: ['#555555', '#666666', '#444444'],
      rim: '#777777',
      texture: 'cylinder-body'
    },
    fins: {
      color: '#353535',
      border: '#444444',
      texture: 'cylinder-fins'
    }
  },
  piston: {
    body: {
      gradient: ['#808080', '#909090', '#707070'],
      rim: '#A0A0A0',
      texture: 'piston-body'
    },
    details: {
      gradient: ['#707070', '#606060'],
      bolt: '#505050',
      boltBorder: '#606060'
    }
  },
  connectingRod: {
    gradient: ['#909090', '#707070', '#909090'],
    highlight: '#A0A0A0',
    texture: 'connecting-rod'
  },
  hub: {
    body: {
      gradient: ['#707070', '#505050'],
      border: '#808080',
      texture: 'hub-body'
    },
    inner: {
      gradient: ['#606060', '#404040'] 
    },
    shaft: {
      fill: '#303030', 
      border: '#404040'
    },
    marker: {
      gradient: ['#808080', '#606060']
    }
  }
};


onMounted(() => {
  const engine = new RadialEngine({
    cylinderCount: 4,
    radius: 110,
    rpm: 30,
    theme: colors,
    texturePack: texturePack
  });

  const { startRenderer, stopRenderer } = useEngineRenderer({
    canvas: canvasRef.value,
    engine,
    container: containerRef.value
  });

  startRenderer();

  onBeforeUnmount(() => {
    stopRenderer();
  });
});
</script>

<template>
  <div class="engine" ref="containerRef">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.engine {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.engine__canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>