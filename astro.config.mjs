import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";
import netlify from "@astrojs/netlify";
import tailwindcss from '@tailwindcss/vite';

// Despliegue temporal en GitHub Pages (PUBLIC_DEPLOY_TARGET=github): sitio 100% estático, sin adaptador
// ni funciones de servidor. Sin la variable, el build es el de Netlify de siempre.
const isGithubPages = process.env.PUBLIC_DEPLOY_TARGET === 'github';

// Fuerza el prerender de todas las rutas que declaran `prerender = false`
const forceStatic = {
  name: 'force-static',
  hooks: {
    'astro:route:setup': ({ route }) => {
      route.prerender = true;
    },
  },
};

export default defineConfig({
  site: 'https://jaterli.com',
  //base: '/jtlblog',
  integrations: [mdx(), icon(), sitemap({
    // Escluye las páginas que cumplan con la condición
      filter: (page) => !page.includes('/blog/tag/')
  }), ...(isGithubPages ? [forceStatic] : []) ],
  // La antigua página de servicios se sustituyó por la de capacidades
  redirects: {
    '/servicios': '/capacidades',
  },
  output: "static", // El sitio se construye como estático por defecto
  adapter: isGithubPages ? undefined : netlify(), // Adaptador de Netlify para funciones serverless
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
    },
    plugins: [tailwindcss()],
  }
});