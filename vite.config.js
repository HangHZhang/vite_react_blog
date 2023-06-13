import { defineConfig,loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    define: {
      global: {},
    },
    base: "/",
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API] : {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        }
      }
    }
  };
});
