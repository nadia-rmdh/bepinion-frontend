import Axios from 'axios';
import store from '../store'
import { LOGOUT } from '../actions/auth'
import { toast } from 'react-toastify'

toast.configure();

const request = Axios.create({
    baseURL: process.env.REACT_APP_DOMAIN + '/api',

})

request.interceptors.request.use((config) => {
    // const { token: session } = store.getState();
    const session = localStorage.getItem('session')
    if (session) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers["Authorization"] = `Bearer ${session}`;

    }

    return config;
}, err => Promise.reject(err))

request.interceptors.response.use(response => {
    return response;
}, err => {
    if (err.response && err.response.status >= 500) {
        toast.error(err.message, { autoClose: 2000 });
    }

    if (err.response && err.response.status === 401) {
        store.dispatch({ type: LOGOUT });
    }

    return Promise.reject(err);
})

export const requestDownload = (url, filename = 'download') => {
    return request.get(url, { responseType: 'arraybuffer' })
        .then(res => {
            const type = res.headers['content-type']
            const blob = new Blob([res.data], { type, encoding: 'UTF-8'})
            let name = filename
            const disposition = res.headers['content-disposition']
            if (disposition && disposition.indexOf('inline') !== -1) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) {
                    name = matches[1].replace(/['"]/g, '');
                }
            }

            const URL = window.URL || window.webkitURL
            const downloadUrl = URL.createObjectURL(blob)
            let newWindow = null;

            const iOS = window.navigator.platform && /iPad|iPhone|iPod/.test(window.navigator.platform)
            if (iOS) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    newWindow = window.open(reader.result);
                    newWindow.onload = function () {
                        newWindow.document.getElementsByTagName('html')[0]
                            .appendChild(document.createElement('head'))
                            .appendChild(document.createElement('title'))
                            .appendChild(document.createTextNode(name));
                    }
                    setTimeout(() => {
                        newWindow.document.title = name;
                    }, 100)
                }
                reader.readAsDataURL(blob);
            } else {
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = name;
                link.click();
                setTimeout(() => {
                    link.remove();
                }, 1500);
            }

            return Promise.resolve(true);
        });
}

export default request;
