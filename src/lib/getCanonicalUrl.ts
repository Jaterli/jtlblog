// URL canónica: siempre sobre el dominio principal y con barra final (como las sirve el hosting)
export function getCanonicalUrl(url: URL, site: URL | undefined): URL {
  const pathname = url.pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(url.pathname)
    ? url.pathname
    : `${url.pathname}/`;
  return new URL(pathname, site ?? url);
}
