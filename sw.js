const C="cot3d-v5";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{
  const r=e.request;
  // No interceptar llamadas a la nube (Firebase) ni peticiones que no sean GET del mismo sitio
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.match(r).then(x=>x||fetch(r).catch(()=>caches.match("./index.html"))));
});
