---
draft: false
title: "De localStorage a Cookies HttpOnly"
description: "Cómo migré de tokens en localStorage a cookies HttpOnly en mi aplicación Angular + Go, y por qué es crucial para aplicaciones educativas públicas."
pubDate: "2026-01-22"
heroImage: "/images/blog/blog.cyber-security.jpg"
category: "Tecnología"
tags: [ Seguridad, Cyberseguridad, Angular, Go, Desarrollo Web, Best Practices ]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "De localStorage a Cookies HttpOnly: Mejorando la Seguridad en Angotest",
      "description": "Cómo migré de tokens en localStorage a cookies HttpOnly en mi aplicación Angular + Go, y por qué es crucial para aplicaciones educativas públicas.",
      "author": {
        "@type": "Person",
        "name": "Jaterli"
      },
      "datePublished": "2026-01-22T00:00:00+01:00",
      "image": "https://jaterli.com/images/blog/blog.cyber-security.jpg",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2025/01/mejorando-seguridad-angotest-cookies-httponly"
      }
    }
  ]
---

**Introducción**

Cuando comencé a desarrollar Angotest - una plataforma de tests online con comparativas entre usuarios - mi enfoque inicial fue la funcionalidad. Usé localStorage para guardar tokens JWT porque era rápido y sencillo. Pero cuando decidí lanzarla al público para academias e institutos, una pregunta me perseguía: "¿Está realmente segura?"

La respuesta era clara: no lo suficiente. Hoy comparto cómo migré de localStorage a cookies HttpOnly y por qué esta decisión es esencial para cualquier aplicación que maneje datos sensibles.

---

## El problema: localStorage y sus riesgos

### Lo que hacía antes:

```typescript
// auth.service.ts (versión antigua)
private readonly TOKEN_KEY = 'angotest_token';

private setAuthState(data: AuthResponse): void {
  // ❌ Token accesible por JavaScript
  localStorage.setItem(this.TOKEN_KEY, data.token);
  this.tokenSignal.set(data.token);
}
```

### Los riesgos:
1. **Vulnerable a XSS**: Cualquier script malicioso podía leer el token
2. **Visible en DevTools**: Cualquier usuario podía ver el token
3. **No se envía automáticamente**: Cada petición requería configurar headers manualmente
4. **Sin protección CSRF**: Fácil de explotar en ciertos escenarios

Para una aplicación educativa que maneja resultados de tests y datos personales de estudiantes, estos riesgos eran inaceptables.

---

## La solución: Cookies HttpOnly

### ¿Por qué cookies HttpOnly?

1. **Inaccesibles a JavaScript**: El navegador las maneja automáticamente
2. **Protección contra XSS**: Aunque hay vulnerabilidades, el token no es legible
3. **Envío automático**: Se incluyen en cada petición sin código adicional
4. **SameSite atributo**: Protege contra CSRF
5. **Más seguro en general**: Menos superficie de ataque

### Implementación en el Backend (Go):

```go
// controllers/auth.go - Versión mejorada
func Login(c *gin.Context) {
    // ... validación de usuario ...
    
    // Configurar cookie HttpOnly
    c.SetSameSite(http.SameSiteStrictMode)
    c.SetCookie(
        "auth_token",          // nombre
        signed,                // valor del token
        24*60*60,             // expiración (24h)
        "/",                  // path
        "",                   // dominio
        isProduction,         // secure (true en prod)
        true,                 // httpOnly (CRUCIAL)
    )
    
    // Ya no enviamos el token en la respuesta JSON
    c.JSON(http.StatusOK, gin.H{"user": userResponse})
}
```

### Cambios en el Frontend (Angular):

```typescript
// auth.service.ts - Versión mejorada
login(email: string, password: string): Observable<any> {
  return this.http.post<{ user: User }>(
    `${this.API_URL}/login`, 
    { email, password },
    { withCredentials: true } // ¡Magia! Envía/recibe cookies automáticamente
  )
}
```

---

## Las mejoras clave implementadas

### 1. Eliminación del token del localStorage
- ❌ **Antes**: `localStorage.setItem('token', jwt)`
- ✅ **Ahora**: Cookie HttpOnly gestionada por el navegador

### 2. Middleware actualizado
```go
// Lee de cookie primero, header como fallback
tokenStr, err := c.Cookie("auth_token")
if err != nil {
    // Fallback a Authorization header
    authHeader := c.GetHeader("Authorization")
    // ... procesar header
}
```

### 3. Verificación continua de autenticación
```typescript
// Verificación periódica con el backend
private async checkAuthStatus(): Promise<void> {
  const response = await this.http.get(
    `${this.API_URL}/check-auth`,
    { withCredentials: true }
  )
  // Actualiza estado según respuesta del servidor
}
```

### 4. Gestión automática de sesiones
- Las cookies se envían automáticamente
- El logout limpia la cookie en el servidor
- SameSite protege contra CSRF

---

## ¿Por qué esto es crucial para Angotest?

### Contexto de la aplicación:
- **Tests educativos**: Resultados sensibles
- **Comparativas entre usuarios**: Datos personales involucrados
- **Gestión por administradores**: Acceso privilegiado
- **Uso en instituciones**: Responsabilidad legal

### Riesgos mitigados:
1. **Robo de sesiones**: XSS ya no puede extraer tokens
2. **Acceso no autorizado**: Las cookies HttpOnly son más difíciles de explotar
3. **Ataques CSRF**: SameSite cookies proporcionan protección
4. **Exposición accidental**: No más tokens visibles en DevTools

---

## Lo que aprendí en el proceso

### 1. La simplicidad inicial no siempre es mejor
- localStorage parece más simple, pero es menos seguro
- Cookies HttpOnly requieren más configuración inicial, pero menos código de mantenimiento

### 2. La compatibilidad es importante
- Mantener soporte para Authorization header como fallback
- No romper clientes existentes durante la migración

### 3. La seguridad debe evolucionar con la aplicación
- Lo aceptable para un prototipo no lo es para producción
- Cada nueva característica requiere reevaluar la seguridad

### 4. Documentar los cambios es crucial
- Para el equipo
- Para futuros mantenimientos
- Para casos de auditoría

---

## Recomendaciones para otros desarrolladores

### Si estás empezando:
- Usa cookies HttpOnly desde el principio
- Configura SameSite adecuadamente
- Considera HTTPS desde el desarrollo

### Si migras una app existente:
1. **Implementa gradualmente**: Soporta ambos métodos temporalmente
2. **Comunica los cambios**: A usuarios y administradores
3. **Monitorea**: Busca errores o comportamientos inesperados
4. **Documenta**: Explica por qué y cómo se hizo el cambio

### Para aplicaciones educativas como Angotest:
- **Prioriza seguridad sobre conveniencia**
- **Considera regulaciones**: GDPR, protección de datos estudiantiles
- **Implementa logging**: Para auditoría y detección de anomalías
- **Educa a los usuarios**: Sobre buenas prácticas de seguridad

---

## Conclusión

Migrar de localStorage a cookies HttpOnly en Angotest no fue solo un cambio técnico. Fue un compromiso con la seguridad de los datos de estudiantes, profesores y administradores.

**La lección más importante:** La seguridad no es un feature que se añade al final. Es una mentalidad que debe guiar cada decisión técnica, especialmente cuando tu aplicación crece de un prototipo privado a una plataforma pública.

En el mundo de las aplicaciones educativas, donde manejamos datos sensibles y confiamos en la integridad de los resultados, invertir en seguridad no es opcional. Es nuestra responsabilidad como desarrolladores.
