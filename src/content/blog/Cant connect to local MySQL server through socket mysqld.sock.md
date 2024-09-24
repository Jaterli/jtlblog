---
draft: false
title: "Error: Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'"
description: "Este documento recopila todas las posibles soluciones a este error que pueden ocurrir al trabajar con Django y MySQL."
pubDate: "2024-09-24"
heroImage: "/assets/images/blog/blog.error.jpg"
category: "Frameworks"
tags: [blog, MySQL, Frameworks, Django]
---


Este artículo recopila todas o gran parte de las posibles soluciones al error **"Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'"** que pueden ocurrir al trabajar con Django y MySQL.  
<u>Las últimas dos soluciones mencionadas al final fueron las que resolvieron personalmente el problema en mi caso</u>.

### Pasos previos necesarios

Antes de comenzar con las soluciones, asegúrate de que tu proyecto de Django esté correctamente configurado para utilizar MySQL como base de datos:

1. **Instalar el conector MySQL para Python** (`mysqlclient`) en tu entorno virtual:
    ```bash
    pip install mysqlclient
    ```
2. **Configurar el archivo `settings.py`** de Django con los datos de tu base de datos MySQL.
3. **Asegúrate de que el servidor MySQL esté corriendo** correctamente.
4. **Ejecuta los comandos de migración** (`makemigrations`, `migrate`) dentro del entorno virtual para verificar la conexión.

Es al ejecutar el punto 4 donde generalmente puede aparecer el error de conexión con MySQL.

---

## Soluciones para el Error

Te recomiendo hacer las siguientes comprobaciones de forma ordenada y, después de cada una, ejecutar el comando `python manage.py migrate` dentro de tu entorno virtual para ver si se resuelve el error.

### **1. Verificación del servicio MySQL**

Verifica si el servicio MySQL está en ejecución. Si no está corriendo, intenta iniciarlo o reiniciarlo:

```bash
sudo service mysql start
sudo service mysql restart
```

Si tu sistema utiliza `systemd`:

```bash
sudo systemctl status mysql
sudo systemctl start mysql
sudo systemctl restart mysql
```

---

### **2. Cambiar `localhost` por `127.0.0.1` en la configuración de Django**

Al configurar Django para usar MySQL, es recomendable especificar `127.0.0.1` en lugar de `localhost` en el archivo `settings.py`, ya que esto evita problemas relacionados con el socket.

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nombre_de_tu_base_de_datos',
        'USER': 'tu_usuario',
        'PASSWORD': 'tu_contraseña',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

---

### **3. Desactivar el alias de Python**

A veces, un alias de Python puede sobrescribir el binario de Python en tu entorno virtual, lo que puede provocar conflictos al ejecutar comandos de Django. Desactiva el alias de Python:

```bash
unalias python
```

Luego, asegúrate de que el binario de Python apunte a tu entorno virtual:

```bash
which python
```

---

### **4. Verificar el archivo de configuración `my.cnf` o `mysqld.cnf`**

Asegúrate de que el archivo de configuración de MySQL tenga la configuración adecuada para el socket. Abre y revisa el archivo:

```bash
sudo nano /etc/mysql/my.cnf
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Busca la línea que haga referencia a:

```ini
socket = /var/run/mysqld/mysqld.sock
```

Verifica que el directorio exista y que sea accesible.

---

### **5. Reparar los permisos del socket**

Asegúrate de que el socket tenga los permisos adecuados:

```bash
sudo chmod 777 /var/run/mysqld/mysqld.sock
```

---

### **6. Crear el archivo de socket manualmente**

Si el archivo del socket no existe, crea el directorio y ajusta los permisos correspondientes:

```bash
sudo mkdir -p /var/run/mysqld
sudo chown mysql:mysql /var/run/mysqld
```

Luego, reinicia el servicio MySQL:

```bash
sudo systemctl restart mysql
```

---

### **7. Reinstalar MySQL (si es necesario)**

Si ninguna de las soluciones anteriores funciona, puedes intentar reinstalar MySQL:

- Desinstala MySQL completamente:
    ```bash
    sudo apt-get remove --purge mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
    sudo apt-get autoremove
    sudo apt-get autoclean
    ```

- Luego, vuelve a instalar MySQL:
    ```bash
    sudo apt-get install mysql-server mysql-client
    ```

---

### **8. Comprobar los permisos del socket y directorios**

Verifica que el directorio y el archivo del socket tengan los permisos correctos:

```bash
sudo chown mysql:mysql /var/run/mysqld/mysqld.sock
```

---

### **9. Verificar que MySQL esté configurado para escuchar en el socket**

Asegúrate de que MySQL esté configurado para usar el socket `/var/run/mysqld/mysqld.sock`. Si no lo está, ajusta el archivo de configuración de MySQL.

---

## **Conclusión**

Después de probar múltiples soluciones, las que finalmente resolvieron mi problema de conexión con MySQL fueron:  
**Desactivar el alias de Python** y **Cambiar `localhost` por `127.0.0.1` en la configuración de Django**.
```