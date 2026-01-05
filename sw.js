const CACHE_NAME = 'salinas-edu-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  // Se tiver imagens, adicione aqui: './icon-192.png'
];

// 1. Instalação: Guarda os arquivos no Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Ativação: Limpa caches antigos se mudarmos a versão
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// 3. Interceptação (Fetch): Serve o conteúdo offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Retorna do cache se existir, senão busca na rede
      return cachedResponse || fetch(e.request);
    })
  );
});