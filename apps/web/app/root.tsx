import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "react-router";
import { getCurrentTheme } from "~/utils/theme";

import type { Route } from "./+types/root";
import "./app.css";
import { GET_GLOBAL } from "./graphql/queries";
import type { Global } from "./graphql/types";
import graphqlClient from "./graphql/client";
import env from "./config/env";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
  },
];

export const loader = async () => {
  const theme = getCurrentTheme();
  const { data: global } = await graphqlClient.query<{ global: Global }>({
    query: GET_GLOBAL,
  });

  return {
    theme,
    global: global.global,
    umami: {
      scriptUrl: env.UMAMI_SCRIPT_URL,
      websiteId: env.UMAMI_WEBSITE_ID
    }
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, global, umami } = useLoaderData<{
    theme: ReturnType<typeof getCurrentTheme>,
    global: Global,
    umami: {
      scriptUrl: string,
      websiteId: string
    }
  }>();
  const location = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href={`${env.STRAPI_URL}${global.favicon.url}`} />
        <title>{global.siteName}</title>
        <meta name="description" content={global.siteDescription} />
        {umami.scriptUrl && umami.websiteId && (
          <script defer src={umami.scriptUrl} data-website-id={umami.websiteId}></script>
        )}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-primary: ${theme.primary};
              --color-secondary: ${theme.secondary};
              --color-accent: ${theme.accent};
              --color-background: ${theme.background};
            }
          `
        }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}