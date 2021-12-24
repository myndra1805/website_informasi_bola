!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(0);const s=[],r={get:()=>s,add(e){s.push(...e)}};n(1);const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},c=e=>[a.prefix,e,a.suffix].filter(e=>e&&e.length>0).join("-"),o=e=>e||c(a.precache),i=e=>e||c(a.runtime),h=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),l=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class u extends Error{constructor(e,t){super(l(e,t)),this.name=e,this.details=t}}const f=new Set;const d=(e,t)=>e.filter(e=>t in e),p=async({request:e,mode:t,plugins:n=[]})=>{const s=d(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},g=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const a=await self.caches.open(e),c=await p({plugins:r,request:t,mode:"read"});let o=await a.match(c,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:o,request:c})}return o},w=async({cacheName:e,request:t,response:n,event:s,plugins:r=[],matchOptions:a})=>{const c=await p({plugins:r,request:t,mode:"write"});if(!n)throw new u("cache-put-with-no-response",{url:h(c.url)});const o=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,a=!1;for(const t of s)if("cacheWillUpdate"in t){a=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:s,plugins:r,response:n,request:c});if(!o)return void 0;const i=await self.caches.open(e),l=d(r,"cacheDidUpdate"),w=l.length>0?await g({cacheName:e,matchOptions:a,request:c}):null;try{await i.put(c,o)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of f)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:o,request:c})},y=g,m=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=d(s,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new u("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:c,response:r}));return r}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:a.clone(),request:c.clone()});throw e}};let _;async function v(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,a=function(){if(void 0===_){const e=new Response("");if("body"in e)try{new Response(e.body),_=!0}catch(e){_=!1}_=!1}return _}()?n.body:await n.blob();return new Response(a,r)}function R(e){if(!e)throw new u("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new u("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),r=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:r.href}}class q{constructor(e){this._cacheName=o(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=R(n),r="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new u("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new u("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),a=await r.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)c.has(t)?s.push(e):n.push({cacheKey:t,url:e});const o=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),a=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:a,event:e,integrity:r,plugins:t,url:s})});await Promise.all(o);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:r,integrity:a}){const c=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});let o,i=await m({event:s,plugins:r,request:c});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:c,response:i}):i.status<400))throw new u("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await v(i)),await w({event:s,plugins:r,response:i,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new u("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new u("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let U;const L=()=>(U||(U=new q),U);const b=(e,t)=>{const n=L().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(a,t);if(yield c.href,n&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=n,yield e.href}if(s){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let T=!1;function x(e){T||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=o();self.addEventListener("fetch",a=>{const c=b(a.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!c)return void 0;let o=self.caches.open(r).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(o)})})(e),T=!0)}const N=e=>{const t=L(),n=r.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},K=e=>{const t=L();e.waitUntil(t.activate())};n(2);const C=e=>e&&"object"==typeof e?e:{handle:e};class O{constructor(e,t,n="GET"){this.handler=C(t),this.match=e,this.method=n}}class M extends O{constructor(e,t,n){super(({url:t})=>{const n=e.exec(t.href);if(n&&(t.origin===location.origin||0===n.index))return n.slice(1)},t,n)}}class P{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,n=this.handleRequest({request:t,event:e});n&&e.respondWith(n)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const n=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(n),e.ports&&e.ports[0]&&n.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const n=new URL(e.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const{params:s,route:r}=this.findMatchingRoute({url:n,request:e,event:t});let a=r&&r.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),!a)return void 0;let c;try{c=a.handle({url:n,request:e,event:t,params:s})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this._catchHandler&&(c=c.catch(s=>this._catchHandler.handle({url:n,request:e,event:t}))),c}findMatchingRoute({url:e,request:t,event:n}){const s=this._routes.get(t.method)||[];for(const r of s){let s;const a=r.match({url:e,request:t,event:n});if(a)return s=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(s=void 0),{route:r,params:s}}return{}}setDefaultHandler(e){this._defaultHandler=C(e)}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new u("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new u("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let E;const W=()=>(E||(E=new P,E.addFetchListener(),E.addCacheListener()),E);function S(e,t,n){let s;if("string"==typeof e){const r=new URL(e,location.href);0;s=new O(({url:e})=>e.href===r.href,t,n)}else if(e instanceof RegExp)s=new M(e,t,n);else if("function"==typeof e)s=new O(e,t,n);else{if(!(e instanceof O))throw new u("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});s=e}return W().registerRoute(s),s}n(3);const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class j{constructor(e={}){if(this._cacheName=i(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[k,...e.plugins]}else this._plugins=[k];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const n=this._getFromNetwork({request:t,event:e});let s,r=await y({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(r){if(e)try{e.waitUntil(n)}catch(s){0}}else{0;try{r=await n}catch(e){s=e}}if(!r)throw new u("no-response",{url:t.url,error:s});return r}async _getFromNetwork({request:e,event:t}){const n=await m({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),s=w({cacheName:this._cacheName,request:e,response:n.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(s)}catch(e){0}return n}}var F,H;F=[{'revision':'8f4ecf96023b7cb3d8b666a70c245ec6','url':'detail.html'},{'revision':'f34fde47eb51eaa9e720c3503d3dd3a8','url':'gambar/icon/icon-192.png'},{'revision':'52465cdd4a3abded6743c6d930c3ba0d','url':'gambar/slider1.jpg'},{'revision':'aa9bfd2bdb0078f5692d976e2a921ee4','url':'gambar/slider2.jpeg'},{'revision':'8c456e992ed36285b8b00ea7d0b41647','url':'gambar/slider3.jpeg'},{'revision':'b999e49a48637aa7d6fab3ad732b58a4','url':'gambar/slider4.jpeg'},{'revision':'dd73a0e8cad2e62f29e93522af9788e0','url':'icon_1024x1024.dd73a0e8cad2e62f29e93522af9788e0.png'},{'revision':'99904fca5a3c3a26593180b0a2a135d3','url':'icon_128x128.99904fca5a3c3a26593180b0a2a135d3.png'},{'revision':'8e513d20cd84b09be53dae3b75aa3e2d','url':'icon_192x192.8e513d20cd84b09be53dae3b75aa3e2d.png'},{'revision':'523e9f8e53b52f41e076a22e2cf435fc','url':'icon_256x256.523e9f8e53b52f41e076a22e2cf435fc.png'},{'revision':'12ecf1fb856140a21de77b68ddf7cbab','url':'icon_384x384.12ecf1fb856140a21de77b68ddf7cbab.png'},{'revision':'2c4daa8b4fb9c5a964cc12dc8f7ecbb6','url':'icon_512x512.2c4daa8b4fb9c5a964cc12dc8f7ecbb6.png'},{'revision':'e1fdf4146bcafad6d7e3f6122bbacaf2','url':'icon_96x96.e1fdf4146bcafad6d7e3f6122bbacaf2.png'},{'revision':'328764971a4b82e7c138f7be93af6460','url':'index.html'},{'revision':'d36daef1e3e5812eb8c1fbe6b8662dc9','url':'js/push.js'},{'revision':'be3b5899fbbe524a53eb9bb091dfa174','url':'manifest.be3b5899fbbe524a53eb9bb091dfa174.json'},{'revision':'c241aec87840451e9a10e67710244307','url':'pages/favorite.html'},{'revision':'b6ad289ef616d28882a920edf73b97fa','url':'pages/home.html'},{'revision':'fdc72a64c9406fce7366562582707a52','url':'pages/klasemen.html'},{'revision':'2b02da2c12a40dacaca37893bd2d07a6','url':'pages/pertandingan.html'}],H={ignoreURLParametersMatching:[/.*/]},function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",N),self.addEventListener("activate",K))}(F),x(H),S(new RegExp("/pages/"),new j({cacheName:"pages"})),S(({request:e})=>"image"===e.destination,new j({cacheName:"image"})),S(({request:e})=>"script"===e.destination,new j({cacheName:"js"})),S(({url:e})=>"https://api.football-data.org"===e.origin,new j({cacheName:"api"})),self.addEventListener("push",e=>{const t={body:"Push message no payload",icon:"gambar/icon/icon.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("PWA Info Bola Premier League",t))})}]);