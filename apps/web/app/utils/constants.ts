const token = process.env.STRAPI_TOKEN;
const url = process.env.STRAPI_URL;

if (!token || !url) {
    throw new Error("STRAPI_TOKEN and STRAPI_URL must be set");
}

export { token, url };
