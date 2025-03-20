
let env = {
    STRAPI_TOKEN: '',
    STRAPI_URL: 'http://localhost:1337',
    NODE_ENV: 'development',
}

const initEnv = () => {
    try {
        env = {
            STRAPI_TOKEN: process.env.STRAPI_TOKEN ?? '',
            STRAPI_URL: process.env.STRAPI_URL ?? 'http://localhost:1337',
            NODE_ENV: process.env.NODE_ENV ?? 'development',
        };
    } catch (error) {
        console.log('[env]:', error);
    }
}

initEnv();


if (!env.STRAPI_TOKEN && !window) {
    throw new Error('STRAPI_TOKEN is required');
}

export default env;
