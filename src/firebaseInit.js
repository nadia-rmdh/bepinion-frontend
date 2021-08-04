import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyChZ18BHRmQ9VthSeHvC9uMOnVCdUuIyJE",
    authDomain: "idea-collaboration-pp.firebaseapp.com",
    // databaseURL: "https://hris-dev-7b90a.firebaseio.com",
    projectId: "idea-collaboration-pp",
    storageBucket: "idea-collaboration-pp.appspot.com",
    messagingSenderId: "112108152735",
    appId: "1:112108152735:web:dc6c5bfb186efc789fbfaa",
    measurementId: "G-6JXLPSH9XS"
};
const VAPID_KEY = "BLvcA9BfCm6XqAtVUszgNtLs4BHo3WJqDVgCSdJubekVpUi3HOGJxn0WS9ie67_Gqve-CZ7Rl0yyPQuUl57FybQ";

function isSupport() {
    return 'PushManager' in window;
}

firebase.initializeApp(config);

const messaging = isSupport() ? firebase.messaging() : null;
export const requestNotificationPermission = (serviceWorkerRegistration) =>
    new Promise((resolve, reject) => {
        if (!isSupport()) {
            reject('Browser does not support Web Push API');
        }

        messaging.getToken({ vapidKey: VAPID_KEY, serviceWorkerRegistration })
            .then(firebaseToken => {
                // TODO: HANDLE TOKEN
                resolve(firebaseToken);
            }).catch(err => {
                reject(err);
            })
    });

export const onNotificationMessage = (callback) => {
    if (!isSupport()) {
        return () => { };
    }

    return messaging.onMessage(callback);
}

export const unsubscribe = () => {
    if (!isSupport()) {
        return;
    }
    return messaging.deleteToken();
}
