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

---

#### ✅ **FASE 1: Investigación y Definición** (COMPLETADA)
- ✔️ Definición del sistema de pagos blockchain
- ✔️ Stack tecnológico confirmado:
  - **Frontend**: React + TypeScript (Vite) + Chakra UI v3.13
  - **Backend**: Django REST Framework
  - **Blockchain**: Wagmi + Viem (sin dependencia de red específica)
- ✔️ Estructura de proyecto con carpetas `frontend/` y `backend/`

---

#### ✅ **FASE 2: Conexión de Wallet** (COMPLETADA CON MEJORAS)
- ✔️ Implementación con `useConnect` y `useAccount` de Wagmi
- ✔️ Detección automática de MetaMask
- ✔️ Persistencia de sesión con `localStorage`
- ✔️ Manejo de múltiples redes con `useNetwork` → *Actualizado a detección dinámica*
- ✔️ Componente `ConnectWallet` con Chakra UI
- ✔️ Integración con backend Django para registro de wallets

---

#### ✅ **FASE 3: Autenticación con Firma** (COMPLETADA)
- ✔️ Implementación con `useSignMessage`
- ✔️ Flujo completo:
  1. Usuario conecta wallet
  2. Completa formulario de datos (nombre/email)
  3. Firma mensaje con wallet
  4. Backend verifica firma y asocia datos
- ✔️ Validación de wallet duplicada
- ✔️ Notificaciones con toaster personalizado

---

#### 🚀 **FASE 4: Pagos en Ethereum** (EN PROGRESO - AJUSTES)
1. **Contrato Inteligente**:
   - ✔️ Contrato `PaymentContract.sol` desplegado en Sepolia
   - ✔️ Funcionalidades básicas (`pay()`, `getBalance()`)
   - 🔄 Pendiente: Eventos para registro de pagos

2. **Integración Frontend**:
   - ✔️ Componente `Payment.tsx` con Chakra UI
   - ✔️ Uso de `useWriteContract` para transacciones
   - ✔️ Conversión ETH → Wei
   - 🔄 Pendiente: Integración completa con backend

3. **Backend**:
   - ✔️ Endpoint para registro de transacciones
   - 🔄 Pendiente: Validación de recibos on-chain

---

#### 📅 **FASE 5: Conversión y Facturación** (PRÓXIMOS PASOS)
- **API de conversión**:
  - Evaluar CoinGecko vs Chainlink
  - Implementar servicio en Django
- **Facturación**:
  - Generación de PDF con datos de transacción
  - Historial de pagos en frontend
- **Nuevo componente**: `InvoiceGenerator`

---

#### 🔒 **FASE 6: Seguridad** (PLANIFICACIÓN)
- Validación de firmas en backend
- Protección contra replay attacks
- Auditoría de contrato con Slither o MythX

---

#### 🌐 **FASE 7: Despliegue** (PREPARACIÓN)
- **Contrato**:
  - Pruebas en Goerli antes de mainnet
- **Infraestructura**:
  - Frontend: Vercel
  - Backend: Railway (Dockerizado)
  - Base de datos: PostgreSQL

---

#### 🛠 **FASE 8: Mejoras** (FUTURO)
- **Wallets adicionales**: WalletConnect
- **Soporte multi-moneda**: USDC en Polygon
- **Notificaciones**: WebSockets para estado de tx

---

### 🔄 Cambios Relevantes vs Plan Original:
1. **Autenticación**:
   - Se añadió formulario de usuario antes de firma
   - Validación de wallets registradas

2. **Wagmi v2**:
   - Eliminada configuración obsoleta de contratos en `createConfig`
   - Uso de `useContractRead/Write` en lugar de configuración global

3. **Chakra UI v3.13**:
   - Migración a nuevos componentes como `Field.Root`
   - Eliminación de componentes deprecados

4. **Flujo de Pagos**:
   - Separación clara entre:
     1. Autenticación (Fase 3)
     2. Operaciones de pago (Fase 4)
     3. Facturación (Fase 5)

