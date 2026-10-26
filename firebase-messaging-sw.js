importScripts('https://cdn.jsdelivr.net/npm/firebase@10.13.1/firebase-app-compat.js');
importScripts('https://cdn.jsdelivr.net/npm/firebase@10.13.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBFPBUM3cBuDCcZB7pbRi7zMTcZFhD-FMs",
  authDomain: "nova-chat-a2750.firebaseapp.com",
  projectId: "nova-chat-a2750",
  storageBucket: "nova-chat-a2750.firebasestorage.app",
  messagingSenderId: "28585583349",
  appId: "1:28585583349:web:59e31c47c966ecbb3e9bbc"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const n = payload.notification || {};
  self.registration.showNotification(n.title || 'Nova Chat', {
    body: n.body || '',
    icon: n.icon || '/Nova-chat/icon-192.png',
    badge: '/Nova-chat/icon-192.png',
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/Nova-chat/');
    })
  );
});
