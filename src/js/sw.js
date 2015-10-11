/*global caches, self, fetch */
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('sync-subs-static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/css/style.css',
        '/js/app.js'
      ]);
    }).catch(function(error) {
      console.error(error);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
