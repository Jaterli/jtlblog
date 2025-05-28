---
title: "Sistema de Pago con Criptomonedas."
description: "Sistema de pago basado en Ethereum y USDT/USDC, que permita a las empresas aceptar pagos en criptomonedas de manera sencilla."
pubDate: "2025-03-05"
heroImage: "/assets/images/proyectos/projects.pending.jpg"
badge: "En curso"
tags: ["Wagmi", "Chakra UI", "React", "Django", "Python", "Typescript"]
---



## 🧾 Descripción del Proyecto: Blockchain Payments

**Blockchain Payments** es una plataforma Web3 diseñada para facilitar pagos descentralizados mediante contratos inteligentes en Ethereum (Sepolia en esta versión de portafolio). A través de una experiencia UI moderna (Chakra UI), integración con MetaMask y funcionalidades extendidas como facturación automática y persistencia de sesión, este proyecto combina blockchain, UX y backend para resolver un problema real de pagos digitales.

Además, está construida para ser fácilmente **personalizable y escalable** hacia empresas reales que requieran integrarse con contratos inteligentes, usando redes como Ethereum Mainnet, Polygon u Optimism.

---

## 🧭 Roadmap Técnico + Funcional para el Blog

---

### 🔹 Fase 1: Arquitectura y Setup Inicial

- Separación clara entre:
  - `frontend/` (React + Chakra UI + ethers.js)
  - `backend/` (Django + DRF)
  - `contracts/` (Solidity)
- Conexión Web3 preparada para múltiples redes (Sepolia por ahora).

---

### 🔹 Fase 2: Funcionalidad Blockchain y Contrato

- Contrato `PaymentContract.sol` gestiona la lógica de recepción de pagos.
- ABI compilado se integra al frontend para invocar funciones como:
  - `makePayment()`
  - `getTotalReceived()`
- Pago en ETH desde cualquier wallet EVM compatible.

---

### 🔹 Fase 3: Interfaz de Usuario y Experiencia (Frontend)

1. **Estilo visual moderno con Chakra UI**:
   - Componentes accesibles, responsive y estilizados.

2. **Conexión de billetera (Web3):**
   - `ConnectWallet.tsx` + contexto `WalletContext.tsx`.

3. **Persistencia de sesión vía `localStorage`:**
   - Guarda conexión de wallet y datos de usuario.
   - Permite recarga sin perder estado.

4. **Formulario de usuario + Pago:**
   - `UserForm.tsx` + `PaymentForm.tsx`
   - Conversión fiat con `PriceFetcher.tsx` (CoinGecko API).

5. **Historial y visualización de datos:**
   - `PaymentHistory.tsx`, `TransactionData.tsx`
   - `TruncatedAddress.tsx` para ocultar parte de las direcciones o hashes.

---

### 🔹 Fase 4: Backend API y Servicios

1. **Modelo `Payment`**:
   - Guarda transacciones con metadatos (email, hash, monto, fecha).

2. **Sistema de Facturación**:
   - Emails y nombres se vinculan al hash de la transacción.
   - Exportable o ampliable para PDFs o integraciones ERP.
   - Generación PDF (`generate_invoice`)
   - Historial transacciones (`PaymentHistory.tsx`)

3. **Servicios y comandos personalizados**:
   - `listener.py`: escucha eventos on-chain.
   - `check_transactions.py`: verificador cíclico de pagos.
   - `coingecko.py`: precios fiat.

---

### 🔹 Fase 5: Seguridad, Deploy, Testnet

- Solo desplegado en Sepolia.
- Código preparado para producción con:
  - Sanitización de inputs.
  - Seguridad en endpoints y validaciones.
  - Protección contra ataques Web3 comunes.

---

### 🔹 Fase 6: Dashboard Empresarial *(opcional/fase futura)*

**Objetivo:** Permitir a las empresas tener control sobre pagos, métricas y datos de clientes.

🔧 **Funcionalidades potenciales:**
- Panel React para admins (con login empresarial).
- Visualización de:
  - Total recaudado
  - Usuarios registrados
  - Últimas transacciones
- Exportación a CSV / Excel.
- Filtros por fecha / usuario / monto.
- Integración con Google Analytics o similar.
- Rol de `superusuario` para control completo.

🎯 Esta fase elevaría la app de un MVP a una solución comercial.

---

## 💬 Puntos Clave

- Tecnología usada: **Solidity, Django, React, ethers.js, Chakra UI**
- APIs integradas: **CoinGecko**
- Modo actual: **testnet Sepolia** pero 100% migrable a mainnet.
- Valor diferencial: *Interfaz pulida, backend robusto, Web3 bien integrado.*
- Casos de uso: *E-commerce descentralizado, crowdfunding, SaaS, donaciones.*

