import { config } from '@/config';
import { io } from 'socket.io-client';
import AccessToken from '@/services/auth/tokens/AccessToken';

const socket = io(config.socketUrl, {
    auth: {
        token: AccessToken.get()
    },
    transports: ['websocket'],
    reconnectionAttempts: 5
});

socket.on('connect', () =>console.log('connect'));
socket.on('error', console.log);
socket.on("disconnect", (reason) => {
    console.log(reason); // "ping timeout"
});

function sendMessageToSocket(type, payload) {
    socket.emit(type, payload);
}

export function subscribeToSocketScope(scope, payload, callback) {
    sendMessageToSocket(
        'subscribe',
        { scope, payload }
    );

    socket.on(
        scope,
        data => callback(data)
    );
}

export function unsubscribeFromSocketScope(scope) {
    sendMessageToSocket(
        'unsubscribe',
        { scope }
    );
}