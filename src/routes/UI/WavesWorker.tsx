// File: src/workers/animation.worker.js
import { createNoise3D } from 'simplex-noise';

// Stato globale del worker
let width = 0;
let height = 0;
let imageData = null;
let ctx = null;
let offscreenCanvas = null;
let noise3D = null;
let startTime = null;
let currentTime = 0;
let grad = null;

// Costanti
const ZERO = 0;
const THIRD = 1/3;
const TWO_THIRDS = 2/3;
const ONE = 1;
const TAU = Math.PI * 2;

// Opzioni di configurazione
const canvasOptions = {
  autoClear: true,
  autoCompensate: false,
  autoPushPop: true,
  canvas: true,
  centered: true,
  fps: 60 // Aumentato da 30 a 60 FPS
};

// Helper functions
const map = (value, start1, stop1, start2, stop2) => 
  start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));

const hsl = (h, s, l, a = 1) => 
  `hsla(${h}, ${s}%, ${l}%, ${a})`;

const floor = Math.floor;
const cos = Math.cos;

// Inizializza l'ambiente di disegno
function init(canvasWidth, canvasHeight) {
  width = canvasWidth;
  height = canvasHeight;
  
  // Crea un canvas offscreen
  offscreenCanvas = new OffscreenCanvas(width, height);
  ctx = offscreenCanvas.getContext('2d', { alpha: false });
  
  // Inizializza la funzione di rumore
  noise3D = createNoise3D();
  
  // Prepara l'imageData per il trasferimento
  imageData = ctx.createImageData(width, height);
  
  // Imposta il centro se necessario
  if (canvasOptions.centered) {
    ctx.translate(width / 2, height / 2);
  }
  
  // Imposta il tempo iniziale
  startTime = performance.now();
}

// Disegna un frame
function draw() {
  const width_half = width / 2;
  const height_half = height / 2;
  const e = performance.now() - startTime;
  
  if (canvasOptions.autoClear) {
    ctx.clearRect(-width_half, -height_half, width, height);
  }
  
  if (canvasOptions.autoPushPop) {
    ctx.save();
  }
  
  // Parametri per l'animazione
  const xCount = 30; // Aumentato da 25
  const yCount = 45; // Aumentato da 40
  const iXCount = 1 / (xCount - 1);
  const iYCount = 1 / (yCount - 1);
  const time = e * 0.0001;
  const timeStep = 0.01;
  
  // Creazione del gradiente per ogni frame 
  // (Questo è importante perché il gradiente dipende dal tempo)
  grad = ctx.createLinearGradient(-width, 0, width, height);
  
  const t = time % 1;
  const tSide = floor(time % 2) === 0;
  const hueA = tSide ? 340 : 210;
  const hueB = !tSide ? 340 : 210;
  const colorA = hsl(hueA, 0, 0);
  const colorB = hsl(hueB, 0, 0);
  
  grad.addColorStop(map(t, 0, 1, THIRD, ZERO), colorA);
  grad.addColorStop(map(t, 0, 1, TWO_THIRDS, THIRD), colorB);
  grad.addColorStop(map(t, 0, 1, ONE, TWO_THIRDS), colorA);
  
  ctx.globalAlpha = map(cos(time), -1, 1, 0.15, 0.3);
  
  // Sfondo
  ctx.fillStyle = grad;
  ctx.fillRect(-width_half, -height_half, width, height);
  
  ctx.globalAlpha = 1;
  ctx.beginPath();
  
  // Disegno delle linee
  let localTime = time;
  for(let j = 0; j < yCount; j++) {
    let tj = j * iYCount;
    let c = cos(tj * TAU + time) * 0.1;
    
    for(let i = 0; i < xCount; i++) {
      let t = i * iXCount;
      let n = noise3D(t, localTime, c);
      let y = n * height_half;
      let x = t * (width + 20) - width_half - 10;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    localTime += timeStep;
  }
  
  ctx.globalCompositeOperation = 'lighter';
  ctx.filter = 'blur(1px)';
  ctx.strokeStyle = grad;
  ctx.lineWidth = 5;
  ctx.stroke();
  
  ctx.filter = 'blur(1px)';
  ctx.strokeStyle = hsl(0, 0, 100, 0.8);
  ctx.lineWidth = 2;
  ctx.stroke();
  
  if (canvasOptions.autoPushPop) {
    ctx.restore();
  }
  
  // Ottieni l'imageData aggiornata
  imageData = ctx.getImageData(0, 0, width, height);
  
  // Trasferisci il frame al thread principale
  self.postMessage({
    type: 'frameReady',
    data: imageData
  }, [imageData.data.buffer]);
}

// Gestisci i messaggi dal thread principale
self.onmessage = (event) => {
  const { type, width: w, height: h } = event.data;
  
  switch (type) {
    case 'init':
      init(w, h);
      break;
      
    case 'resize':
      init(w, h); // Reinizializza con le nuove dimensioni
      break;
      
    case 'renderFrame':
      // Esegui il rendering del frame
      draw();
      break;
  }
};