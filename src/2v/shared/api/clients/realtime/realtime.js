import { config } from '@/config';
import { io } from 'socket.io-client';
import AccessToken from '@/services/auth/tokens/AccessToken';

const socket = io(config.socketUrl, {
    extraHeaders: {
        'Authorization': `Bearer ${ AccessToken.get() }`
    },
    transports: ['websocket']
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