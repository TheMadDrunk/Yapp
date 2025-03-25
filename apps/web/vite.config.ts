import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
    optimizeDeps: {
      exclude: ["@apollo/client"],
    },
    // Provide environment variables to the app
    define: {
      // Expose NODE_ENV if needed for server-side rendering
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
    }
  };
});
