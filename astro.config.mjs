import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { searchForWorkspaceRoot } from 'vite';
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

// En WSL, node_modules es un enlace simbólico al disco de Linux (mucho más rápido que /mnt/e, ver
// scripts/setup-wsl.sh): hay que permitir a Vite servir ficheros desde su ubicación real
const nodeModules = realpathSync(fileURLToPath(new URL('./node_modules', import.meta.url)));

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
        },
        // El sondeo no debe seguir el enlace de node_modules: son miles de ficheros que no cambian
        followSymlinks: false,
      },
      fs: { allow: [searchForWorkspaceRoot(process.cwd()), nodeModules] },
    },
    // Con el enlace de node_modules, Astro debe ver siempre la misma ruta de sus componentes: si Vite resuelve
    // la real (~/jaterli_deps) en unas peticiones y la del enlace en otras, falla con "No cached compile metadata"
    resolve: { preserveSymlinks: true },
    plugins: [tailwindcss()],
  }
});