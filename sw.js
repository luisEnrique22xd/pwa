// Estructura basica de un Service Worker

// 1.Nombre del cache y archivos a cachear
const CACHE_NAME = "mi-cahce-v1";
const urlsToCache = [
  "index.html", 
  "offline.html"];

// 2.INSTALL -> se ejecuta al instalar el SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// 3.ACTIVATE -> se ejecuta al activarse (Limpia cache viejas)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});
// 4.FETCH -> se ejecuta cada vez que se haga una petición al servidor
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});
  
  
//5. Push -> se ejecuta cuando se recibe una notificación push
self.addEventListener("push", (event) => {
    const data = event.data ? event.data.text() : "Notificacion sin texto";
    event.waitUntil(
        self.registration.showNotification("Mi pwa", {body:data})
    );
});