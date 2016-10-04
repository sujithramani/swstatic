this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/swstatic/',
        '/swstatic/index.html',
        '/swstatic/style.css',
        '/swstatic/app.js',
        '/swstatic/image-list.js',
        '/swstatic/star-wars-logo.jpg',
        '/swstatic/gallery/bountyHunters.jpg',
        '/swstatic/gallery/myLittleVader1.jpg',
        '/swstatic/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/swstatic/gallery/myLittleVader.jpg');
  }));
});
