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
import ReactGA from 'react-ga';
import { useEffect } from "react";

declare global {
  interface Window {
    GA_ID?: string;
  }
}

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

  return { theme, global: global.global, GA_ID: env.GOOGLE_ANALYTICS_ID };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme, global, GA_ID } = useLoaderData<{ theme: ReturnType<typeof getCurrentTheme>, global: Global, GA_ID: string }>();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.GA_ID) {
      ReactGA.initialize(window.GA_ID, {
        debug: import.meta.env.DEV,
      });
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);

  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-FJ86228B5X"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJ86228B5X');
          `
        }} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" href={`${env.STRAPI_URL}${global.favicon.url}`} />
        <title>{global.siteName}</title>
        <meta name="description" content={global.siteDescription} />
        {/* Set GA_ID on window from server environment for client-side access */}
        <script defer src="https://umami-z4g4wc8oc8wwssksoggcc80w.7amza.ma/script.js" data-website-id="1b40ebbd-a966-4855-b53a-c9a2f01a297c"></script>
        {GA_ID && (
          <script dangerouslySetInnerHTML={{
            __html: `
              window.GA_ID = ${JSON.stringify(GA_ID)};
            `
          }} />
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
