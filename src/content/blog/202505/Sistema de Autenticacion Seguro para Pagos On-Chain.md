---
draft: false
title: "Sistema de Autenticación Seguro para Pagos On-Chain"
description: "Este sistema combina la seguridad de las firmas criptográficas con la flexibilidad de los JWT, ofreciendo una experiencia sin fricciones mientras garantizo la máxima protección para los usuarios."
pubDate: "2025-05-12"
heroImage: "/assets/images/blog/blog.cyber-security.jpg"
category: "Tutoriales"
tags: [Seguridad, Cyberseguridad, Blockchain, JWT, Django, React]
---


En mi [marketplace con pagos blockchain](/proyectos/entry/sistema-de-pago-con-criptomonedas/ "marketplace con pagos blockchain"), he desarrollado un **sistema de autenticación descentralizado** que combina la seguridad de las firmas criptográficas con la flexibilidad de los JWT, ofreciendo una experiencia sin fricciones mientras garantizo la máxima protección para los usuarios. Este es el enfoque técnico:

## Arquitectura Clave

### 1. Autenticación con Wallet (Web3)
El flujo sigue un patrón EIP-4361 mejorado:
```typescript
// WalletProvider.tsx - Flujo de autenticación
const authenticate = async (): Promise<boolean> => {
  // 1. Solicitar nonce al backend
  const nonceResponse = await authAPI.getNonce(address); 
  
  // 2. Crear mensaje estructurado
  const authMessage = JSON.stringify({
    texto: "Mensaje de seguridad",
    nonce: nonceResponse.data.nonce, // UUID único
    timestamp: Date.now(), // Validez de 2 minutos
    context: "login"
  });

  // 3. Firmar con la wallet
  const signature = await signMessageAsync({ message: authMessage });

  // 4. Validar en backend
  const authResponse = await authAPI.authenticate({
    wallet_address: address,
    signature,
    message: authMessage // Envía el JSON completo
  });
  
  // 5. Almacenar JWT en localStorage
  localStorage.setItem('userToken', authResponse.data.access_token);
}
```

### 2. Verificación en Backend (Django)
```python
# views.py - Validación de firmas
@api_view(['POST'])
@permission_classes([AllowAny])
def wallet_auth(request):
    wallet = request.data['wallet_address']
    signature = request.data['signature']
    signed_message = request.data['message']  # JSON original
    
    # Verificación crítica:
    encoded_message = encode_defunct(text=signed_message)
    recovered_addr = w3.eth.account.recover_message(
        encoded_message,
        signature=HexBytes(signature)
    
    if recovered_addr != wallet:
        return Response({'error': 'Firma inválida'}, status=401)
```

## Componentes Esenciales

### JSON Web Tokens (JWT)
- **Ventajas**: 
  - Sin estado (stateless): Reduce carga en la base de datos.
  - Seguridad: Firmados criptográficamente.
  - Portabilidad: Ideales para SPAs y móviles.
- **Implementación**:
  ```python
  # Generación de token con datos extendidos
  refresh = RefreshToken.for_user(profile.user)
  refresh['wallet'] = wallet  # Incluye dirección en el payload
  ```

### Decoradores Clave
| Decorador | Función | Ejemplo de Uso |
|-----------|---------|----------------|
| `@permission_classes` | Control de acceso | `@permission_classes([IsAuthenticated])` |
| `@api_view` | Define métodos HTTP aceptados | `@api_view(["POST"])` |
| `@csrf_exempt` | Exime de CSRF para APIs externas | Usado en `register_wallet` |
| `@wallet_required` (custom) | Valida JWT + wallet | Protege endpoints críticos |

### Almacenamiento en Frontend
- **LocalStorage**: Guarda tokens JWT de forma persistente.
  ```typescript
  // authUserAxios.ts - Interceptor
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("userToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  ```
- **Seguridad**: Aunque vulnerable a XSS, se mitiga con:
  - JWT de corta duración (access_token)
  - Refresh tokens con validación estricta

## Protección de Transacciones
Integración con el sistema de pagos:
```python
# payments/views.py
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@wallet_required  # Valida que el JWT coincida con la wallet
def register_transaction(request):
    if Transaction.objects.filter(wallet_address=request.wallet_address, status='pending').exists():
        return Response({"error": "Ya existe una transacción pendiente"}, status=409)
```

## Recomendaciones de Mejora
1. **Sustituir LocalStorage por Cookies HttpOnly** para mayor seguridad contra XSS.
2. **Implementar nonces secuenciales** en lugar de UUIDs para prevenir replay attacks.
3. **Añadir CAPTCHA** en `get_wallet_nonce` para evitar spam (ya tiene rate limiting).
4. **Validar dominios permitidos** de forma más estricta:
   ```python
   ALLOWED_DOMAINS = ["midominio.com"]  # En settings.py
   ```

## Conclusión
Este sistema resuelve elegantemente los desafíos únicos de los pagos on-chain:
- **Usuario**: Sin contraseñas, sin esperas.
- **Desarrollador**: Fácil integración con wallets estándar.
- **Negocio**: Reduce fraudes mediante verificación criptográfica.

**¿Preguntas o sugerencias?** ¡Abierto a colaboraciones para mejorarlo! 

