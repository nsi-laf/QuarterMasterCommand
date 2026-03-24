self.addEventListener('install', (e) => {
    e.waitUntil(
      caches.open('qm-store').then((cache) => cache.addAll([
        './index.html',
        './styles.css',
        './config.js',
        './engine.js',
        './app.js'
      ]))
    );
});
  
self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});