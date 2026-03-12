// Contact Vault — Service Worker
// Handles offline caching of the app shell

const CACHE_NAME = 'contact-vault-v5';

// App shell files to cache on install
const PRECACHE_URLS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Sora:wght@300;400;600;700&display=swap',
];

// ===== INSTALL: cache app shell =====
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS).catch(err => {
        console.log('SW: some resources failed to cache', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ===== ACTIVATE: clean old caches =====
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ===== FETCH: network-first for Firebase, cache-first for app shell =====
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Firebase API requests — network only (don't cache, sensitive data)
  if (
    url.includes('firestore.googleapis.com') ||
    url.includes('firebase') ||
    url.includes('googleapis.com')
  ) {
    event.respondWith(fetch(event.request).catch(() => {
      // Firebase failed — offline, return nothing (app handles it via localStorage cache)
      return new Response(JSON.stringify({error:'offline'}), {
        headers:{'Content-Type':'application/json'}
      });
    }));
    return;
  }

  // Google Fonts — cache first
  if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        }).catch(() => cached || new Response(''));
      })
    );
    return;
  }

  // App shell (index.html and local files) — network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Update cache with fresh version
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline — serve from cache
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Fallback: serve index.html for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// ===== MESSAGE: force update =====
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
