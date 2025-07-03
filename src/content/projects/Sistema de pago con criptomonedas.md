---
title: "Comercio Electrónico con Pagos Blockchain"
description: "Marketplace con sistema de pago basado en Ethereum y USDT/USDC, que permita a las empresas aceptar pagos en criptomonedas de manera sencilla."
pubDate: "2025-03-05"
heroImage: "/images/proyectos/projects.easycryptobuy.jpg"
badge: "Finalizado"
tags: [Web3, Wagmi, SmartContract, Blockchain, Tokens ERC20, React, Django, Chakra UI, Python, Typescript]
---

## Visión general

He desarrollado esta plataforma de **comercio electrónico con pagos blockchain**, que he llamado ***EasyCryptoBuy***, como uno más de mis proyectos de mi Máster en Desarrollo Full Stack y Blockchain, donde he aplicado los conocimientos adquiridos en ambas disciplinas para crear una solución funcional, segura y escalable.

El objetivo principal ha sido demostrar cómo la tecnología blockchain puede integrarse de manera eficiente en un entorno de comercio electrónico tradicional, ofreciendo ventajas clave como:
- **Transparencia en las transacciones** (registros inmutables en la blockchain)
- **Reducción de intermediarios** (pagos directos entre comprador y vendedor)
- **Seguridad mejorada** (autenticación mediante firma criptográfica)
- **Flexibilidad en métodos de pago** (soporte para ETH, USDT, USDC y otros tokens ERC-20)

La plataforma consta de dos partes principales:

1. **Frontend para clientes**: Interfaz intuitiva para explorar productos, gestionar carritos y realizar pagos con criptomonedas.
2. **Panel de administración**: Herramientas completas para gestión de productos, ventas y clientes.

## Tecnologías Principales

- **Frontend**: React, TypeScript, Chakra UI, Wagmi, Viem
- **Backend**: Django REST Framework, PostgreSQL, Web3.py
- **Blockchain**: Smart Contracts en Solidity (Ethereum), listeners de eventos
- **Seguridad**: JWT, firma criptográfica, rate limiting

## Parte Cliente: Experiencia de Usuario

### Dashboard Principal
El dashboard ofrece una visión completa del estado de la cuenta:

```tsx
<DashboardLayout>
  <WalletStatusCard 
    address={walletAddress}
    isConnected={isConnected}
    isRegistered={isRegistered}
  />
  <ProductCatalogPreview 
    onNavigate={() => navigate('/products')}
  />
  <PaymentQuickAccess 
    onNavigate={() => navigate('/payment')}
  />
  <RecentTransactions 
    transactions={recentTransactions}
    onViewDetail={(tx) => navigate(`/transactions/${tx.id}`)}
  />
  <UserProfileSection 
    profile={userProfile}
    onEdit={() => navigate('/profile')}
  />
</DashboardLayout>
```

**Características clave**:
- Estado de conexión de la wallet en tiempo real
- Acceso rápido a las principales funcionalidades
- Visualización de transacciones recientes
- Gestión del perfil de usuario


**📸 Captura del Dashboar del cliente:**  
[![Captura del Dashboar del cliente](/projects/easycryptobuy/easycryptobuy_clientes-dashboard.png)](/projects/easycryptobuy/easycryptobuy_clientes-dashboard.png)

---


### Catálogo de Productos
Interfaz intuitiva para explorar y seleccionar productos:

```tsx
<ProductGrid>
  {products.map(product => (
    <ProductCard
      key={product.id}
      product={product}
      onAddToCart={() => addToCart(product)}
      stock={product.stock}
    />
  ))}
</ProductGrid>
```

**Funcionalidades**:
- Control de stock en tiempo real
- Agregar productos al carrito con cantidad variable
- Filtrado y búsqueda de productos (integración pendiente)


**📸 Captura del catálogo de productos (las imágenes son aleatorias):**
[![Captura del catálogo de productos](/projects/easycryptobuy/easycryptobuy_clientes-productos.png)](/projects/easycryptobuy/easycryptobuy_clientes-productos.png)

---


### Carrito de Compras
Sistema completo de gestión del carrito:

```python
@api_view(["POST"])
@permission_classes([AllowAny])
def save_cart(request):
    wallet = request.data.get("wallet")
    if not wallet:
        return Response({"error": "Wallet address is required"}, status=400)

    try:
        profile = UserProfile.objects.get(wallet_address=wallet)
        cart, _ = Cart.objects.get_or_create(user=profile, is_active=True)
        serializer = CartSerializer(cart, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save(user=profile)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    except UserProfile.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
```

**Procesos clave**:
- Persistencia del carrito entre sesiones
- Validación de stock en tiempo real
- Cálculo automático de totales
- Opción para vaciar el carrito o eliminar items individuales


**📸 Captura del carrito:**
[![Captura del carrito](/projects/easycryptobuy/easycryptobuy_clientes-carrito.png)](/projects/easycryptobuy/easycryptobuy_clientes-carrito.png)

---


### Proceso de Pago
Flujo seguro para completar transacciones:

```solidity
// Smart Contract para pagos
contract PaymentProcessor {
    mapping(uint256 => bool) public usedNonces;
    
    event PaymentReceived(
        address indexed buyer,
        uint256 amount,
        uint256 transactionId
    );

    function processPayment(
        uint256 transactionId,
        uint256 nonce
    ) external payable {
        require(!usedNonces[nonce], "Nonce already used");
        usedNonces[nonce] = true;
        
        emit PaymentReceived(msg.sender, msg.value, transactionId);
    }
}
```

**Etapas del pago**:
1. Selección de token de pago (ETH, USDT, USDC, LINK)
2. Firma de wallet para autenticación
3. Confirmación de transacción en blockchain
4. Actualización de estado en tiempo real


**📸 Captura del formulario de pago:**
[![Captura del formulario de pago](/projects/easycryptobuy/easycryptobuy_clientes-pagar.png)](/projects/easycryptobuy/easycryptobuy_clientes-pagar.png)   
**📸 Captura del proceso de pago:**
[![Captura del proceso de pago](/projects/easycryptobuy/easycryptobuy_clientes-pago_proceso.png)](/projects/easycryptobuy/easycryptobuy_clientes-pago_proceso.png)

---

## Parte Administrativa: Gestión Empresarial

### Dashboard Analítico
Vista general del rendimiento del negocio:

```python
@api_view(["GET"])
@permission_classes([IsAdminUser])
def company_dashboard(request):
    # KPIs principales
    total_revenue = Transaction.objects.filter(
        status='confirmed'
    ).aggregate(total=Sum('amount_usd'))['total'] or 0
    
    active_users = UserProfile.objects.filter(
        transactions__status='confirmed',
        transactions__created_at__gte=timezone.now() - timedelta(days=30)
    ).distinct().count()

    return Response({
        'total_revenue': float(total_revenue),
        'active_users': active_users,
        # ... más métricas
    })
```

**Métricas clave**:
- Ingresos totales
- Usuarios activos
- Valor de inventario
- Gráfica de transacciones por período
- Productos más vendidos
- Últimas transacciones

**📸 Captura del Dashboard de la parte de administración:**
[![Captura del Dashboard de la parte de administración](/projects/easycryptobuy/easycryptobuy_empresa-dashboard.png)](/projects/easycryptobuy/easycryptobuy_empresa-dashboard.png)

---

### Gestión de Productos
CRUD completo para el catálogo:

```tsx
<ProductAdminTable
  products={products}
  onEdit={handleEditProduct}
  onDelete={handleDeleteProduct}
  onCreate={handleCreateProduct}
/>
```

**Funcionalidades**:
- Creación y edición de productos
- Control de inventario
- Categorización y organización (integración pendiente)


**📸 Captura del listado de productos:**
[![Captura del listado de productos](/projects/easycryptobuy/easycryptobuy_empresa-productos.png)](/projects/easycryptobuy/easycryptobuy_empresa-productos.png)    
**📸 Captura de la edición de un producto:**
[![Captura de la edición de un producto](/projects/easycryptobuy/easycryptobuy_empresa-productos_edit.png)](/projects/easycryptobuy/easycryptobuy_empresa-productos_edit.png)

---

### Gestión de Ventas
Sistema completo de seguimiento de pedidos:

```python
@api_view(['PATCH'])
@permission_classes([IsAdminUser])
def update_order_item_status(request, order_item_id):
    order_item = get_object_or_404(OrderItem, id=order_item_id)
    new_status = request.data.get('status')

    if new_status not in dict(OrderItem.STATUS_CHOICES):
        return Response({'error': 'Estado inválido'}, status=400)

    order_item.status = new_status
    order_item.save()
    return Response({'message': 'Estado actualizado'})
```

**Capacidades**:
- Filtrado avanzado por cliente/fecha
- Actualización de estados de envío
- Vista detallada de cada transacción
- Generación de facturas PDF

**📸 Captura del listado de ventas:**
[![Captura del listado de ventas](/projects/easycryptobuy/easycryptobuy_empresa-ventas.png)](/projects/easycryptobuy/easycryptobuy_empresa-ventas.png)    
**📸 Captura del detalle de venta:**
[![Captura del detalle de venta](/projects/easycryptobuy/easycryptobuy_empresa-venta_detalle.png)](/projects/easycryptobuy/easycryptobuy_empresa-venta_detalle.png)

---


### Gestión de Clientes
Herramientas para administración de usuarios cliente:

```tsx
<ClientManagement 
  clients={clients}
  onViewDetails={viewClientDetails}
  stats={clientStats}
/>
```

**Información disponible**:
- Historial completo de compras
- Métricas de actividad
- Datos de contacto
- Transacciones pendientes/confirmadas

**📸 Captura de la administración de clientes:**
[![Captura de la administración clientes](/projects/easycryptobuy/easycryptobuy_empresa-clientes.png)](/projects/easycryptobuy/easycryptobuy_empresa-clientes.png)    
**📸 Captura del detalle de cliente:**
[![Captura del detalle de cliente](/projects/easycryptobuy/easycryptobuy_empresa_cliente_detalle.png)](/projects/easycryptobuy/easycryptobuy_empresa_cliente_detalle.png)

---

## Seguridad Integral

### Autenticación y Autorización
```python
@ratelimit(key='user', rate='5/m')
@api_view(['GET'])
def get_wallet_nonce(request, wallet_address):
    nonce = str(uuid.uuid4())
    cache.set(f"wallet_nonce_{wallet_address}", nonce, timeout=300)
    return Response({'nonce': nonce})
```

**Protecciones**:
- Firma criptográfica para verificación de identidad
- Nonces de un solo uso con expiración
- Rate limiting para prevenir ataques
- JWT con refresh tokens


**📸 Captura de la petición de firma:**
[![Captura de la petición de firma](/projects/easycryptobuy/easycryptobuy_clientes-firma_requerida.png)](/projects/easycryptobuy/easycryptobuy_clientes-firma_requerida.png)

---

### Protección de Transacciones
```python
def verify_transaction(tx_hash):
    receipt = w3.eth.get_transaction_receipt(tx_hash)
    if receipt.status == 1:
        tx = Transaction.objects.get(transaction_hash=tx_hash)
        tx.status = 'confirmed'
        tx.save()
        return True
    return False
```

**Mecanismos**:
- Validación de saldos y gas fees
- Timeout para transacciones pendientes
- Verificación de eventos on-chain
- Hash únicos para cada transacción

### Seguridad en Frontend
```tsx
const PaymentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <form onSubmit={handleSubmit(processPayment)}>
      <Input
        {...register('amount')}
        error={errors.amount?.message}
      />
      <Button type="submit">Confirmar Pago</Button>
    </form>
  );
}
```

**Medidas**:
- Validación de formularios estricta
- Sanitización de inputs
- Protección contra XSS
- Políticas CORS estrictas

## Procesos Automatizados

### Listener de Blockchain
```python
def handle_event(event):
    tx_hash = event['transactionHash'].hex()
    tx = Transaction.objects.get(transaction_hash=tx_hash)
    tx.status = 'confirmed'
    tx.save()
    process_order_items(tx)

event_filter = contract.events.PaymentReceived.createFilter(fromBlock='latest')
while True:
    for event in event_filter.get_new_entries():
        handle_event(event)
    time.sleep(10)
```

**Funcionalidad**:
- Escucha continua de eventos
- Actualización automática de estados
- Procesamiento de órdenes asociadas

### Mantenimiento del Sistema
```python
@periodic_task(run_every=crontab(hour=3, minute=30))
def cleanup_abandoned_carts():
    week_ago = timezone.now() - timedelta(weeks=1)
    abandoned_carts = Cart.objects.filter(
        updated_at__lt=week_ago,
        is_active=True
    )
    abandoned_carts.delete()
```

**Tareas programadas**:
- Limpieza de carritos abandonados
- Actualización de estados
- Backup de datos críticos

## Conclusión

Como desarrollador blockchain, he diseñado esta plataforma no solo como un marketplace básico funcional, sino como una base sólida que proporciona:

1. **Experiencia de usuario fluida**: Desde la exploración de productos hasta la confirmación de pagos en blockchain.
2. **Herramientas empresariales**: Para gestión de inventario, ventas y clientes.
3. **Arquitectura segura**: Con múltiples capas de protección en frontend, backend y blockchain.
4. **Sistema escalable**: Preparado para alto volumen de transacciones y futuras expansiones.

El proyecto demuestra mi capacidad para:
- Integrar tecnologías blockchain en aplicaciones comerciales reales
- Diseñar interfaces intuitivas y responsivas
- Implementar medidas de seguridad robustas
- Desarrollar sistemas backend eficientes y escalables

**Impacto comercial**:
- Reduce costos de transacción
- Atrae a usuarios de criptomonedas
- Proporciona transparencia mediante blockchain
- Optimiza procesos administrativos


**¿Interesado en una solución similar para tu negocio?**   
¡Estoy disponible para adaptar este proyecto o desarrollar una plataforma a medida con las funcionalidades que necesites!