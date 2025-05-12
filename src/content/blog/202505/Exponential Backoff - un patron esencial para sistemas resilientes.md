---
draft: false
title: "Exponential Backoff: un patrón esencial para sistemas resilientes"
description: "El exponential backoff es un patrón de reintento que incrementa progresivamente el tiempo de espera entre intentos fallidos."
pubDate: "2025-04-21"
heroImage: "/assets/images/blog/blog.exponential-backoff.png"
category: "Máster en Desarrollo Full Stack"
tags: [Django, Automatización]
---



Cuando diseñamos aplicaciones que dependen de servicios externos —como APIs, microservicios, bases de datos remotas o blockchains— es inevitable enfrentarse a fallos intermitentes, desconexiones inesperadas o problemas de latencia. Estos eventos pueden deberse a múltiples causas: sobrecarga del sistema remoto, problemas de red, mantenimiento o simplemente condiciones normales de un entorno distribuido.

En estos casos, implementar un sistema de reintento **simple e inmediato** puede parecer suficiente, pero suele ser contraproducente: puede provocar una sobrecarga aún mayor, agotar recursos locales o incluso ser penalizado por el proveedor externo.

Aquí es donde entra en juego una estrategia efectiva: **Exponential Backoff**.

---

### ¿Qué es el Exponential Backoff?

El *exponential backoff* es un patrón de reintento que incrementa progresivamente el tiempo de espera entre intentos fallidos. En lugar de reintentar inmediatamente después de cada fallo, el sistema espera más tiempo tras cada nuevo fallo, siguiendo una progresión exponencial.

La fórmula general es:

```
wait_time = base_delay * (2 ** retry_count)
```

Donde:

- `base_delay` es el tiempo inicial (por ejemplo, 1 o 2 segundos).
- `retry_count` es el número de intentos fallidos consecutivos.

Este patrón permite:

- Reducir la presión sobre sistemas que están temporalmente no disponibles.
- Dar tiempo a los servicios externos a recuperarse.
- Disminuir el consumo innecesario de recursos del lado cliente.
- Evitar ciclos de reconexión rápidos que pueden colapsar el sistema.

---

### Aplicaciones típicas

Este patrón se puede aplicar en muchos contextos, como por ejemplo:

- Llamadas a APIs REST externas.
- Conexiones a servicios de mensajería (Kafka, RabbitMQ, etc.).
- Reintentos de envío de correos electrónicos o notificaciones.
- Reconexión a bases de datos temporales caídas.
- Y, por supuesto, conexiones a nodos de blockchain.

---

## Caso práctico: Listener de eventos en la blockchain

En mi aplicación de pagos descentralizados, implementé un sistema de escucha de eventos que se conecta a un nodo Ethereum usando WebSockets. Este listener se encarga de detectar eventos `PaymentReceived` emitidos por un contrato inteligente y actualizar el estado de las transacciones en mi base de datos.

El problema inicial era que, en caso de pérdida de conexión o fallo temporal, el sistema intentaba reconectar cada 5 segundos de forma fija. Esto generaba intentos innecesarios si el nodo seguía sin estar disponible, además de una posible sobrecarga de recursos.

Para solucionarlo, implementé un sistema de **exponential backoff** que regula los intentos de reconexión de forma progresiva.

---

### Fragmento del código actualizado (`listener.py`)

```python
async def async_handler(self):
    retry_count = 0
    while True:
        try:
            async with AsyncWeb3(WebSocketProvider(ws_provider_url)) as w3:
                self.stdout.write("Conectado a la blockchain. Escuchando eventos...")
                ...
                retry_count = 0  # Reiniciamos contador tras conexión exitosa
        except Exception as e:
            wait_time = min(60, 2 ** retry_count)  # Espera máxima de 60 segundos
            self.stdout.write(f"Error: {e}. Reintentando en {wait_time}s...")
            await asyncio.sleep(wait_time)
            retry_count += 1
```

De esta forma, si ocurre un error, el sistema esperará 1, luego 2, luego 4, 8, 16... hasta alcanzar un límite de 60 segundos. Una vez restablecida la conexión, el contador se reinicia.

---

### Beneficios obtenidos

- **Robustez** ante fallos de red y caídas temporales.
- **Menor carga sobre el sistema remoto** durante tiempos de inactividad.
- **Mayor eficiencia** en la reconexión.
- **Tolerancia total** a entornos distribuidos poco estables.

---

## Conclusión

El patrón de *exponential backoff* es una de las prácticas más simples y efectivas para mejorar la resiliencia de sistemas distribuidos. Ya sea que estés desarrollando una aplicación web, una API, un microservicio o una plataforma blockchain, este enfoque debería ser parte de tu caja de herramientas de desarrollo.

Incorporar esta lógica en los puntos críticos de tu infraestructura puede marcar una gran diferencia en términos de disponibilidad, eficiencia y experiencia del usuario.

> En el caso de mi proyecto, esta lógica se aplica a un listener de eventos en la blockchain, pero su valor es universal: cualquier sistema que necesite reconectar o reintentar acciones externas puede beneficiarse del *exponential backoff*.

[Ver listener actualizado en GitHub](https://github.com/Jaterli/blockchain-payments/blob/main/backend/payments/management/commands/listener.py)
