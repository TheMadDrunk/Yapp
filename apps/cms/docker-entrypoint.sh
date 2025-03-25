#!/bin/sh

# Function to update environment variables in .env file
update_env() {
    # Get all environment variables
    env | while read -r line; do
        # Split into key and value
        if echo $line | grep -q '='; then
            key=$(echo $line | cut -d'=' -f1)
            value=$(echo $line | cut -d'=' -f2-)
            
            # Update .env file if the key exists
            if grep -q "^${key}=" ./.env; then
                sed -i "s|^${key}=.*|${key}=${value}|" ./.env
            # Add the key-value pair if it doesn't exist
            else
                echo "${key}=${value}" >> ./.env
            fi
        fi
    done
}

# Update environment variables
update_env

# Execute the main command
exec "$@" 