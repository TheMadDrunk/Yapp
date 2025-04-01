let env = {
    STRAPI_TOKEN: '',
    STRAPI_URL: 'http://localhost:1337',
    NODE_ENV: 'development',
    THEME: 'red-wine',
    GOOGLE_ANALYTICS_ID: '',
}
const initEnv = () => {
    try {
        env = {
            STRAPI_TOKEN: import.meta.env.VITE_STRAPI_TOKEN ?? '',
            STRAPI_URL: import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337',
            NODE_ENV: import.meta.env.VITE_NODE_ENV ?? 'development',
            THEME: import.meta.env.VITE_THEME ?? 'red-wine',
            GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID ?? '',
        };
    } catch (error) {
        console.log('[env]:', error);
    }
}

initEnv();

if (!env.STRAPI_TOKEN && typeof window == 'undefined') {
    throw new Error('STRAPI_TOKEN is required');
}

export default env;
