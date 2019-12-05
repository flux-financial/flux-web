// cache version
var CACHE = 'cache-0.1.1';
var CACHE_urls = [
	'./',
	'/favicon.ico',
	'/stylesheets/main.css',
	'/images/Logo-White.svg'
];
// name for our app
var RUNTIME = 'flux-node';

// Install handler does the initial caching of assets. It runs
// the first time you visit and should persist.
self.addEventListener('install', event => {
	// wait for caches
	event.waitUntil(
		// edit cache
		caches.open(CACHE)
			// async: when opening happens, add items into cache
			.then(cache => cache.addAll(CACHE_urls))
			// async: wait for previous
			.then(self.skipWaiting())
	);
});

// Activation attempts to clean up the old cache content
self.addEventListener('activate', event => {
	const currentCaches = [CACHE, RUNTIME];

	event.waitUntil(
		caches.keys()
			// on fulfilment of caches.keys()
			.then(cacheNames => {
				return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
			})
			// on fulfilment of return cacheNames
			.then(cachesToDelete => {
				// ask browser to delete caches
				// Promise lets this happen in the background
				return Promise.all(cachesToDelete.map(cacheToDelete => {
					return caches.delete(cacheToDelete);
				}));
			})
			.then(() => self.clients.claim())
	);
});

/**
 * Handles responses by serving cache items.
 * 
 * If serving fails, then it skips serving from the cache.
 * 
 * After response has been made (cached or not), the handler 
 * gets updated assets from the server and caches them. The
 * new content is loaded next time the site is opened.
 */
self.addEventListener('fetch', event => {
	// Skip external sites: likely have a service worker already
	if (event.request.url.startsWith(self.location.origin)) {
		// respond to event
		event.respondWith(
			// matched requested items to cache entries
			caches.match(event.request).then(cachedResponse => {
				// serve cached items if they exist
				if (cachedResponse) {
					return cachedResponse;
				} // else, continue to request new items

				// fulfils the network request
				return caches.open(RUNTIME).then(cache => {
					return fetch(event.request).then(response => {
						// caches the response from the server
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});