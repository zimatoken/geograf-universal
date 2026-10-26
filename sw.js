var CACHE = 'geograf-v2.4-pwa'; // Обязательно подними версию, иначе телефон не увидит обновлений!
var FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './css/flags.css',                // Добавили стили флагов
  './core/registry.js',
  './core/store.js',
  './core/theme.js',
  './data/countries.json',
  './data/loader.js',
  './data/facts.js',                // Добавили факты дня
  './data/achievements_extended.js',// Добавили достижения
  './data/quiz_data_extended.js',   // Добавили данные для квизов
  './modules/encyclopedia/index.html', // Добавили основные страницы
  './modules/quiz/index.html',
  './modules/quiz/extended.html',
  './modules/map/index.html',
  './modules/journal/index.html',
  './modules/settings/index.html'
  // SVG-флаги кэшируются автоматически при первом открытии (благодаря твоему fetch-обработчику)
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FILES).catch(function (err) {
        console.warn('[SW] Cache addAll:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (response) {
      var clone = response.clone();
      caches.open(CACHE).then(function (cache) {
        cache.put(e.request, clone).catch(function(){});
      });
      return response;
    }).catch(function () {
      return caches.match(e.request);
    })
  );
});
