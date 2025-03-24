#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Setup Environment Variables for CMS
 * 
 * This script generates secure random values for the required Strapi environment variables
 * and creates a .env file in the CMS directory.
 */

// Helper function to generate a random string with base64 encoding
function generateRandomString(length = 16) {
    return crypto.randomBytes(length).toString('base64');
}

// Helper function to generate a key array
function generateAppKeys(count = 1) {
    return Array.from({ length: count }, () => generateRandomString()).join(',');
}

// Paths
const cmsDir = path.resolve(__dirname, '..');
const envPath = path.join(cmsDir, '.env');

try {
    console.log('Generating secure random values for Strapi environment variables...');

    // Create environment content with required variables
    const envContent = [
        '# Server',
        'HOST=0.0.0.0',
        'PORT=1337',
        '',
        '# Secrets',
        `APP_KEYS=${generateAppKeys(1)}`,
        `API_TOKEN_SALT=${generateRandomString()}`,
        `ADMIN_JWT_SECRET=${generateRandomString()}`,
        `TRANSFER_TOKEN_SALT=${generateRandomString()}`,
        '',
        '# Database',
        'DATABASE_CLIENT=sqlite',
        'DATABASE_HOST=',
        'DATABASE_PORT=',
        'DATABASE_NAME=',
        'DATABASE_USERNAME=',
        'DATABASE_PASSWORD=',
        'DATABASE_SSL=false',
        'DATABASE_FILENAME=data/data.db',
        ''
    ].join('\n');

    // Write the .env file
    fs.writeFileSync(envPath, envContent);
    console.log(`Successfully created .env file at: ${envPath}`);
    console.log('Strapi environment variables set up successfully!');
} catch (error) {
    console.error('Error setting up Strapi environment variables:', error);
    process.exit(1);
} 