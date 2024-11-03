import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import million from "million/compiler";
import MillionLint from "@million/lint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "GreeningSiren's Download Center",
        short_name: "Download Center",
        start_url: "/download/",
        display: "standalone",
        background_color: "#242424",
        lang: "en",
        scope: "/download/",
        theme_color: "#05dcaa",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png"
          }
        ],
        id: "gsdowncenter",
        description: "Download Video and Audio from YouTube and other services for free!",
        dir: "ltr",
        orientation: "any",
        shortcuts: [
          {
            name: "Download Page",
            url: "/download/",
            description: "Main Download page"
          },
          {
            name: "Supported Services",
            url: "/download/supported/",
            description: "List of supported services"
          },
          {
            name: "API Status",
            url: "/download/serverStatus",
            description: "Check API status"
          }
        ],
        categories: [
          "utilities"
        ],
        launch_handler: {
          client_mode: ["navigate-existing", "auto"]
        }
      },
    }),
    million.vite({ auto: true }),
    MillionLint.vite(),
  ],
  base: "/download/",
});
