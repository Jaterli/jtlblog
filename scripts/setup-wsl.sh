#!/bin/bash
# Prepara el proyecto para trabajar desde WSL estando en un disco de Windows (/mnt/...).
#
# Leer miles de ficheros a través de /mnt es muy lento, así que las dependencias viven en el disco
# de Linux y en el proyecto solo hay un enlace simbólico:
#   node_modules -> ~/jaterli_deps/node_modules
#
# Uso (desde la raíz del proyecto, en WSL):  bash scripts/setup-wsl.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "== Dependencias (yarn)"
bash "$ROOT/scripts/yarn.sh" install --frozen-lockfile

echo "Listo. Arranca la web con:  yarn dev"
