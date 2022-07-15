import AccessToken from './tokens/AccessToken';
import { systemLogout } from './logout';
import { getUserMetadata } from '@/services/api/repositories/auth';
import { useUserStore } from '@/stores/user';
import { wrappedAsyncFunction } from '@/utils/wrappedFunction';

const loadUser = wrappedAsyncFunction(async () => {
    const user = await getUserMetadata();

    return user;
});

const ACCESS_ALLOWED = 'allowed';
const ACCESS_DENIED_REDIRECT_TO_LOGIN = 'denied_go_to_login';
const ACCESS_DENIED_REDIRECT_TO_HOME = 'denied_go_to_home';

// function check access
// and load user data if need it
async function validate(to, authPages) {
    const hasAccessToken = AccessToken.has();

    if (authPages.includes(to)) {
        return hasAccessToken
            ? ACCESS_DENIED_REDIRECT_TO_HOME
            : ACCESS_ALLOWED;
    }

    if (!hasAccessToken) {
        systemLogout();

        return ACCESS_DENIED_REDIRECT_TO_LOGIN;
    }
    
    const userStore = useUserStore();

    if (userStore.user) {
        return ACCESS_ALLOWED;
    } else {
        const { error, ...user } = await loadUser();

        if (error)
            return ACCESS_DENIED_REDIRECT_TO_LOGIN;

        userStore.set(user);

        return ACCESS_ALLOWED;
    }
}

export async function checkAccess(to = '', authPages = []) {
    const result = await validate(to, authPages);

    switch (result) {

    case ACCESS_ALLOWED:
        return { allowed: true };

    case ACCESS_DENIED_REDIRECT_TO_LOGIN:
        return {
            allowed: false,
            redirectUrl: '/login'
        };

    case ACCESS_DENIED_REDIRECT_TO_HOME:
        return {
            allowed: false,
            redirectUrl: '/'
        };

    }
}