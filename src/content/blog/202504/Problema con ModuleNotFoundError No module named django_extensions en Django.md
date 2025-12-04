---
draft: false
title: "Problema con ModuleNotFoundError: No module named 'django_extensions' en Django"
description: "Cómo conseguí solucionar este error de forma rápida y sencilla."
pubDate: "2025-04-08"
heroImage: "/images/blog/blog.error.jpg"
category: "Solución de errores"
tags: [Progreso, Django, Python, Solución de Errores]
---


Al trabajar con Django y añadir `django-extensions` a `INSTALLED_APPS`, puede surgir el siguiente error al ejecutar el servidor, migraciones o pruebas:

```bash
ModuleNotFoundError: No module named 'django_extensions'
```

### ¿Cuál es la causa?

Este error generalmente significa que **`django-extensions` no está instalado en el entorno de Python** que está ejecutando tu proyecto Django.

Esto suele pasar cuando:

- Estás usando un entorno virtual y no está activado.
- Estás usando una configuración remota (como Docker o entornos virtuales en VS Code) y el entorno del sistema no coincide con el entorno de ejecución de Django.
- Estás ejecutando `pytest` o `manage.py` de forma directa sin usar el Python adecuado.

---

### Soluciones posibles

#### 1. Instalar usando `python -m pip install`

Esto asegura que instalas el paquete en el **entorno de Python exacto que estás usando** para correr Django.

```bash
python -m pip install django-extensions
```

Luego verifica que se haya instalado correctamente:

```bash
python -c "import django_extensions"
```

Si no hay errores, ¡estás listo!

> **Esta es la solución que me ha funcionado personalmente.**

---

#### 2. Usar `python -m pytest` en lugar de `pytest`

Cuando ejecutas pruebas, puede pasar que:

```bash
pytest  # ❌ Falla con ModuleNotFoundError
python -m pytest  # ✅ Funciona correctamente
```

Esto ocurre porque el comando `pytest` puede no estar vinculado al entorno virtual, mientras que `python -m pytest` sí lo está.

---

### Recomendaciones

- Usa siempre `python -m pip`, `python -m pytest` y `python manage.py` para evitar conflictos de entornos.
- Comprueba qué Python estás usando con:

```bash
which python
python -c "import sys; print(sys.executable)"
```

- Si trabajas con VS Code, asegúrate de que el entorno virtual esté seleccionado en la parte inferior izquierda o en la configuración del proyecto.


