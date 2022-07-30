import { io } from 'socket.io-client';
import { SOCKET_URL } from '@/config';
import { AccessToken } from '@/utils/auth';

const socket = io(SOCKET_URL, {
    auth: {
        token: AccessToken.get()
    },
    transports: ['websocket'],
    reconnectionAttempts: 5
});

socket.on('connect', () => console.log('connect'));
socket.on('error', console.log);
socket.on("disconnect", console.log);

function sendMessageToSocket(type, payload) {
    socket.emit(type, payload);
}

function subscribeToScope(scope, payload, callback) {
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
    sendMessageToSocket(
        'unsubscribe',
        { scope }
    );
}

export default {
    subscribeToScope,
    unsubscribeFromScope
};