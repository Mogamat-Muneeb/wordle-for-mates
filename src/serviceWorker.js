// serviceWorker.js

const CACHE_NAME = 'wordle-for-mates';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json', // If you have a manifest file
  // Add other assets or routes you want to cache
];

window.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


window.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Register the service worker
export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./serviceWorker.js') // Adjust the path based on your project structure
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  } else {
    console.warn('Service Worker is not supported in this browser.');
  }
}
