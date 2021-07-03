import io from "socket.io-client";

function useSocket(path) {
    const socket = io(process.env.REACT_APP_DOMAIN, {
        path: '/socket' + path,
        reconnection: true,
        reconnectionDelay: 500,
        reconnectionAttempts: 10,
        auth: {
            sessionId: localStorage.getItem('session')
        }
    });

    return socket
}

export default useSocket;
