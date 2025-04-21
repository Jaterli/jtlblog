---
draft: false
title: "Escucha de eventos en la blockchain con Django: confirmación automática de pagos con Web3"
description: "Mecanismo que nos permite detectar de forma automática cuándo se ha registrado una transacción de forma exitosa en la Blockchain."
pubDate: "2025-04-11"
heroImage: "/assets/images/blog/blog.blockchain.png"
category: "Máster en Desarrollo BlockChain"
tags: [Django, Blockchain, Automatización]
---


Una de las piezas fundamentales en una aplicación de pagos descentralizados es la capacidad de detectar automáticamente cuándo se ha completado una transacción en la blockchain. Para ello, se utiliza un **sistema de escucha de eventos** que se mantiene conectado a la red y reacciona en tiempo real a los eventos emitidos por el contrato inteligente.

En esta implementación, el sistema escucha el evento `PaymentReceived` emitido por el contrato de pagos cuando se realiza una operación exitosa. En cuanto se detecta el evento, el sistema busca en la base de datos la transacción correspondiente y la marca como *confirmada*.

### ¿Cómo se ejecuta?

El sistema está implementado como un comando personalizado de Django, que puede ejecutarse con:

```bash
python manage.py listener
```

### ¿Qué hace este listener?

- **Establece una conexión WebSocket con la blockchain**  
  Utiliza `AsyncWeb3` junto con `WebSocketProvider` para mantener una conexión persistente con la red. Esto permite recibir eventos en tiempo real sin necesidad de hacer polling.

  ```python
  async with AsyncWeb3(WebSocketProvider(ws_provider_url)) as w3:
  ```

- **Se suscribe al evento del contrato**  
  El sistema se suscribe específicamente al evento `PaymentReceived` del contrato de pagos, indicando un handler que se ejecutará cuando el evento sea recibido.

  ```python
  subscription = LogsSubscription(
      address=contract.address,
      topics=[contract.events.PaymentReceived().topic],
      handler=lambda ctx: self.handle_payment_event(ctx, contract)
  )
  ```

- **Procesa el evento recibido**  
  Cuando se detecta un evento, se extrae el hash de la transacción y se intenta buscar en la base de datos. Si la transacción aún no está disponible, se reintenta varias veces hasta encontrarla.

  ```python
  tx = await sync_to_async(Transaction.objects.get)(transaction_hash=tx_hash)
  ```

- **Confirma la transacción**  
  Si la transacción fue encontrada y no estaba ya confirmada, se actualiza su estado a `confirmed` y se guarda en la base de datos.

  ```python
  tx.status = 'confirmed'
  await sync_to_async(tx.save)()
  ```

- **Gestiona reconexiones automáticamente**  
  En caso de errores de red o interrupciones, el sistema espera unos segundos antes de intentar reconectar de forma automática y retomar la escucha de eventos.

  ```python
  wait_time = min(60, 2 ** retry_count)
  await asyncio.sleep(wait_time)
  ```

### Flujo general del sistema

1. Se lanza el comando de escucha.
2. Se establece la conexión WebSocket.
3. Se suscribe al evento del contrato inteligente.
4. Cuando se emite un evento, se procesa.
5. Se busca la transacción en la base de datos.
6. Si está registrada, se marca como confirmada.
7. Si no se encuentra, se reintenta con intervalos progresivos.
8. Si ocurre un error, el sistema espera y vuelve a conectarse.

### Conclusión

Este sistema de escucha permite que la aplicación esté sincronizada con los eventos de la blockchain en tiempo real, manteniendo la integridad y el estado actualizado de las transacciones en la base de datos. Es una arquitectura eficiente y reactiva que optimiza los recursos y mejora la experiencia general del usuario.

[Ver archivo listener.py en GitHub](https://github.com/Jaterli/blockchain-payments/blob/main/backend/payments/management/commands/listener.py)

--- 

¿Quieres que también lo convierta en un post compatible con plataformas como Dev.to o Medium?
