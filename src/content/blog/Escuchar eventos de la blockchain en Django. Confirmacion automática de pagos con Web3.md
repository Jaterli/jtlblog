---
draft: false
title: "Escuchar eventos de la blockchain en Django: confirmación automática de pagos con Web3"
description: "Mecanismo que nos permite detectar de forma automática cuándo se ha registrado una transacción de forma exitosa en la Blockchain."
pubDate: "2025-04-11"
heroImage: "/assets/images/blog/blog.blockchain.png"
category: "Máster en Desarrollo BlockChain"
tags: [Django, Blockchain]
---


Una de las principales ventajas de trabajar con contratos inteligentes es la transparencia y confiabilidad que ofrecen al registrar eventos en la blockchain. En el contexto de una aplicación de pagos descentralizados, como la que estoy desarrollando, es crucial contar con un mecanismo que nos permita detectar de forma automática cuándo se ha realizado un pago exitoso. Para ello, he implementado un **sistema de escucha de eventos** que marca las transacciones como *confirmadas* en mi base de datos en cuanto el contrato emite el evento correspondiente.

### ¿Por qué escuchar eventos en lugar de consultar manualmente?

Cuando un usuario realiza un pago desde la interfaz web, se guarda en la base de datos una transacción con su estado inicial (por ejemplo, "pendiente"). Sin embargo, para que podamos confirmar que la operación fue realmente procesada por la blockchain, necesitamos algún mecanismo de verificación. Las opciones son:

- **Consultar manualmente el estado de la transacción en Etherscan u otro explorador** (poco eficiente).
- **Hacer polling constante contra la red para ver si la transacción fue minada** (costoso y poco óptimo).
- **Escuchar los eventos emitidos por el contrato inteligente cuando se completa el pago** (eficiente y reactivo).

Escuchar eventos se convierte en la solución ideal: es inmediata, consume pocos recursos y está directamente ligada a la lógica del contrato inteligente. Por eso, he desarrollado un **listener de eventos** en Django que se conecta a la blockchain mediante WebSockets y marca las transacciones como confirmadas cuando se detecta el evento `PaymentReceived`.

### ¿Cómo funciona este sistema?

El sistema se ejecuta con un simple comando:

```bash
python manage.py listener
```

Puedes ver el código completo del listener en el siguiente enlace:

[Ver archivo listener.py en GitHub](https://github.com/Jaterli/blockchain-payments/blob/main/backend/payments/management/commands/listener.py)


### Partes clave del código

- **Conexión a la red blockchain vía WebSocket**  
  Utilizamos `AsyncWeb3` con `WebSocketProvider` para mantener una conexión persistente y recibir eventos en tiempo real.

  ```python
  async with AsyncWeb3(WebSocketProvider(os.environ.get('WEB3_WS_PROVIDER'))) as w3:
  ```

- **Suscripción al evento `PaymentReceived`**  
  El contrato emite este evento cuando se completa un pago. Escuchamos específicamente por él usando `LogsSubscription`.

  ```python
  subscription = LogsSubscription(
      address=contract.address,
      topics=[contract.events.PaymentReceived().topic],
      handler=lambda ctx: self.handle_payment_event(ctx, contract)
  )
  ```

- **Reintentos con espera para sincronización con la base de datos**  
  Puede ocurrir que el evento se detecte antes de que la transacción haya sido registrada localmente. Por eso, añadimos una lógica de reintento.

  ```python
  for attempt in range(max_retries):
      try:
          tx = await sync_to_async(Transaction.objects.get)(transaction_hash=tx_hash)
          break
      ...
  ```

- **Actualización de estado de la transacción**  
  Si la transacción se encuentra en la base de datos, su estado se actualiza a `'confirmed'`.

  ```python
  tx.status = 'confirmed'
  await sync_to_async(tx.save)()
  ```

- **Manejo de errores y reconexiones**  
  En caso de errores en la conexión WebSocket, el listener intenta reconectarse tras unos segundos.

  ```python
  except Exception as e:
      self.stdout.write(f"Error: {e}. Reconectando en 5s...")
      await asyncio.sleep(5)
  ```

### Conclusión

Integrar este tipo de automatismo en una aplicación de pagos basada en blockchain mejora enormemente la experiencia del usuario y la fiabilidad del sistema. El uso de WebSockets y eventos de contratos inteligentes permite que el backend reaccione de forma inmediata a las operaciones en la red, sin depender de verificaciones manuales ni sobrecargar la red con llamadas constantes.

Este sistema es un ejemplo de cómo combinar lo mejor del desarrollo web con la descentralización, utilizando herramientas como Django y Web3 para ofrecer soluciones modernas y escalables.

