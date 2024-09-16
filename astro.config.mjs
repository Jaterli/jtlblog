import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";


// https://astro.build/config
export default defineConfig({
  site: 'https://jtlblog.netlify.app',
  integrations: [mdx(), sitemap(), tailwind(), icon()],

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