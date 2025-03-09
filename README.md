# Yapp (Yet Another Project Portfolio)

A portfolio platform for developers built with React Router and Strapi CMS. Provides access to the codebase for customization of styling and functionality.

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
  - Yarn workspaces
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
- Node.js v20.18.3+

### Setup

```bash
# Install dependencies
yarn install

# Start frontend (http://localhost:5173)
cd apps/web && yarn dev

# Start CMS (http://localhost:1337)
cd apps/cms && yarn develop
```

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

## Deployment

Deployment instructions will be added in future updates.

## License

GLWTPL License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions accepted via Pull Requests.
