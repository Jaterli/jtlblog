---
title: "Comercio Electrónico con Pagos Blockchain"
description: "He desarrollado EasyCryptoBuy, una plataforma de comercio electrónico con integración nativa de pagos en blockchain."
pubDate: "2025-07-04"
heroImage: "/images/proyectos/projects.easycryptobuy.jpg"
badge: "Finalizado"
tags: [Web3, Wagmi, SmartContracts, Blockchain, Metamask, Tokens ERC20, React, Django, Chakra UI, Python, Typescript]
jsonLd:
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "EasyCryptoBuy",
        "description": "Plataforma de comercio electrónico con pagos blockchain",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript",
        "permissions": "Ethereum wallet access",
        "url": "https://jaterli.com/proyectos/entry/comercio-electronico-con-pagos-blockchain/",
        "author": {
          "@type": "Person",
          "name": "Jaime TL"
        },
        "datePublished": "2025-07-04",
        "programmingLanguage": ["TypeScript", "Python", "Solidity"],
        "featureList": [
          "Pagos con criptomonedas",
          "Smart contracts integrados",
          "Dashboard administrativo",
          "Autenticación Web3"
        ]
      },
      {
        "@type": "BlogPosting",
        "headline": "Comercio Electrónico con Pagos Blockchain",
        "description": "Desarrollo de EasyCryptoBuy - Plataforma e-commerce con pagos blockchain",
        "datePublished": "025-07-04T00:00:00+01:00",
        "author": {
          "@type": "Person", 
          "name": "Jaime TL"
        },
        "image": "https://jaterli.com/images/proyectos/projects.easycryptobuy.jpg"
      }
    ]
---

## Visión general

He desarrollado esta plataforma de **comercio electrónico con pagos blockchain**, que he llamado ***EasyCryptoBuy***, como uno más de mis proyectos de mi Máster en Desarrollo Full Stack y Blockchain, donde he aplicado los conocimientos adquiridos en ambas disciplinas para crear una solución funcional, segura y escalable.

El objetivo principal ha sido demostrar cómo la tecnología blockchain puede integrarse de manera eficiente en un entorno de comercio electrónico tradicional, ofreciendo ventajas clave como:
- **Transparencia en las transacciones** (registros inmutables en la blockchain)
- **Reducción de intermediarios** (pagos directos entre comprador y vendedor)
- **Seguridad mejorada** (autenticación mediante firma criptográfica)
- **Flexibilidad en métodos de pago** (soporte para ETH, USDT, USDC y otros tokens ERC-20)


## Tecnologías Principales

- **Frontend**: React, TypeScript, Chakra UI, Wagmi, Viem
- **Backend**: Django REST Framework, PostgreSQL, Web3.py
- **Blockchain**: Smart Contracts en Solidity (Ethereum), listeners de eventos
- **Seguridad**: JWT, firma criptográfica, rate limiting


## Arquitectura Técnica

### Configuración Clave del Backend

El backend utiliza Django REST Framework con una configuración optimizada para seguridad y rendimiento:

- CORS restringido solo a dominios autorizados
- Autenticación JWT con tokens de corta y larga duración
- Rate limiting para protección contra ataques

Ejemplo de configuración:

```python
# Configuración de seguridad y conexiones
CORS_ALLOWED_ORIGINS = [
    # Url's permitidas
    "http://localhost:5173", # localhost para las pruebas en local
    "http://127.0.0.1:5173", # localhost para las pruebas en local
    "https://sepolia.drpc.org"
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
```


### Integración Blockchain

En el frontend, la configuración de Wagmi permite operar tanto en red principal como en testnet (Sepolia), e integrarse con diversas wallets como MetaMask.

```typescript
export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask()], // Se puede integrar con múltiples wallets
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http('https://ethereum-sepolia-rpc.publicnode.com')
  }
});
```

**Ventajas**:
- Soporte simultáneo para mainnet y testnet (Sepolia).
- Conexión flexible a diferentes proveedores RPC
- Soporte para múltiples wallets.


## Parte Cliente: Experiencia de Usuario

EasyCryptoBuy ofrece una interfaz moderna e intuitiva que permite a los usuarios explorar productos, gestionar su carrito y realizar pagos seguros en blockchain.

### Dashboard del Cliente
El dashboard ofrece una visión completa del estado de la cuenta:

**Características clave**:
- Estado de conexión de la wallet en tiempo real
- Acceso rápido a las principales funcionalidades
- Visualización de transacciones recientes
- Gestión de perfil y datos personales


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

📸 [Captura del Dashboard del cliente](/projects/easycryptobuy/easycryptobuy_clientes-dashboard.png)

---

### Catálogo de Productos
Interfaz intuitiva para explorar y seleccionar productos:
- Exploración de productos con imágenes y descripciones.
- Añadir productos al carrito con control de stock en tiempo real.
- Filtrado y búsqueda de productos (integración pendiente)


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

📸 [Captura del catálogo de productos (las imágenes del catálogo son aleatorias)](/projects/easycryptobuy/easycryptobuy_clientes-productos.png)

---

### Carrito de Compras
Sistema completo de gestión del carrito:
- Persistencia entre sesiones
- Cálculo automático de totales
- Posibilidad de vaciar el carrito o eliminar productos


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

📸 [Captura del carrito](/projects/easycryptobuy/easycryptobuy_clientes-carrito.png)

---

### Proceso de Pago
Flujo seguro para completar transacciones:
1. Selección del token de pago (ETH, USDT, USDC, LINK).
2. Firma criptográfica de la transacción desde la wallet.
3. Confirmación on-chain y actualización inmediata en el sistema.

Smart contract de ejemplo:

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

📸 [Captura del formulario de pago](/projects/easycryptobuy/easycryptobuy_clientes-pagar.png)  
📸 [Captura del proceso de pago](/projects/easycryptobuy/easycryptobuy_clientes-pago_proceso.png)

---

## Parte Administrativa: Gestión Empresarial

Herramientas completas para gestión de productos, ventas y clientes.

### Dashboard Analítico
Panel para monitorizar el rendimiento del negocio en tiempo real:
- Ingresos totales
- Usuarios activos
- Valor de inventario
- Gráfica de transacciones por período
- Productos más vendidos
- Últimas transacciones


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

📸 [Captura del Dashboard de la parte de administración](/projects/easycryptobuy/easycryptobuy_empresa-dashboard.png)

---

### Gestión de Productos
CRUD completo para el catálogo:
- Creación, edición y eliminación de productos
- Control de inventario
- Categorización y organización (integración pendiente)


```tsx
<ProductAdminTable
  products={products}
  onEdit={handleEditProduct}
  onDelete={handleDeleteProduct}
  onCreate={handleCreateProduct}
/>
```


📸 [Captura del listado de productos](/projects/easycryptobuy/easycryptobuy_empresa-productos.png)  
📸 [Captura de la edición de un producto](/projects/easycryptobuy/easycryptobuy_empresa-productos_edit.png)

---

### Gestión de Ventas
Sistema completo de seguimiento de pedidos:
- Filtrado avanzado por cliente/fecha
- Actualización de estados de envío
- Vista detallada de cada transacción
- Generación de facturas en PDF

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


📸 [Captura del listado de ventas](/projects/easycryptobuy/easycryptobuy_empresa-ventas.png)  
📸 [Captura del detalle de venta](/projects/easycryptobuy/easycryptobuy_empresa-venta_detalle.png)

---

### Gestión de Clientes
Herramientas para administración de usuarios cliente:
- Historial completo de compras
- Métricas de actividad
- Datos de contacto
- Transacciones pendientes/confirmadas

```tsx
<ClientManagement 
  clients={clients}
  onViewDetails={viewClientDetails}
  stats={clientStats}
/>
```

📸 [Captura de la administración de clientes](/projects/easycryptobuy/easycryptobuy_empresa-clientes.png)  
📸 [Captura del detalle de cliente](/projects/easycryptobuy/easycryptobuy_empresa_cliente_detalle.png)

---

## Seguridad Integral

### Autenticación y Autorización

Ejemplo de código: 
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
- Rate limiting para evitar ataques de fuerza bruta
- JWT con tokens refresh para mantener sesiones seguras


📸 [Captura de la petición de firma](/projects/easycryptobuy/easycryptobuy_clientes-firma_requerida.png)

---

### Protección de Transacciones

Ejemplo de código: 
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

Ejemplo de código: 
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

Ejemplo de código: 
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
- Monitorea en tiempo real los eventos del smart contract
- Actualización automática de estados de las transacciones


### Mantenimiento del Sistema

Ejemplo de código: 
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
- Limpieza periódica de carritos abandonados
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


---

**¿Interesado en una solución similar para tu negocio?**   
¡Estoy disponible para adaptar este proyecto o desarrollar una plataforma a medida con las funcionalidades que necesites!


<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{{ jsonLd }}
</script>