#!/bin/bash
# yarn para instalar/quitar paquetes cuando el proyecto está en un disco de Windows y se usa desde WSL.
#
# Leer miles de ficheros a través de /mnt es muy lento, así que node_modules vive en el disco de Linux
# (~/jaterli_deps) y en el proyecto solo hay un enlace simbólico. yarn no debe instalar sobre ese enlace:
# este script ejecuta yarn en una réplica del proyecto en el disco de Linux y copia de vuelta package.json
# y yarn.lock, de modo que el repositorio queda igual que con un yarn normal.
#
# Uso (desde cualquier carpeta del proyecto):
#   bash scripts/yarn.sh install          # instalar todo
#   bash scripts/yarn.sh add paquete      # añadir un paquete (add -D para desarrollo)
#   bash scripts/yarn.sh remove paquete
# Para lo demás (yarn dev, yarn build…) usa yarn normal en la raíz del proyecto.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPS="${JATERLI_DEPS:-$HOME/jaterli_deps}"

mkdir -p "$DEPS"
cp "$ROOT/package.json" "$ROOT/.npmrc" "$DEPS/"
[ -f "$ROOT/yarn.lock" ] && cp "$ROOT/yarn.lock" "$DEPS/"

(cd "$DEPS" && yarn --non-interactive "$@")

cp "$DEPS/package.json" "$ROOT/"
[ -f "$DEPS/yarn.lock" ] && cp "$DEPS/yarn.lock" "$ROOT/"

# Enlace node_modules -> réplica en el disco de Linux
if [ -e "$ROOT/node_modules" ] && [ ! -L "$ROOT/node_modules" ]; then
  echo "node_modules es una carpeta real en /mnt (lenta): la sustituyo por el enlace…"
  rm -rf "$ROOT/node_modules"
fi
ln -sfn "$DEPS/node_modules" "$ROOT/node_modules"
