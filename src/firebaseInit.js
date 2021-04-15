import firebase from 'firebase/app';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyB7RfQ5SSHL4VJKQ_glxSTEqO-uMdF_YAA",
    authDomain: "hris-dev-7b90a.firebaseapp.com",
    databaseURL: "https://hris-dev-7b90a.firebaseio.com",
    projectId: "hris-dev-7b90a",
    storageBucket: "hris-dev-7b90a.appspot.com",
    messagingSenderId: "991598406243",
    appId: "1:991598406243:web:7396ea72feec09de20a656",
    measurementId: "G-0VLH3VZQ8J"
};
const VAPID_KEY = "BEa7box18239mE52JCES-gFNCVbvQxcWqZzEVwigciKfOp5YsFiR6euzc_HOfScc7W07Fzd4vYFj_0R_hpH87zw";

function isSupport() {
    return 'PushManager' in window;
}

firebase.initializeApp(config);

const messaging = isSupport() ? firebase.messaging() : null;
export const requestNotificationPermission = (serviceWorkerRegistration) => 
    new Promise((resolve, reject) => {
        if (! isSupport()) {
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
    if (! isSupport()) {
        return () => {};
    }
    return messaging.onMessage(callback);
}

export const unsubscribe = () => {
    if (! isSupport()) {
        return;
    }
    return messaging.deleteToken();
}
