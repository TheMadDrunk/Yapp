# Yapp (Yet Another Project Portfolio)

A portfolio platform for developers built with React Router and Strapi CMS. Provides access to the codebase for customization of styling and functionality.

![Yapp Screenshot](./Untitled.png)

*Screenshot of Yapp portfolio application showing the customizable theme colors*


## About

Yapp is a portfolio application, started it to explore the use of React Router and Strapi CMS, feel free to use it modify or contribute to it.

## Tech Stack

- **Frontend**: 
  - React Router v7
  - TypeScript
  - TailwindCSS
  - Server-Side Rendering

- **Backend**: 
  - Strapi v5 headless CMS
  - GraphQL API

- **Developer Tools**: 
  - Yarn workspaces (v4.4.1)
  - Docker
  - TypeScript v4
  - Prettier

## Project Structure

```
yapo/
├── apps/
│   ├── web/    # React Router frontend
│   └── cms/    # Strapi CMS backend
```

## Getting Started

### Prerequisites
- Node.js v22+

### Setup (Local Development)

```bash
# Install dependencies
yarn install

# Generate Strapi API token for the web app
yarn setup

# Start frontend (http://localhost:5173)
cd apps/web && yarn dev

# Start CMS (http://localhost:1337)
cd apps/cms && yarn develop
```

### Docker Setup

The project includes Docker configurations for both the CMS and web applications:

- `Dockerfile.cms` - Strapi CMS container
  - Automatically generates secure random values for all required environment variables
  - Creates a .env file with database configuration and security tokens
  - No manual configuration required

- `Dockerfile.web` - React Router frontend container
  - Expects environment variables to be provided when running the container
  - Required variables can be found in `apps/web/.env.example`

To build and run the Docker containers:

```bash
# Build the CMS image
docker build -t yapp-cms -f Dockerfile.cms .

# Build the web image
docker build -t yapp-web -f Dockerfile.web .

# Run the CMS container
docker run -d -p 1337:1337 --name yapp-cms yapp-cms

# Run the web container with environment variables
docker run -d -p 3000:3000 --name yapp-web \
  -e VITE_STRAPI_URL=http://yapp-cms:1337 \
  -e VITE_STRAPI_TOKEN="your_strapi_token" \
  -e VITE_NODE=production \
  yapp-web
```

Then access:
- Frontend: http://localhost:3000
- CMS: http://localhost:1337

### Environment Variables

The project uses environment variables for configuration:

- **CMS (.env)**: 
  - Generated automatically by `setup-cms-env.js` script during Docker build
  - Contains secure random values for Strapi security keys and database configuration
  - No manual configuration needed for Docker deployment

- **Web (.env)**:
  - Required variables are listed in `apps/web/.env.example`
  - For local development: Copy `apps/web/.env.example` to `apps/web/.env` and fill in values
  - For Docker: Environment variables should be provided in the `docker-compose.yml` file or at runtime
  - Required variables include:
    - `VITE_STRAPI_TOKEN`: API token for Strapi CMS access
    - `VITE_STRAPI_URL`: URL to the Strapi CMS instance
    - `VITE_NODE`: Environment mode (development/production)

## Customization

- Modify whathever you want in the codebase.
- Theme colors and fonts can be easily modified through CSS variables in `apps/web/app/app.css`

```css
/* Example of theme variables in app.css */
@theme {
  --font-mono: "Fira Mono", ui-monospace, monospace;
  --color-primary: #4c2215;
  --color-secondary: #981d26;
  --color-accent: #e5a631;
  --color-background: #f2e1c5;
}
```

## License

GLWTPL License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions accepted via Pull Requests.