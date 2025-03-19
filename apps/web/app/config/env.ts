const env = {
    STRAPI_TOKEN: process.env.STRAPI_TOKEN || '',
    STRAPI_URL: process.env.STRAPI_URL || 'http://localhost:1337',
    NODE_ENV: process.env.NODE_ENV || 'development',
};

if (!env.STRAPI_TOKEN) {
    throw new Error('STRAPI_TOKEN is required');
}

export default env;
