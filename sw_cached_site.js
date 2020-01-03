// SW Installed -> Caching files -> SW Activated ->
// Register SW | Failed (inside index.js)

// SW Fetching -> Navigated to website -> SW Fetching ->
// -> SW registered -> SW installed -> SW caching files

const cacheName = 'v2';

// Call install event
self.addEventListener('install', e => {
  console.log('::: service worker: installed');
});

// Call activate event
self.addEventListener('activate', e => {
  console.log('::: service worker: activated');
  // remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('::: service worker: cleaning old cache');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('::: service worker: fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // make copy/clone of response
        const resClone = res.clone();
        // Open cache
        caches
          .open(cacheName)
          .then(cache => {
            // Add response to the cache
            if (e.request.url.indexOf('http') === 0) {
              cache.put(e.request, resClone);
            }
          });
        return res;
      }).catch(err => caches.match(e.request).then(res => res))
  );
})
