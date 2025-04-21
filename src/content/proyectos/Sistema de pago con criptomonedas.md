---
title: "Sistema de Pago con Criptomonedas."
description: "Sistema de pago basado en Ethereum y USDT/USDC, que permita a las empresas aceptar pagos en criptomonedas de manera sencilla."
pubDate: "2025-03-05"
heroImage: "/assets/images/proyectos/projects.pending.jpg"
badge: "En curso"
tags: ["Wagmi", "Chakra UI", "React", "Django", "Python", "Typescript"]
---


## 📢 Introducción  

Este proyecto tiene como objetivo desarrollar una **plataforma de pagos basada en blockchain**, permitiendo a las empresas aceptar pagos en **ETH, USDT y USDC** de manera segura y sencilla. A través de una integración con **Wagmi**, los usuarios podrán autenticarse con sus billeteras digitales y realizar transacciones sin intermediarios, mientras que **Chakra UI** garantizará una experiencia de usuario moderna y accesible.  

El desarrollo comenzará el **5 de marzo de 2025** y se espera completar el MVP para el **30 de abril de 2025**. La plataforma incluirá funcionalidades clave como la **autenticación descentralizada, generación de pagos en cripto, un panel de administración para empresas y facturación en blockchain**.  

Con este sistema, busco ofrecer a las empresas una **alternativa eficiente y transparente** para recibir pagos en criptomonedas, simplificando su adopción y automatizando el proceso de conversión y facturación. La combinación de **Wagmi** para la integración con blockchain y **Chakra UI** para la interfaz de usuario permitirá crear una plataforma robusta, escalable y fácil de usar.  

---


### 🔥 Plan de Desarrollo


✅ **FASE 1: Core Blockchain Infrastructure** (COMPLETADA)
- Arquitectura full-stack modular:
  - Frontend: React + TS + Chakra UI 3.16
  - Backend: Django REST Framework
  - Blockchain: Wagmi v2
- Contrato Inteligente desplegado en Sepolia
- Sistema de autenticación con firma digital

✅ **FASE 2: Gestión de Usuarios** (COMPLETADA)
- Modelo User-Wallet integrado:
  - Registro con datos personales (UserForm)
  - Validación de wallets únicas
  - Asociación email/wallet (views.py users)
- Contexto global de wallet (WalletContext)
- Sistema anti-spoofing con localStorage

✅ **FASE 3: Sistema de Pagos Base** (COMPLETADA)
- Flujo completo de transacciones:
  - Pagos ETH/ERC20 (USDC, USDT, LINK)
  - Conversión científica → decimales
  - Registro en blockchain + base de datos
- Componentes UI/UX:
  - PaymentForm con validación en tiempo real
  - TransactionData con actualización dinámica

🚀 **FASE 4: Confirmación Automática** (EN PROGRESO 90%)
| Componente              | Estado       | Detalles técnicos |
|-------------------------|--------------|-------------------|
| Listener de Eventos     | ✔️ Implementado | WebSocket + AsyncWeb3 |
| Actualización de Estado | ✔️ Funcional | confirmed/pending |
| Manejo de Reconexiones  | 🔄 En pruebas | Exponential backoff |
| Sepolia Integration     | ✔️ Completo  | Testnet configurada |

📅 **FASE 5: Panel de Administración Empresas** (PRÓXIMOS PASOS)
- **Funcionalidades Clave**:
  - Dashboard analítico (transacciones/usuarios)
  - Gestión manual de transacciones
  - Exportación de datos (CSV/PDF)
  - Sistema de alertas empresariales
- **Tech Stack**:
  - Vistas protegidas por JWT
  - Tablas dinámicas con paginación
  - Filtros avanzados por fecha/token

🔒 **FASE 6: Seguridad Avanzada** (80% COMPLETADO)
- ✔️ Validación on-chain de transacciones
- ✔️ Protección contra replay attacks
- 🔄 Pendiente: Auditoría formal de contratos

📊 **FASE 7: Mejoras UX/UI**
- Historial de pagos responsive (PaymentHistory)
- Previsualización de facturas en UI
- Sistema de notificaciones in-app
- Internacionalización (es/en)

⚙️ **Componentes Destacados:**
```python
# Backend Core
- UserProfile Model → Relación 1:1 User-Wallet
- Transaction Service → CoinGecko API + Web3.py
- Async Listener → Manejo de eventos en tiempo real

# Frontend Avanzado
- WalletContext → Estado global de conexión
- Dynamic Forms → Validación con react-hook-form
- Transaction Flow → Estados visuales con Chakra UI