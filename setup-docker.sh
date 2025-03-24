#!/bin/bash

# Setup script for Docker deployment

echo "Setting up environment for Docker deployment..."

# Check for CMS .env file
if [ -f "apps/cms/.env" ]; then
    echo "CMS .env file found."
else
    echo "WARNING: apps/cms/.env file not found!"
    echo "Running the setup-cms-env.js script to create a default one..."
    yarn strapi-env
    echo "Please review and update the generated .env file if needed."
fi

# Check for Web .env file
if [ -f "apps/web/.env" ]; then
    echo "Web .env file found."
    # Check if it contains STRAPI_TOKEN
    if grep -q "STRAPI_TOKEN" "apps/web/.env"; then
        echo "STRAPI_TOKEN found in web .env file."
    else
        echo "WARNING: STRAPI_TOKEN not found in web .env file."
        echo "Please manually add your STRAPI_TOKEN to apps/web/.env before deploying."
    fi
else
    echo "WARNING: apps/web/.env file not found!"
    echo "Creating a template .env file. You MUST edit this file to add your STRAPI_TOKEN."
    echo "STRAPI_URL=http://cms:1337" > apps/web/.env
    echo "NODE_ENV=production" >> apps/web/.env
    echo "# STRAPI_TOKEN=your_token_here" >> apps/web/.env
fi

echo "Setup check complete!"
echo "IMPORTANT: Make sure your web .env file has a valid STRAPI_TOKEN value."
echo "You can now run 'docker-compose build' to build the images."
echo "Then run 'docker-compose up -d' to start the services." 