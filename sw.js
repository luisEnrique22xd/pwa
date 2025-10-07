// Basic structure of a service worker file (sw.js)
// 1. Name the cache and files to cache 
const CACHE_NAME = ' mi-site-cache-v1';
const urlsToCache = [
    "index.html",
    "offline.html"
];

//2. Install -> ejectuted when the service worker is intalled
self.addEventListener("install", event =>{
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache=>{
            cache.addAll(urlsToCache)
        })
    )
})
//3. Activate -> ejecuted the service worker is activated(clean old caches)
self.addEventListener("activate", event=>{
    event.waitUntil(
        caches.keys().then(keys=>{
            Promise.all(
                keys.filter(key=>key !== CACHE_NAME).map(key =>caches.delete(key))
            )
        })
    )
})