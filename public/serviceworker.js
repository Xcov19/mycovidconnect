
// eslint-disable-next-line array-callback-return
const CACHE_NAME = "version-1";
const urlsToCache = [ 'index.html', 'offline.html' ];
const SELF = this;
// eslint-disable-next-line array-callback-return
SELF.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// eslint-disable-next-line array-callback-return
SELF.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request) 
                    .catch(() => caches.match('offline.html'))
            })
    );  
});

// eslint-disable-next-line array-callback-return
SELF.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    
    event.waitUntil(
        
         caches.keys().then((cacheNames) => Promise.all(
           
            // eslint-disable-next-line array-callback-return
            cacheNames.map((cacheName) => { 
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))           
        );
        
});



