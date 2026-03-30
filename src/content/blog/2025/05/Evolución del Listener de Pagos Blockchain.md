---
draft: false
title: "Evolución del Listener de Pagos Blockchain"
description: "Sistema de seguridad mejorado que asegura que ningún pago se pierda, incluso si el usuario abandona la página antes de que la transacción se confirme en la blockchain."
pubDate: "2025-05-12"
heroImage: "/images/blog/blog.blockchain-actualizado.png"
category: "Tutoriales"
tags: [Cyberseguridad, Seguridad, Blockchain, Web3, Django, Python, SmartContracts, Automatización, Actualización]
---

En el desarrollo de mi [marketplace con pagos en criptomonedas](/proyectos/entry/comercio-electronico-con-pagos-blockchain/ "marketplace con pagos en criptomonedas"), uno de los mayores retos ha sido garantizar que **ningún pago se pierda**, incluso si el usuario abandona la página antes de que la transacción se confirme en la blockchain. La solución: un **listener de eventos mejorado** que actúa como guardián en segundo plano, asegurando que todas las transacciones se registren correctamente.

## El Problema con el Enfoque Anterior

Mi primer listener ([versión anterior](/blog/posts/2025/04/escuchar-eventos-de-la-blockchain-en-django-confirmacion-automática-de-pagos-con-web3/ "Mi primer listener")) presentaba varias limitaciones:

1. **Dependencia crítica del hash de transacción**:  
   El sistema esperaba a recibir el `transactionHash` desde el frontend para registrar la transacción en la base de datos. Esto creaba una **ventana de vulnerabilidad**:
   - Si el usuario cerraba la pestaña o perdía conexión, la transacción no se guardaba en el servidor (aunque sí en blockchain).
   ```python
   # Versión antigua - Búsqueda solo por hash
   tx = await sync_to_async(Transaction.objects.get)(transaction_hash=tx_hash)
   ```

2. **Estados ambiguos**:  
   Las transacciones no encontradas quedaban en un limbo sin clasificar (ni confirmadas ni fallidas).

## La Solución: Un Listener Robustecido

### Cambios Clave Implementados

1. **Registro anticipado con estado `pending`**  
   Ahora, la transacción se crea en la base de datos **inmediatamente** cuando el usuario firma en su wallet, antes de que se confirme en blockchain. Esto elimina la ventana de vulnerabilidad.

2. **Identificación por transactionId + wallet**  
   Modifiqué el smart contract para que el evento `PaymentReceived` incluya:
   - `transactionId`: ID único de la transacción en nuestra DB.
   - `sender`: Dirección de la wallet del usuario.
   ```python
   # Versión nueva - Datos del evento
   event = contract.events.PaymentReceived().process_log(log)
   id = event['args']['transactionId']
   sender_address = event['args']['sender'].lower()
   ```

3. **Marcado automático de transacciones fallidas**  
   Si después de 5 reintentos no se encuentra la transacción en blockchain, se marca como `failed`:
   ```python
   if attempt == max_retries - 1:
       tx_failed.status = 'failed'  # Cambio de estado crítico
       logger.error(f"Transacción {id} marcada como FAILED")
   ```

4. **Búsqueda insensible a mayúsculas**  
   Para evitar errores con formatos de dirección (ej: `0xABC...` vs `0xabc...`):
   ```python
   wallet_address__iexact=sender_address  # Versión nueva
   ```

### Flujo Mejorado (vs Antiguo)

| **Etapa**               | **Versión Antigua**                          | **Versión Nueva**                              |
|-------------------------|---------------------------------------------|-----------------------------------------------|
| Registro inicial        | Esperaba al hash de blockchain              | Se crea con estado `pending` inmediatamente   |
| Identificación          | Solo por hash de transacción                | Por transactionId + wallet_address           |
| Manejo de errores       | Transacción "perdida"                       | Marcado automático como `failed`              |
| Resiliencia             | Sin reintentos inteligentes                 | Backoff exponencial + 5 reintentos            |

## Beneficios Clave para Usuarios y Negocio

1. **Protección contra pérdidas**  
   - Ahora es irrelevante si el usuario cierra el navegador: el listener sigue trabajando.

2. **Estados claros**  
   - Los usuarios ven si su pago está `pending`, `confirmed` o `failed`.

3. **Soporte técnico optimizado**  
   - Si una transacción aparece como `failed` pero el usuario ve el débito:
     ```python
     # Ejemplo de búsqueda manual para soporte
     Transaction.objects.filter(id=id, wallet_address__iexact=sender_address)
     ```
   - El equipo puede verificar manualmente en la blockchain.

4. **Arquitectura portable**  
   Este patrón funciona para cualquier aplicación con pagos on-chain (no solo Django).

## Implementación Técnica

El listener se ejecuta como un comando de Django:
```bash
python manage.py listener
```
Estructura de archivos:
```
mi_app/
├─ management/
│  ├─ commands/
│  │  └─ listener.py  # Código completo
```

## Conclusión y Mejoras Futuras

Este nuevo diseño resuelve los puntos débiles de la versión original priorizando:
- **Seguridad**: No se pierden transacciones válidas.
- **Experiencia de usuario**: Estados claros y automáticos.
- **Mantenibilidad**: Código más robusto y portable.

¿Es perfecto? Probablemente no. Por eso:
- **Invitación a colaborar**: Si ves oportunidades de mejora, ¡házmelo saber!
- **Compromiso de transparencia**: Publicaré actualizaciones en este blog y [LinkedIn](https://www.linkedin.com/in/jaterli/ "Linkedin personal").


[Ver archivo listener.py en GitHub](https://github.com/Jaterli/blockchain-payments/blob/main/backend/payments/management/commands/listener.py)