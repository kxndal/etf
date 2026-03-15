const CACHE = 'vwce-v2';

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Pass through all non-same-origin requests (API/proxy)
  if (!e.request.url.startsWith(self.location.origin)) return;
  // Always fetch HTML fresh from network — never serve cached
  if (e.request.destination === 'document') return;
  // Everything else: pass through without caching
});
