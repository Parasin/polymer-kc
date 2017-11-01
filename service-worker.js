self.addEventListener( 'install', function ( e ) {
  e.waitUntil(
      caches.open( 'Knowledge Catalog' ).then( function ( cache ) {
        return cache.addAll( [
          'manifest.json',
          '/index.html',
          '/index.html?homescreen=1',
          '/?homescreen=1',
        ] );
      } )
  );
} );

self.addEventListener( 'fetch', function ( event ) {
  event.respondWith(
      caches.match( event.request ).then( function ( response ) {
        return response || fetch( event.request );
      } )
  );
} );
