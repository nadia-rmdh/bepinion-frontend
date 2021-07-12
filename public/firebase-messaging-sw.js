importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyChZ18BHRmQ9VthSeHvC9uMOnVCdUuIyJE",
  authDomain: "idea-collaboration-pp.firebaseapp.com",
  databaseURL: "https://hris-dev-7b90a.firebaseio.com",
  projectId: "idea-collaboration-pp",
  storageBucket: "idea-collaboration-pp.appspot.com",
  messagingSenderId: "112108152735",
  appId: "1:112108152735:web:dc6c5bfb186efc789fbfaa",
  measurementId: "G-6JXLPSH9XS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((...params) => console.log(params));


messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/icon.png'
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
})

self.addEventListener('notificationclick', function (event) {
  console.log(event);
});
