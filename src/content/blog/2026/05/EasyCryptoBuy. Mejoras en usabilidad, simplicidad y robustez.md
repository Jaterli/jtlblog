---
draft: false
title: "EasyCryptoBuy: Mejoras en usabilidad, simplicidad y robustez"
description: "Atendiendo a un requisito académico, fui más allá: añadí categorías, imágenes y búsqueda de productos; simplifiqué el carrito con localStorage; e hice el sistema de pagos y listener blockchain más resilientes y seguros."
pubDate: "2026-05-25"
heroImage: "/images/blog/blog.easycryptobuy_v2.webp"
category: "Desarrollo Web"
tags: [Django, React, Blockchain, Web3, UX, localStorage, Mejora Continua]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "EasyCryptoBuy: Mejoras en usabilidad, simplicidad y robustez",
      "description": "Atendiendo a un requisito académico, fui más allá: añadí categorías, imágenes y búsqueda de productos; simplifiqué el carrito con localStorage; e hice el sistema de pagos y listener blockchain más resilientes y seguros.",
      "author": {
        "@type": "Person",
        "name": "Jaterli"
      },
      "datePublished": "2026-05-25T00:00:00+01:00",
      "image": "https://jaterli.com/images/blog/blog.easycryptobuy_v2.webp",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2026/05/easycryptobuy-mejoras-usabilidad-simplicidad-robustez"
      }
    }
  ]
---

## Introducción

**EasyCryptoBuy** es un proyecto personal que desarrollé para profundizar mis conocimientos en tecnologías Web3 y desarrollo full stack. La plataforma permite realizar compras con criptomonedas (ETH, USDT, USDC, LINK) directamente desde la wallet del usuario, combinando React en el frontend, Django REST Framework en el backend y smart contracts en Solidity.

Posteriormente, adapté este proyecto para presentarlo como trabajo final de dos másteres: el **Máster en Desarrollo Web Full Stack** y el **Máster en Desarrollo Blockchain**. Para el módulo de Django, mi profesor me solicitó añadir un campo para **categorizar productos**, un requisito fundamental del proyecto. Aunque la tarea era sencilla, decidí aprovechar la oportunidad para revisar toda la aplicación y mejorarla en varios frentes, siempre pensando en la **experiencia de usuario**, la **simplicidad del código** y la **robustez del sistema**.

---

## Lo que se pedía: categorizar productos

Añadí el campo `category` al modelo `Product` en Django. Cumplí el requisito. Pero no me quedé ahí.

## Lo que añadí además: imagen y búsqueda

**Campo `image`**: Cada producto ahora puede tener una imagen. El catálogo pasó de ser una lista de texto a una cuadrícula visual donde los productos se reconocen de un vistazo.

**Búsqueda por texto**: Implementé un campo de búsqueda que filtra productos por nombre o descripción. En combinación con el selector de categorías, el usuario encuentra lo que necesita en segundos.

> **Resultado**: La tienda pasó de ser funcional a ser realmente usable. El usuario ya no tiene que leer línea por línea; hojea, busca, filtra y compra.

---

## Simplificación radical: el carrito ahora vive solo en localStorage

El carrito original se guardaba en localStorage y luego se sincronizaba con el backend. Esto generaba redundancia: los mismos productos vivían en el carrito y, al procesar el pago, se duplicaban como OrderItems en la base de datos. Información repetida, complejidad innecesaria.

**Decidí eliminar por completo los modelos `Cart` y `CartItems` del backend.** Ahora el carrito vive ÚNICAMENTE en `localStorage` y se envía al backend solo en el momento del pago, donde se transforma directamente en OrderItems.

**Ventajas**:
- **Cero redundancia**: Los datos no se duplican entre carrito y órdenes.
- **Código mucho más simple**: Menos modelos, menos vistas, menos serializadores.
- **Persistencia real**: El carrito se mantiene aunque el usuario cierre el navegador, sin necesidad de estar autenticado.
- **Sin sincronización compleja**: Lo que ves es lo que hay, sin llamadas asíncronas.

Además, desde el resumen del carrito, el usuario puede **aumentar o disminuir la cantidad** de cada producto con botones `+` y `-`, y ver en tiempo real el **stock disponible**. La experiencia de usuario mejoró drásticamente.

---

## Sistema de pagos y listener blockchain: más robustos y seguros

Ya había mejorado el listener en una versión anterior (puedes leer el post completo [aquí](/blog/posts/2025/05/evolucion-del-listener-de-pagos-blockchain)), pero esta vez fui un paso más allá, modificando tanto el flujo de pagos como el listener.

### El problema original

El flujo de pago anterior registraba la transacción en el backend **en el momento en que el usuario firmaba en su wallet**. Esto creaba un problema: el usuario podía iniciar el pago, su wallet le pedía firmar, y justo en ese momento podía ocurrir un fallo (cerrar el navegador, perder conexión, caída del servicio). Si luego el usuario firmaba la transacción en su wallet (porque la solicitud quedó pendiente), el pago se confirmaba en blockchain, pero **nunca se había registrado en el backend**. El resultado: un pago confirmado on-chain que el sistema desconocía. No había forma de recuperarlo.

### La solución en el sistema de pagos

Ahora la transacción se registra en el backend **justo al iniciar el pago, antes de que la wallet le pida firmar al usuario**. De esta forma, aunque el usuario cierre la app o haya un fallo del servicio, la transacción ya quedó registrada. 

Además, si el usuario permanece en la página y decide **no firmar** la transacción, el sistema revierte automáticamente: elimina la transacción pendiente sin perder los items del carrito y sin afectar al stock de productos.

### El papel del listener

Con esta nueva lógica, pueden quedar transacciones registradas en el backend pero con estado "pendiente" porque el usuario aún no ha firmado o porque la confirmación en blockchain está en curso. 

El listener actualizado, gracias a `check_pending_transactions()`, verifica periódicamente estas transacciones pendientes, consulta su estado real en la blockchain y las actualiza como "confirmadas" o "fallidas" según corresponda. De esta manera, ninguna transacción queda huérfana.

## Cambios arquitectónicos en el listener

Comparando el listener anterior con el actual, las mejoras son significativas:

**1. Separación radical de responsabilidades**
- **Listener anterior**: Hacía todo. Confirmaba la transacción, buscaba el carrito, creaba OrderItems, actualizaba el stock de productos, desactivaba el carrito y limpiaba sus items. Era un monolito que mezclaba la escucha de eventos con toda la lógica de negocio.
- **Listener actual**: SOLO confirma transacciones. Actualiza el hash real de blockchain, marca la transacción como confirmada y nada más. La lógica pesada (crear órdenes, actualizar stock, desactivar carrito) se ejecuta ANTES de enviar la transacción, desde el servicio de pagos.

**2. Recuperación de transacciones perdidas**
- **Listener anterior**: No tenía ningún mecanismo para recuperar transacciones que se hubieran confirmado mientras el listener estaba offline. Si el servicio se caía, los eventos se perdían para siempre.
- **Listener actual**: Implementa `check_pending_transactions()`, que al iniciar verifica todas las transacciones pendientes con hash real, consulta su estado en blockchain y las actualiza como confirmadas. Esto garantiza que ninguna transacción quede huérfana.

**3. Eliminación de lógica de negocio**
- **Listener anterior**: Importaba y utilizaba los modelos `Cart`, `OrderItem`, y toda la lógica de creación de órdenes y actualización de stock.
- **Listener actual**: Solo importa `Transaction`. El resto de la lógica ha sido eliminada por completo. El listener es más liviano, más rápido y mucho más fácil de mantener.

**4. Mayor resiliencia**
- **Listener anterior**: Si fallaba durante el procesamiento de un evento (por ejemplo, al actualizar el stock), la transacción podía quedar en un estado inconsistente.
- **Listener actual**: Al no manejar lógica de negocio, el riesgo de inconsistencia es mínimo. Si el listener falla, `check_pending_transactions()` lo recupera en el próximo inicio.

---

**En resumen**: El listener anterior era un monolito que hacía todo, pero era frágil y perdía eventos. El listener actual es liviano, robusto y resiliente. Solo confirma transacciones, delega la lógica pesada al momento del pago, y gracias a `check_pending_transactions()` puede recuperar eventos perdidos tras una caída del servicio.


### Resultado

- **Sin estados inconsistentes**: Si una transacción falla en blockchain, el sistema ni siquiera ha creado órdenes ni modificado stock.
- **Más robusto**: Si el listener se cae, el sistema de verificación periódica lo recupera.
- **Más seguro**: El sistema es resiliente ante cierres del navegador o fallos de conexión.
- **Recuperación completa**: Ninguna transacción confirmada en blockchain queda sin registrar en la aplicación.

---

## Conclusión

Un requisito académico simple (un campo `category`) se convirtió en una oportunidad para mejorar otras partes de la aplicación.

**En resumen**:
- Añadí **categorías, imágenes y búsqueda** → El catálogo es usable y visual.
- Eliminé el carrito del backend y lo moví a **localStorage** → Cero redundancia, código más simple, experiencia instantánea.
- Rediseñé el **flujo de pagos y el listener** → Sistema más robusto y seguro, con recuperación ante fallos y sin transacciones huérfanas.

Este ejercicio demuestra mi capacidad para **no limitarme a cumplir lo que me piden**, sino para **ir más allá**, mejorando la experiencia de usuario, simplificando el código y haciendo el sistema más fiable. Cada mejora nació de preguntarme: *"¿cómo haría esto si fuera para un cliente real?"*.