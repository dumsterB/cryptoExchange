import { ls } from '@/utils/localStorage';

export class BaseToken {
    constructor(name) {
        this._tokenName = name;
    }

    set(token) {
        ls.set(this._tokenName, token);
    }

    get() {
        return ls.get(this._tokenName);
    }

    has() {
        return !!this.get();
    }

    remove() {
        ls.remove(this._tokenName);
    }
}