import { UNKNOWN_ERROR_KEY } from '@/config';

// Input for function - Error object from try / catch
function parseError(
    {
        response,
        message: catchError
    },
    {
        i18nScope = 'errors'
    } = {}
) {
    console.error(catchError);

    // error message (i18n key) 
    const { message } = response?.data ?? {};

    if (message)
        return Array.isArray(message)
            ? message[0]
            : `${ i18nScope }.${ message }`;

    return UNKNOWN_ERROR_KEY;
}

export default parseError;