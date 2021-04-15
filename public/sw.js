// this.addEventListener('install', function (event) {
//     console.log('aa')
// });
// import request from '../src/utils/request';
/* eslint-disable */
self.addEventListener('install', function (event) {
    self.skipWaiting();


    console.log('aaas')
});
self.addEventListener('activate', async event => {
    self.skipWaiting();
    console.log('V1 now ready to handle fetches!');
    console.log(event);
    const url = 'https://hris-dev.widyaskilloka.com/api/v1/personnel/working-shifts';
    const session = window.sessionStorage.getItem('session');
    await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + session,
        },
    }).then(response => {
        const data = response.json();
        console.log(response)
    })
    // console.log(self.clients.claim())
    // self.registration.pushManager.fetch('/api/v1/personnel/working-shifts', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         subscription,
    //         payload: JSON.stringify(task)
    //     })
    // })
    // try {
    //     const { data } = await request.get('v1/personnel/working-shifts');
    //     let shifts = data.data
    // } catch (err) {
    //     console.log(err)
    //     throw err;
    // }
    // console.log(shifts)
    // setInterval(function () {
    //     self.registration.showNotification('a');
    // }, 2000);

});
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 if (response) { //entry found in cache
//                     console.log(response)
//                     return response
//                 }
//                 console.log(event.request)
//                 return fetch(event.request)
//             }
//             )
//     )
// })
// self.addEventListener('onmessage', function (event) {
//     console.log('asss')
// });
// self.addEventListener('notificationclose', function (e) {
//     var notification = e.notification;
//     var data = notification.data || {};
//     var primaryKey = data.primaryKey;
//     console.debug('Closed notification: ' + primaryKey);
// });
// self.addEventListener('notificationclick', function (e) {
//     var notification = e.notification;
//     var data = notification.data || {};
//     var primaryKey = data.primaryKey;
//     var action = e.action;
//     console.debug('Clicked notification: ' + primaryKey);
//     if (action === 'close') {
//         console.debug('Notification clicked and closed', primaryKey);
//         notification.close();
//     }
//     else {
//         console.debug('Notification actioned', primaryKey);
//         notification.close();
//     }
// });
/* eslint-enable */