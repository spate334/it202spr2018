var dataCacheName = 'busTracker';
var cacheName = 'UICBusTracker';
var urlsToCache = [
  './',
  './imgs/bus.png',
  './imgs/favicon.ico',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', function(event){
	event.waitUntil(caches.open(cacheName).then(function(cache){
		console.log('Opened cache');
		return cache.addAll(urlsToCache);
	})
	);
});

self.addEventListener('fetch', function(event) {
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
		return;
	}
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {
				if (response) {
					return response;
				}
				return fetch(event.request);
			})
	);
});