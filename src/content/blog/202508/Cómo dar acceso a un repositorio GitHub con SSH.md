---
draft: false
title: "Cómo dar acceso a un repositorio GitHub con SSH"
description: "Configura el acceso SSH a GitHub para operar con tus repositorios de forma segura y sin introducir credenciales constantemente."
pubDate: "2025-08-22"
heroImage: "/images/blog/blog.github+ssh.avif"
category: "Blog"
tags: [Tutorial, GitHub, Git]
---


## 📋 Prerrequisitos
- Tener una cuenta en GitHub
- Acceso a una terminal Linux/macOS
- Git instalado (`sudo apt install git` en Ubuntu)

---

## 🚀 1. Generar clave SSH

### Opción A: Ed25519 (Recomendada)
```bash
ssh-keygen -t ed25519 -C "tu.email@github.com"
```

### Opción B: RSA (Alternativa)
```bash
ssh-keygen -t rsa -b 4096 -C "tu.email@github.com"
```

### Durante la generación:
- **File location**: Presiona Enter para la ruta por defecto (`~/.ssh/id_ed25519`)
- **Passphrase**: Opcional (recomendado para seguridad)

---

## 🔐 2. Configurar permisos correctos

```bash
# Crear directorio .ssh si no existe
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Configurar permisos de las claves
chmod 600 ~/.ssh/id_ed25519      # Clave privada (solo lectura para usuario)
chmod 644 ~/.ssh/id_ed25519.pub  # Clave pública (lectura para todos)
```

---

## 🔑 3. Agregar clave al agente SSH

```bash
# Iniciar el agente SSH
eval "$(ssh-agent -s)"

# Agregar clave privada al agente
ssh-add ~/.ssh/id_ed25519
```

**Para agregar automáticamente al iniciar sesión**, edita `~/.ssh/config`:
```bash
# Crear o editar config
nano ~/.ssh/config
```

Agrega:
```config
Host *
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_ed25519
```

---

## 📋 4. Obtener clave pública

```bash
# Mostrar clave pública
cat ~/.ssh/id_ed25519.pub

# Copiar al portapapeles (Ubuntu)
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# Alternativa para macOS
cat ~/.ssh/id_ed25519.pub | pbcopy
```

La clave debe verse así:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... tu.email@github.com
```

---

## 🌐 5. Agregar clave a GitHub

1. **Ir a GitHub Settings**
   - Click en tu foto de perfil → **Settings**
   - En el menú lateral: **SSH and GPG keys**

2. **Agregar nueva clave**
   - Click en **New SSH key**
   - **Title**: Identificador descriptivo (ej: "Laptop Ubuntu")
   - **Key Type**: Dejar como "Authentication Key"
   - **Key**: Pegar la clave pública completa

3. **Confirmar**
   - Click en **Add SSH key**
   - Confirmar con tu contraseña de GitHub si es necesario

---

## 🔗 6. Configurar repositorio con SSH

### Para repositorio nuevo:
```bash
# Clonar usando SSH
git clone git@github.com:usuario/repositorio.git
```

### Para repositorio existente (cambiar de HTTPS a SSH):
```bash
# Ver remote actual
git remote -v

# Cambiar a SSH
git remote set-url origin git@github.com:usuario/repositorio.git

# Verificar cambio
git remote -v
```

---

## ✅ 7. Verificar conexión

```bash
# Test de conexión SSH
ssh -T git@github.com

# Deberías ver:
# Hi usuario! You've successfully authenticated, but GitHub does not provide shell access.
```

---

## 🛠️ 8. Solución de problemas

### Error: "Permission denied (publickey)"
```bash
# Verificar que el agente está corriendo
eval "$(ssh-agent -s)"

# Verificar clave agregada
ssh-add -l

# Debuggear conexión
ssh -vT git@github.com
```

### Múltiples claves SSH
Si tienes varias claves, configura `~/.ssh/config`:
```config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519
  IdentitiesOnly yes
```

### Regenerar clave si es necesario
```bash
# Borrar clave vieja
rm ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub

# Regenerar
ssh-keygen -t ed25519 -C "tu.email@github.com"
```

---

## 🔒 9. Buenas prácticas de seguridad

- ✅ Usar passphrase para las claves
- ✅ Usar claves Ed25519 (más seguras)
- ✅ Rotar claves periódicamente
- ✅ Usar diferentes claves para diferentes servicios
- ✅ Nunca compartir la clave privada

---

## 📝 10. Comandos útiles

```bash
# Listar claves agregadas al agente
ssh-add -l

# Eliminar todas las claves del agente
ssh-add -D

# Ver fingerprint de clave pública
ssh-keygen -lf ~/.ssh/id_ed25519.pub

# Copiar clave a servidor remoto (para acceder a otros servidores)
ssh-copy-id -i ~/.ssh/id_ed25519.pub usuario@servidor
```

---

## 🎯 ¡Listo!
Ahora puedes hacer push/pull sin necesidad de introducir credenciales cada vez:

```bash
git push origin main
git pull origin main
```

La autenticación SSH es más segura y conveniente que el uso de tokens o contraseñas.