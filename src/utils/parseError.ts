import { AxiosError } from 'axios';
// import { UNKNOWN_ERROR_KEY } from '@/config';

// Input for function - Error object from try / catch
function parseError<T>(error: T, { i18nScope = 'errors' } = {}): string {
    if (error instanceof Error) {
        console.error(error?.message);
    }

    if (error instanceof AxiosError) {
        const { message, statusCode } = error.response?.data ?? {};

        if (statusCode === 500)
            return 'errors.somethingFailed';

        if (message)
            return Array.isArray(message)
                ? message[0]
                : `${ i18nScope }.${ message }`;
    }

    if (typeof error === 'string') {
        return error;
    }

    return 'errors.somethingFailed';
}

export default parseError;