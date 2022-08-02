import localStorage from '@/utils/localStorage';
import { useLocalStorage } from '@vueuse/core';

export class BaseToken {
    constructor(name) {
        this._tokenName = name;
        
        // TODO: check
        this._tokenRef = useLocalStorage(name, localStorage.get(name));
    }

    set(token) {
        this._tokenRef.value = token;
    }

    get() {
        return this._tokenRef.value;
    }

    has() {
        return !!this._tokenRef.value;
    }

    remove() {
        this._tokenRef.value = null;
    }

    get ref() {
        return this._tokenRef;
    }
}