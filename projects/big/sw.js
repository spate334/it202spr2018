var dataCacheName = 'busTracker';
var cacheName = 'uicBusTracker';
var filesToCache = [
  '.',
  'index.html',
  './imgs/favicon.ico',
  'uic.jpg'
  
];

var dataUrls = [

'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
'https://fonts.googleapis.com/icon?family=Material+Icons'
];


self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      
      return cache.addAll(filesToCache);
    })
  );
});

elf.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});