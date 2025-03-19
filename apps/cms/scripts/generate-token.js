async function generateToken() {
    const strapi = require('@strapi/strapi');
    const app = await strapi().load();

    try {
        const token = await app.admin.services['api-token'].create({
            name: 'Web App Token',
            description: 'Token for web frontend',
            type: 'read-only',
        });

        console.log('Generated API token:', token.accessKey);
    } catch (error) {
        console.error('Error generating token:', error);
    }

    await app.destroy();
}

generateToken(); 