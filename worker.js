var cache_version = 'v1';
var cache_static = 's-confucius.id-' + cache_version;
var cache_request = [
  'index.html',
  'index.js',
  'index.css',  
  'polyfill.js',
  '/assets/jquery/jquery.min.js',
  '/assets/vuejs/vue.js',
  '/assets/bootstrap/js/bootstrap.min.js',
  '/assets/babel/babel.min.js',
  '/assets/jsstore/dist/jsstore.min.js',
  '/assets/jsstore/dist/jsstore.worker.min.js',
  '/services/connection.js',
  '/services/team/Team.js',
  '/services/battle/Battle.js',
  '/services/battle/BattleTeam.js',
  '/services/battle/BattleHistory.js',
  '/assets/image/favicon.png',
  '/assets/image/logo.png',
];

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(cache_static).then(function(cache) {
      return cache.addAll(cache_request);
    }).catch(function(error) {
      console.log(error);
    })
   );
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  console.log('Fetching:', event.request.url);
});