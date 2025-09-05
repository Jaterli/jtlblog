---
draft: false
title: "Despliegue en producción: Django + React + Nginx + Gunicorn"
description: "Cómo montar en producción una aplicación con Django (backend) y React (frontend con Vite), servida con Nginx y Gunicorn, en un servidor Linux."
pubDate: "2025-08-22"
heroImage: "/images/blog/blog.tutorial.jpg"
category: "Blog"
tags: [Tutorial, Linux, GitHub, Despliegue]
---


Este tutorial explica cómo montar en producción una aplicación con **Django (backend)** y **React (frontend con Vite)**, servida con **Nginx** y **Gunicorn**, en un servidor Linux (ej. Ubuntu en un VPS o droplet).

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

---

## 2️⃣ Clonar el proyecto

Clonar tu repo en el servidor:

```bash
cd ~
git clone https://github.com/tu-usuario/tu-repo.git nombre_proyecto
cd nombre_proyecto
```

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

Si funciona, crear servicio systemd:

```bash
sudo nano /etc/systemd/system/gunicorn.service
```

> Se puede sustituir gunicorn.service por nombre_proyecto.service

Contenido:

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
sudo systemctl enable gunicorn
sudo systemctl start gunicorn
sudo systemctl status gunicorn
```

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
sudo systemctl restart gunicorn

# Frontend
cd ~/nombre_proyecto/react-frontend
git pull origin main
yarn install
rm -rf dist
yarn build
sudo systemctl reload nginx
```

---

## ✅ Conclusión

Con esta configuración:

* **Gunicorn** ejecuta Django en segundo plano.
* **Nginx** actúa como proxy inverso, sirviendo tanto el backend como el frontend.
* **React** se sirve desde `dist/` como SPA.
* **Certbot** garantiza HTTPS.

