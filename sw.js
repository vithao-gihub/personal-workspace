const CACHE_NAME = 'personal-workspace-v2.0.3';
const STATIC_ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './xlsx.full.min.js',
    './icon.svg',
    './icon-192.png',
    './icon-512.png',
    './apple-touch-icon.png'
];

// 1. Cài đặt Service Worker và lưu bộ nhớ đệm (Pre-cache static assets)
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_ASSETS).catch((err) => {
                console.warn('[ServiceWorker] Một số tài nguyên không thể nạp trước:', err);
            });
        })
    );
});

// 2. Kích hoạt và dọn dẹp các cache phiên bản cũ
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] Xóa cache cũ:', key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Xử lý yêu cầu mạng (Network-first với offline cache fallback)
self.addEventListener('fetch', (event) => {
    // Chỉ xử lý các yêu cầu GET
    if (event.request.method !== 'GET') return;

    // Bỏ qua các scheme đặc biệt (chrome-extension, edge, etc.)
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Tự động sao chép và cập nhật cache cho các phản hồi thành công
                if (response && response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            })
            .catch(() => {
                // Khi mất mạng (Offline), tìm phản hồi trong bộ nhớ đệm
                return caches.match(event.request).then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // Nếu là yêu cầu trang HTML, trả về index.html offline
                    if (event.request.headers.get('accept')?.includes('text/html')) {
                        return caches.match('./index.html') || caches.match('./');
                    }
                });
            })
    );
});
