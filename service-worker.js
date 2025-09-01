
const CACHE_NAME = 'allin-timer-v3';
const ASSETS = [
const CACHE_NAME = 'allin-timer-v4'; // aumenta la versione per forzare l’update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
self.addEventListener('install', (evt) => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
});
self.addEventListener('fetch', (evt) => {
  const req = evt.request;
  evt.respondWith(
    caches.match(req).then(cached => cached || fetch(req)).catch(() => caches.match('./index.html'))
  );
});
