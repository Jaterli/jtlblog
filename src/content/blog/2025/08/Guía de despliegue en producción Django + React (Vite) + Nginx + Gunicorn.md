---
draft: false
title: "Despliegue en producción: Django + React + Nginx + Gunicorn"
description: "Cómo montar en producción una aplicación con Django (backend) y React (frontend con Vite), servida con Nginx y Gunicorn, en un servidor Linux."
pubDate: "2025-08-22"
heroImage: "/images/blog/blog.tutorial.jpg"
category: "Blog"
tags: [Tutoriales, Linux, GitHub, Despliegue]

---
He creado este tutorial para explicar cómo montar en producción una aplicación con **Django (backend)** y **React (frontend con Vite)**, servida con **Nginx** y **Gunicorn**, en un servidor Linux (ej. Ubuntu en un VPS o droplet).

---

## 1️⃣ Preparar el servidor

Actualizar paquetes:

```bash
sudo apt update && sudo apt upgrade -y
```

Instalar dependencias:

```bash
sudo apt install python3 python3-venv python3-pip git nginx curl -y
```

💡 *Esto asegura que tienes Python, Git, Nginx y todas las herramientas necesarias para correr Django y React en el servidor.*

---

## 2️⃣ Clonar el proyecto

Clonar tu repo en el servidor:

```bash
cd ~
git clone https://github.com/tu-usuario/tu-repo.git nombre_proyecto
cd nombre_proyecto
```

💡 *Así tendrás en el servidor el mismo código que trabajas en tu ordenador.*

---

## 3️⃣ Configurar Django (Backend)

Entrar en la carpeta del backend:

```bash
cd django-backend
```

Crear y activar entorno virtual:

```bash
python3 -m venv env
source env/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Migraciones y collectstatic:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
```

💡 *`collectstatic` copia todos los archivos estáticos de tus apps (CSS, JS, imágenes) en la carpeta `staticfiles/`, que será servida por Nginx. En desarrollo no se nota, pero en producción es clave.*

Configurar **settings.py** para producción:

```python
DEBUG = False
ALLOWED_HOSTS = ["tu-dominio.com"]

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
```

---

## 4️⃣ Configurar Gunicorn

Probar Gunicorn:

```bash
gunicorn config.wsgi:application --bind 127.0.0.1:8000
```

💡 *Gunicorn es el servidor de aplicaciones que ejecuta tu código Django. Nginx no ejecuta Python, solo pasa las peticiones a Gunicorn.*

Si funciona, crear servicio systemd:

```bash
sudo nano /etc/systemd/system/nombre_proyecto.service
```

> **Nota:** por defecto podría llamarse `gunicorn.service`, pero si tienes varios proyectos en el mismo servidor conviene diferenciar. Ejemplo: `translator_management.service`, `blog.service`, etc.

Contenido de ejemplo:

```ini
[Unit]
Description=Gunicorn Daemon for Django Project
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/home/usuario/nombre_proyecto/django-backend
ExecStart=/home/usuario/nombre_proyecto/django-backend/env/bin/gunicorn --access-logfile - --workers 3 --bind 127.0.0.1:8000 config.wsgi:application

[Install]
WantedBy=multi-user.target
```

Recargar y habilitar:

```bash
sudo systemctl daemon-reload
sudo systemctl enable nombre_proyecto
sudo systemctl start nombre_proyecto
sudo systemctl status nombre_proyecto
```

💡 *Con `systemctl` tu proyecto se mantiene corriendo en segundo plano y se reinicia automáticamente si se cae o si reinicias el servidor.*

---

## 5️⃣ Configurar React (Frontend)

Entrar al frontend:

```bash
cd ../react-frontend
```

Instalar dependencias:

```bash
yarn install
```

Construir la aplicación:

```bash
yarn build
```

Esto genera la carpeta `dist/`.

💡 *En producción no ejecutas React como servidor de desarrollo. Lo que haces es compilarlo a HTML, JS y CSS estáticos que servirá Nginx.*

---

## 6️⃣ Configurar Nginx

Abrir config:

```bash
sudo nano /etc/nginx/sites-available/nombre_proyecto
```

Ejemplo de configuración:

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    # === Backend (Django API en Gunicorn) ===
    location /api/        { include proxy_params; proxy_pass http://127.0.0.1:8000/; }
    location /admin/      { include proxy_params; proxy_pass http://127.0.0.1:8000/; }

    # === Archivos estáticos y media (Django) ===
    location /static/ {
        alias /home/usuario/nombre_proyecto/django-backend/staticfiles/;
    }
    location /media/ {
        alias /home/usuario/nombre_proyecto/django-backend/media/;
    }

    # === Frontend (React SPA) ===
    root /home/usuario/nombre_proyecto/react-frontend/dist;
    index index.html;
    location / {
        try_files $uri /index.html;
    }

    # Tamaño máximo de subida
    client_max_body_size 20M;

    access_log /var/log/nginx/nombre_proyecto_access.log;
    error_log /var/log/nginx/nombre_proyecto_error.log;
}
```

Activar config:

```bash
sudo ln -s /etc/nginx/sites-available/nombre_proyecto /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

💡 *Nginx actúa como “puerta de entrada”: redirige peticiones a Gunicorn cuando van al backend (`/api/` o `/admin/`), y sirve directamente los archivos estáticos de Django y React.*

---

## 7️⃣ Certificado SSL con Let’s Encrypt

Instalar Certbot:

```bash
sudo apt install certbot python3-certbot-nginx -y
```

Configurar HTTPS:

```bash
sudo certbot --nginx -d tu-dominio.com
```

💡 *Let’s Encrypt emite certificados SSL gratuitos y Certbot se encarga de renovarlos automáticamente.*

---

## 8️⃣ Flujo de Deploy

Cada vez que quieras actualizar:

```bash
# Backend
cd ~/nombre_proyecto/django-backend
source env/bin/activate
git pull origin main
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart nombre_proyecto

# Frontend
cd ~/nombre_proyecto/react-frontend
git pull origin main
yarn install
rm -rf dist
yarn build
sudo systemctl reload nginx
```

---

## 9️⃣ Aplicar cambios y sincronizar con GitHub

Cuando hagas cambios en tu proyecto, el flujo depende de **dónde hiciste los cambios**:

* **Si los cambios fueron en local (tu ordenador):**

  1. Confirma y sube los cambios a GitHub:

     ```bash
     git add .
     git commit -m "Actualización"
     git push origin main
     ```
  2. En el servidor de producción, actualiza el repo:

     ```bash
     cd ~/nombre_proyecto
     git pull origin main
     ```

* **Si los cambios fueron directamente en el servidor de producción:**

  1. Confirma los cambios en el servidor:

     ```bash
     git add .
     git commit -m "Hotfix en producción"
     git push origin main
     ```
  2. En tu ordenador, ejecuta un `git pull origin main` para sincronizar tu copia local.

💡 *Así nunca pierdes cambios y mantienes tu código sincronizado entre local, servidor y GitHub.*

---

### Regenerar estáticos y reiniciar servicio (cuando cambias Django)

Después de actualizar el código:

```bash
# 1. Parar servicio
sudo systemctl stop nombre_proyecto

# 2. Limpiar staticfiles
cd /home/usuario/nombre_proyecto/django-backend
rm -rf staticfiles/

# 3. Regenerar staticfiles
source env/bin/activate
python manage.py collectstatic --noinput --clear

# 4. Recargar demonio y reiniciar servicio
sudo systemctl daemon-reload
sudo systemctl start nombre_proyecto

# 5. Verificar
sudo systemctl status nombre_proyecto
```

💡 *Este paso asegura que los cambios en CSS, JS o imágenes se sirvan correctamente y no se mezclen con archivos antiguos.*

---

## ✅ Conclusión

Con esta configuración:

* **Gunicorn** ejecuta Django en segundo plano.
* **Nginx** actúa como proxy inverso, sirviendo tanto el backend como el frontend.
* **React** se sirve desde `dist/` como SPA.
* **Certbot** garantiza HTTPS.
* Con **GitHub + systemd** tienes un flujo claro para desplegar y mantener actualizado tu proyecto.

