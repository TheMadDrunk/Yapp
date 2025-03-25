// This file is only for testing environment variables loading
console.log('[TEST] Environment Variables:');
console.log('[TEST] import.meta.env.VITE_STRAPI_TOKEN:', import.meta.env.VITE_STRAPI_TOKEN);
console.log('[TEST] import.meta.env.VITE_STRAPI_URL:', import.meta.env.VITE_STRAPI_URL);
console.log('[TEST] process.env.NODE_ENV:', process.env.NODE_ENV);

// Export a test function that can be imported elsewhere to verify
export function testEnvVariables() {
    return {
        STRAPI_TOKEN: import.meta.env.VITE_STRAPI_TOKEN,
        STRAPI_URL: import.meta.env.VITE_STRAPI_URL,
        NODE_ENV: process.env.NODE_ENV,
    };
} 