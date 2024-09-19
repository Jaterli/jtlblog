---
title: "GitHub Action automatizar flujos de trabajo."
description: "Cómo implementé un sistema automatizado que actualiza diariamente una gráfica mostrando el número de posts y proyectos publicados mensualmente en mi blog."
pubDate: "2024-09-18"
heroImage: "/assets/images/proyectos/projects.github-actions.jpg"
badge: "Finalizado"
tags: ["GitHub Actions", "Python", "Node.js"]
---

## Automatización de Gráficas en un Blog con GitHub Actions

En este post, te explico cómo implementé un sistema automatizado para mi blog que actualiza diariamente una gráfica que muestra el número de posts y proyectos publicados mensualmente. Esta gráfica se genera y se actualiza automáticamente a través de **GitHub Actions**, aprovechando la infraestructura gratuita de GitHub para tareas automatizadas. La gráfica se enlaza en mi sitio web mediante una etiqueta `<img>`, y se basa en datos extraídos y actualizados también de manera automática y que se almacenan en un archivo JSON.

### ¿Qué estamos logrando?

Este sistema utiliza dos **GitHub Actions** programadas para ejecutarse todos los días a una hora determinada:

1. **Primer GitHub Action:** Ejecuta un archivo MJS que actualiza un archivo JSON con el conteo de posts y proyectos subidos mensualmente y que se almacena en el reopositorio de mi blog.
2. **Segundo GitHub Action:** Ejecuta un archivo de Python que genera una gráfica de barras basada en los datos del archivo JSON y la guarda como archivo de imágen PNG en un repositorio creado para este propósito.

### Primer GitHub Action: Actualizar el Archivo JSON

El objetivo de este primer **GitHub Action** es procesar los archivos Markdown de mis posts y proyectos, extrayendo la fecha de publicación para almacenar el número de publicaciones por mes en un archivo JSON.

Este archivo JSON es clave para generar la gráfica, y se actualiza todos los días con los cambios detectados. A continuación, te muestro el archivo de configuración de esta acción:

```yaml
name: Actualizar conteo de publicaciones por mes

# Definir cuándo se ejecutará la acción (cron expression para todos los días a las 11:00 UTC)
on:
  schedule:
    - cron: '0 11 * * *'  # Todos los días a las 11:00 UTC
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'Manually Trigger'
        type: choice
        options:
          - Manually Trigger
          - Add new post
          - Debug

# Definir los jobs
jobs:
  run-python-script:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      # Paso 1: Obtener el código del repositorio
      - name: Checkout repository
        uses: actions/checkout@v4

      # Paso 2: Configurar Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'  # Usar la última versión estable (LTS)

      # Paso 3: Instalar dependencias
      - name: Install dependencies
        run: |
          npm install

      # Paso 4: Ejecutar el script de conteo
      - name: Run countPostsByMonth script
        run: |
          node ./utils/countPostsByMonth.mjs

      # Paso 5: Commit y push si el archivo fue modificado
      - name: Commit and Push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add public/data/postsByMonth.json
          if git diff --cached --quiet; then
            echo "No changes to commit";
          else
            git commit -m "Updated postsByMonth.json"
            git push
          fi
```

### Explicación de los pasos

1. **Programación diaria:** La acción se ejecuta todos los días a las 11:00 UTC.
2. **Checkout del repositorio:** Descarga el código de mi blog y proyectos.
3. **Configuración de Node.js:** Usa la última versión LTS de Node.js.
4. **Instalación de dependencias:** Instala los módulos de Node.js necesarios para procesar los archivos.
5. **Ejecución del script:** El script `countPostsByMonth.mjs` analiza las publicaciones y proyectos, y actualiza el archivo `postsByMonth.json`.
6. **Commit y push:** Si el archivo JSON fue modificado, se hace un commit con los cambios y se sube al repositorio.

Este archivo JSON se encuentra en el repositorio de mi sitio web y es utilizado posteriormente para generar una gráfica.

### Segundo GitHub Action: Generación de la Gráfica

Una vez que los datos están actualizados en el archivo JSON, el segundo **GitHub Action** se encarga de generar una gráfica diaria basada en esos datos utilizando **Streamlit** y **Matplotlib**. La gráfica se guarda como un archivo PNG, que luego se sube al repositorio y se enlaza en mi web a través de una etiqueta `<img>`.

Aquí está el archivo de configuración del segundo **GitHub Action**:

```yaml
name: Ejecutar código Python diariamente

# Definir cuándo se ejecutará la acción (cron expression para todos los días a las 12:00 UTC)
on:
  schedule:
    - cron: '0 12 * * *'  # Todos los días a las 12:00 UTC
  workflow_dispatch:
    inputs:
      logLevel:
        description: 'Log level'
        required: true
        default: 'Manually Trigger'
        type: choice
        options:
          - Manually Trigger
          - Add new post
          - Debug

# Definir los jobs
jobs:
  run-python-script:
    runs-on: ubuntu-latest

    permissions:
      contents: write

    steps:
      # Paso 1: Checkout (obtener el código del repositorio)
      - name: Checkout repository
        uses: actions/checkout@v4

      # Paso 2: Configurar Python (versión 3.11)
      - name: Set up Python 3.11
        uses: actions/setup-python@v5
        with:
          python-version: 3.11

      # Paso 3: Instalar las dependencias
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install requests matplotlib streamlit

      # Paso 4: Ejecutar el script de Python
      - name: Run Python script
        run: |
          python ./app.py

      # Paso 5: Commit y push si la gráfica fue modificada
      - name: Commit and Push
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config --global user.name 'JTL - GitHub Actions'
          git config --global user.email 'jaterli@hotmail.com'          
          git add grap.png
          if git diff --cached --quiet; then
            echo "No changes to commit";
          else
            git commit -m "Updated graph"
            git push
          fi
        if: success()
```

### Explicación de los pasos

1. **Programación diaria:** La acción se ejecuta todos los días a las 12:00 UTC.
2. **Checkout del repositorio:** Descarga el código y los datos del repositorio.
3. **Configuración de Python:** Usa Python 3.11 para ejecutar el script.
4. **Instalación de dependencias:** Instala las librerías necesarias como `Streamlit`, `Matplotlib` y `Requests`.
5. **Ejecución del script de Python:** El script `app.py` lee el archivo JSON actualizado y genera una gráfica que se guarda como `grap.png`.
6. **Commit y push:** Si la gráfica fue modificada, se sube automáticamente al repositorio.

### ¿Cómo se Incrusta la Gráfica en el Blog?

El archivo `grap.png` generado por este proceso se encuentra en el repositorio de GitHub y se enlaza directamente en el HTML de mi web utilizando una etiqueta `<img>`:

```html
<img src="https://github.com/usuario/repositorio/path/to/grap.png" alt="Gráfica de publicaciones por mes">
```

Esto asegura que cada vez que la imagen se actualice, mi blog siempre mostrará la versión más reciente sin necesidad de intervención manual.

### Conclusión

Esta configuración me permite automatizar completamente la creación y actualización de una gráfica que muestra el número de posts y proyectos subidos a mi blog mensualmente. Usar **GitHub Actions** para este propósito me ahorra tiempo y esfuerzo, asegurando que siempre tenga la información más actualizada disponible en mi sitio web.

Esta solución es flexible y escalable, y puede adaptarse a otras tareas repetitivas donde se necesite procesar datos y generar visualizaciones automáticamente.