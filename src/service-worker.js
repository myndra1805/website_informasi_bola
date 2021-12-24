import {precacheAndRoute} from "workbox-precaching"
import {registerRoute} from "workbox-routing"
import {StaleWhileRevalidate} from "workbox-strategies" 

precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/]
})

registerRoute(
    new RegExp("/pages/"),
    new StaleWhileRevalidate({
        cacheName: "pages"
    })
)

registerRoute(
    ({request}) => request.destination === "image",
    new StaleWhileRevalidate({
        cacheName: "image"
    })
)

registerRoute(
    ({request}) => request.destination === "script",
    new StaleWhileRevalidate({
        cacheName: "js"
    })
)

registerRoute(
    ({url}) => url.origin === "https://api.football-data.org",
    new StaleWhileRevalidate({
        cacheName: "api"
    })
)

self.addEventListener("push", event => {
    const title = "PWA Info Bola Premier League"
    const options = {
        body: "Push message no payload",
        icon: "gambar/icon/icon.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }
    event.waitUntil(self.registration.showNotification(title, options))
})