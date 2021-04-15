importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyB7RfQ5SSHL4VJKQ_glxSTEqO-uMdF_YAA",
  authDomain: "hris-dev-7b90a.firebaseapp.com",
  databaseURL: "https://hris-dev-7b90a.firebaseio.com",
  projectId: "hris-dev-7b90a",
  storageBucket: "hris-dev-7b90a.appspot.com",
  messagingSenderId: "991598406243",
  appId: "1:991598406243:web:7396ea72feec09de20a656",
  measurementId: "G-0VLH3VZQ8J"
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
