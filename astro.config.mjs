// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import playformFormat from "@playform/format";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://www.thequietguardian.ie",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    playformFormat(),
    sitemap({
      filter: (page) => page !== "https://www.thequietguardian.ie/thank-you",
    }),
  ],
});
