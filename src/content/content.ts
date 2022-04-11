import { getElementDim, getElementOffset, getVideoContainerSelector } from './videoPosition';

const { createCanvas, loadImage } = require('canvas');

console.log('Attaching content scripts');

// TODO remove these listeners
window.addEventListener('load', (event) => {
  initOverlayCanvas();
});

window.addEventListener('resize', (event) => {
  initOverlayCanvas();
});

window.addEventListener('scroll', (event) => {
  initOverlayCanvas();
});

const initOverlayCanvas = () => {
  // Remove already drawn canvas
  const existingCanvas = document.getElementById('subtitleCanvasId');

  if (existingCanvas) {
    existingCanvas.remove();
  }

// Get domain
  const url = window.location.href;

  const domain = new URL(url || '').hostname.replace('www.', '');

// Overlay canvas on video div TODO check whitelisted domain
  const videoContainsSelector = getVideoContainerSelector(domain);

  console.log(videoContainsSelector);

  if (videoContainsSelector == '') {
    console.log('Empty video container selector');
    return;
  }

  const videoContainer = document.querySelector(videoContainsSelector);

  console.log(videoContainer);

  if (!videoContainer) {
    console.log('Empty video container');
    return;
  }

  // Get video container attributes
  const offset = getElementOffset(videoContainer);
  const dim = getElementDim(videoContainer);

  console.log(offset);
  console.log(dim);

  //const canvasOverlay = document.createElement('canvas');
  const canvasOverlay = createCanvas(dim.width, dim.height, 'svg');

  canvasOverlay.style.pointerEvents = 'none';
  canvasOverlay.id = 'subtitleCanvasId';
  canvasOverlay.style.position = 'absolute';
  canvasOverlay.style.zIndex = '99';

  // Set canvas overlay attributes
  canvasOverlay.style.width = dim.width + 'px';
  canvasOverlay.style.height = dim.height + 'px';

  canvasOverlay.style.top = offset.top + 'px';
  canvasOverlay.style.left = offset.left + 'px';

  document.body.appendChild(canvasOverlay);
};

const initClickListeners = () => {

}

const drawText = (text: string) => {
  const canvasOverlay = document.getElementById('subtitleCanvasId');

  if (!canvasOverlay) {
    console.log('No canvas to draw on');
    return;
  }

  const canvasContext = canvasOverlay.getContext('2d');

  // Clear canvas
  canvasContext.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);

  // TODO change font based on OS
  canvasContext.font = '20px -apple-system';
  canvasContext.fillStyle = 'white';
  canvasContext.shadowColor = 'black';
  canvasContext.lineWidth = 5;
  canvasContext.shadowBlur = 2;

  const textWidth = canvasContext.measureText(text).width;

  canvasContext.fillText(text, (canvasOverlay.width / 2) - (textWidth / 2), canvasOverlay.height - 40);
};

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {

    console.log("Runtime message");
    console.log(request);
    console.log(sender);

    switch (request.command) {
      case 'draw_text':
        console.log("Received command to draw text: " + request.data);
        drawText(request.data);
        sendResponse(true);
        return true;

      case 'stopped_recording':
       //  chrome.runtime.reload();
        sendResponse(true);
        return true;

      default:
        console.log("Unknown client command: " + request.command);
        sendResponse(true);
        return true;
    }
  },
);

initOverlayCanvas();