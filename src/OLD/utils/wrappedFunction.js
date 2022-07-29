function parseError({ response, message: catchMessage }) {
    const { message, error } = response?.data ?? {};

    if (message)
        return Array.isArray(message)
            ? message[0]
            : `errors.${ message }`;

    if (error)
        return error;

    return catchMessage;
}

export function wrappedAsyncFunction(callback) {
    return async function() {
        try {
            const res = await callback.apply(this, arguments);

            return res;
        } catch(e) {
            return { error: parseError(e) };
        }
    };
}