<template>
  <div class="flip-digit">
    <!-- metà superiore mostra sempre il numero "attuale" -->
    <div class="upper">{{ next }}</div>

    <!-- metà inferiore mostra il numero corrente (finché non termina il flip) -->
    <div class="lower">{{ current }}</div>

    <!-- parte animata -->
    <div v-if="isFlipping" class="flip" @animationend="finishFlip">
      <!-- parte superiore in discesa mostra il numero corrente -->
      <div class="flip-upper">{{ current }}</div>
      <!-- parte inferiore in salita mostra il numero nuovo -->
      <div class="flip-lower">{{ next }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"

const props = defineProps({
  value: { type: Number, required: true }
})

const current = ref(props.value) // numero "stabile"
const next = ref(props.value)    // numero in arrivo
const isFlipping = ref(false)

watch(() => props.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    next.value = newVal
    isFlipping.value = true
  }
})

const finishFlip = () => {
  current.value = next.value
  isFlipping.value = false
}
</script>

<style scoped>
.flip-digit {
  position: relative;
  width: 64px;
  height: 80px;
  font-family: monospace;
  font-weight: bold;
  font-size: 4.5rem;
  color: #f44;
  background: #333;
  border-radius: 6px;
  overflow: hidden;
  display: inline-block;
  margin: 0 2px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
}

/* metà statiche */
.upper, .lower {
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  text-align: center;
  background: #333;
  color: #f44;
  overflow: hidden;
}

.upper {
  top: 0;
  line-height: 80px;
  z-index: 1;
}

.lower {
  bottom: 0;
  line-height: 0;
  z-index: 1;
}

/* blocco animato */
.flip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: flipAnim 0.6s forwards;
  z-index: 2;
}

.flip-upper, .flip-lower {
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  text-align: center;
  background: #333;
  color: #f44;
  backface-visibility: hidden;
  overflow: hidden;
}

.flip-upper {
  top: 0;
  line-height: 80px;
  transform-origin: bottom;
}

.flip-lower {
  bottom: 0;
  line-height: 0;
  transform-origin: top;
  transform: rotateX(180deg);
}

/* linea centrale di divisione */
.flip-digit::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 1px 2px rgba(0,0,0,0.8);
  transform: translateY(-50%);
  z-index: 3;
}

/* Animazione */
@keyframes flipAnim {
  0%   { transform: rotateX(0); }
  100% { transform: rotateX(-180deg); }
}
</style>