

export class BaseClient {
    get() {}

    post() {}

    delete() {}

    put() {}

    get _baseUrl() {
        return import.meta.env.VITE_BACKEND_URL;
    }
}