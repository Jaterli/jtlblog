import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import netlify from "@astrojs/netlify";

export default defineConfig({
  site: 'https://jaterli.com',
  //base: '/jtlblog',
  integrations: [mdx(), tailwind(), icon(), sitemap({
    // Escluye las páginas que cumplan con la condición
      filter: (page) => !page.includes('/blog/tag/')
  }) ],
  output: "static", // El sitio se construye como estático por defecto
  adapter: netlify(), // Adaptador de Netlify para funciones serverless
  vite: {
    server:{
      watch: { 
        ignored: '*.txt',
        usePolling: true,
        interval: 1000,
        binaryInterval: 30000,
        alwaysStat: false,
        awaitWriteFinish: {
          stabilityThreshold: 1000,
          pollInterval: 1000
        }
      }
    }
  }

});