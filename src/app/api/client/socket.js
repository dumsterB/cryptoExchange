import { io } from 'socket.io-client';
import { SOCKET_URL } from '@/config';
import { AccessToken } from '@/utils/auth';
import { watchEffect } from 'vue';

let socket = null;

function connect() {
    socket = io(SOCKET_URL, {
        auth: {
            token: AccessToken.get()
        },
        transports: ['websocket'],
        reconnectionAttempts: 5
    });

    socket.on('connect', () => console.log('connect'));
    socket.on('error', console.log);
    socket.on('disconnect', () => {
        socket = null;
        console.log('disconnect');
    });
}

function disconnect() {
    socket?.disconnect();
}

// TODO: check this
watchEffect(() => {
    // if (!socket && AccessToken.ref.value) {
    //     connect();
    // }

    // if (socket && !AccessToken.ref.value) {
    //     setTimeout(disconnect, 2000); // timeout ??? Did him cause of unsubscribe socket emits on unmounted
    // }
});

function sendMessageToSocket(type, payload) {
    socket.emit(type, payload);
}

function subscribeToScope(scope, payload, callback) {
    if (!socket)
        return;
    sendMessageToSocket(
        'subscribe',
        { scope, payload }
    );

    socket.on(
        scope,
        data => callback(data)
    );
}

function unsubscribeFromScope(scope) {
    if (!socket)
        return;
        
    sendMessageToSocket(
        'unsubscribe',
        { scope }
    );
}

export default {
    subscribeToScope,
    unsubscribeFromScope
};