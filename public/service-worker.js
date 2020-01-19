importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

if (workbox) {
    console.log("Berhasil");
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: 1 },
        { url: './index.html', revision: 1 },
        { url: './nav.html', revision: 1 },
        { url: './manifest.json', revision: 1 },

        { url: './pages/favorite-teams.html', revision: 1 },
        { url: './pages/standings.html', revision: 1 },
        { url: './pages/teams.html', revision: 1 },

        { url: './css/materialize.min.css', revision: 1 },
        { url: './css/tambahan.css', revision: 1 },

        { url: './js/model/api_service.js', revision: 1 },
        { url: './js/model/idb.js', revision: 1 },
        { url: './js/model/local_service.js', revision: 1 },

        { url: './js/config/init.js', revision: 1 },
        { url: './js/config/route.js', revision: 1 },

        { url: './js/system/materialize.min.js', revision: 1 },
        { url: './js/system/pwa_system.js', revision: 1 },

        { url: './js/view/data_page.js', revision: 1 },

        { url: './image/icon/i_top.png', revision: 1 },
        { url: './image/icon/i_72.png', revision: 1 },
        { url: './image/icon/i_96.png', revision: 1 },
        { url: './image/icon/i_120.png', revision: 1 },
        { url: './image/icon/i_128.png', revision: 1 },
        { url: './image/icon/i_144.png', revision: 1 },
        { url: './image/icon/i_152.png', revision: 1 },
        { url: './image/icon/i_180.png', revision: 1 },
        { url: './image/icon/i_192.png', revision: 1 },
        { url: './image/icon/i_384.png', revision: 1 },
        { url: './image/icon/i_512.png', revision: 1 }
    ]);

    workbox.routing.registerRoute(
        new RegExp("/pages/"),
        workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:css)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        /\.(?:js)$/,
        workbox.strategies.cacheFirst()
    );

    workbox.routing.registerRoute(
        new RegExp("https://api.football-data.org/v2/"),
        new workbox.strategies.NetworkFirst({
            cacheName: "url-api",
            plugin: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [200],
                }),
                new workbox.expiration.Plugin({
                    maxEtries: 100,
                    maxAgeSeconds: 3 * 24 * 60 * 60
                }),
            ],
        }),
    );
} else {
    console.log("Gagal");
}

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'image/icon/i_top.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});