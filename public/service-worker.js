
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/static/js/bundle.js',
  '/static/js/1.chunk.js',
  '/static/css/main.chunk.css',
  // Add other resources you want to cache
];

// Install event - caching essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching essential resources');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - cache API responses
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('jsonplaceholder.typicode.com')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Return cached response if available
        }

        return fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone()); // Cache the network response
          });
          return networkResponse;
        }).catch((error) => {
          console.error('Network error:', error);
        });
      })
    );
  } else {
    // Handle other requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Remove outdated caches
          }
        })
      );
    })
  );
});
