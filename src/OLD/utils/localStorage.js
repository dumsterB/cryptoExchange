class LocalStorage {
    has(key) {
        return !!localStorage.getItem(key);
    }

    get(key) {
        const str = localStorage.getItem(key);

        try {
            return JSON.parse(str);
        } catch (error) {
            return str;
        }
    }

    set(key, obj) {
        localStorage.setItem(
            key,
            JSON.stringify(obj)
        );
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}

export const ls = new LocalStorage();