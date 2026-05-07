self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('push', function (event) {
  const data = event.data ? event.data.json() : { title: 'Focus.IA', body: 'Hora de voltar ao foco.' };
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png'
    })
  );
});
