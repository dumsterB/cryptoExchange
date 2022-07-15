export function wrappedAsyncFunction(callback) {
    const parseError = ({ response, message: catchMessage }) => {
        const { message, error } = response?.data ?? {};

        if (message)
            return message?.[0] || message;

        if (error)
            return error;

        return catchMessage;
    };

    return async function() {
        try {
            return await callback.apply(this, arguments);
        } catch(e) {
            return { error: parseError(e) };
        }
    };
}