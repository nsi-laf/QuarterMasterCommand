const CACHE_NAME = 'qm-store-v8.0';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './js/lang.js',
    './js/data.js',
    './js/state.js',
    './js/ui.js',
    './js/theme.js',
    './js/engine.js',
    './js/market_bank.js',
    './js/pipeline.js',
    './js/discord.js',
    './js/app.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
    self.skipWaiting();
});
  
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) return caches.delete(cacheName);
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            const fetchPromise = fetch(e.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(e.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => { /* offline fallback */ });
            return cachedResponse || fetchPromise;
        })
    );
});