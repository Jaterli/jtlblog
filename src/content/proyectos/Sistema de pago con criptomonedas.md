---
title: "Sistema de Pago con Criptomonedas."
description: "Sistema de pago basado en Ethereum y USDT/USDC, que permita a las empresas aceptar pagos en criptomonedas de manera sencilla."
pubDate: "2025-03-05"
heroImage: "/assets/images/proyectos/projects.pending.jpg"
badge: "En curso"
tags: ["Web3Modal", "React", "Django", "Python", "Typescript"]
---


## 📢 Introducción  

Este proyecto tiene como objetivo desarrollar una **plataforma de pagos basada en blockchain**, permitiendo a las empresas aceptar pagos en **ETH, USDT y USDC** de manera segura y sencilla. A través de una integración con **Wagmi**, los usuarios podrán autenticarse con sus billeteras digitales y realizar transacciones sin intermediarios, mientras que **Chakra UI** garantizará una experiencia de usuario moderna y accesible.  

El desarrollo comenzará el **5 de marzo de 2025** y se espera completar el MVP para el **30 de abril de 2025**. La plataforma incluirá funcionalidades clave como la **autenticación descentralizada, generación de pagos en cripto, un panel de administración para empresas y facturación en blockchain**.  

Con este sistema, busco ofrecer a las empresas una **alternativa eficiente y transparente** para recibir pagos en criptomonedas, simplificando su adopción y automatizando el proceso de conversión y facturación. La combinación de **Wagmi** para la integración con blockchain y **Chakra UI** para la interfaz de usuario permitirá crear una plataforma robusta, escalable y fácil de usar.  

---

## 🔥 Plan de Desarrollo

### ✅ FASE 1: Investigación y Definición del Proyecto (COMPLETADA)  
✔️ **Definir el objetivo del sistema:** Facilitar pagos en Ethereum y simplificar la conversión y facturación.  
✔️ **Seleccionar tecnologías:**  
  - **Frontend:** React + TypeScript (Vite) con **Chakra UI** para la interfaz de usuario.  
  - **Backend:** Django + Django REST Framework (API).  
  - **Blockchain:** Ethereum (Testnet Sepolia) + **Wagmi** para la integración con Ethereum.  
✔️ **Elegir wallet compatible:** MetaMask (compatible con Wagmi).  
✔️ **Definir la infraestructura:** Backend en Django para gestionar usuarios y transacciones, frontend en React con Chakra UI para la UI.  

---

### ✅ FASE 2: Integración de Wagmi y Conexión de Wallet (COMPLETADA)  
✔️ **Implementar conexión con MetaMask usando Wagmi.**  
✔️ **Recuperar la dirección de la wallet y almacenarla en el estado global usando Wagmi hooks.**  
✔️ **Obtener información de la red y el saldo en ETH usando Wagmi.**  
✔️ **Manejar cambios de red en tiempo real con Wagmi.**  
✔️ **Persistir la conexión tras recargar la página usando Wagmi's `useAccount` y `useConnect`.**  
✔️ **Integrar el backend en Django con un endpoint para recibir la dirección de la wallet.**  

---

### 🛠️ FASE 3: Autenticación con Firma Digital (EN PROGRESO)  
🎯 **Objetivo:** Asegurar que el usuario es el dueño real de la wallet conectada.  
🔹 **Pasos:**  
🟡 Implementar un sistema de firma digital usando `useSignMessage` de Wagmi.  
🟡 Verificar la firma en el backend antes de aceptar transacciones.  
🟡 Asociar wallets a cuentas de usuario en el backend.  

---

### 🛠️ FASE 4: Implementación de Pagos en Ethereum (POR HACER)  
🎯 **Objetivo:** Permitir a las empresas recibir pagos en ETH y registrar transacciones.  
🔹 **Pasos:**  
🟡 Crear un contrato inteligente en Solidity que reciba pagos y emita eventos.  
🟡 Integrar el contrato con el frontend usando `useContractWrite` y `useContractEvent` de Wagmi.  
🟡 Mostrar el estado de las transacciones en tiempo real usando Chakra UI para notificaciones y alertas.  
🟡 Enviar la transacción al backend para registrarla en la base de datos.  
🟡 Gestionar errores y reintentos en caso de fallos usando Wagmi's `useWaitForTransaction`.  

---

### 🛠️ FASE 5: Conversión Automática y Facturación (POR HACER)  
🎯 **Objetivo:** Automatizar la conversión de pagos a monedas fiduciarias y generar facturas.  
🔹 **Pasos:**  
🟡 Integrar una API de conversión de criptomonedas (ej. CoinGecko, Chainlink).  
🟡 Calcular el monto en EUR/USD al momento de la transacción.  
🟡 Generar facturas automáticas con la información del pago usando Chakra UI para la interfaz de facturación.  
🟡 Permitir que las empresas descarguen sus facturas en PDF o reciban un email con ellas.  

---

### 🛠️ FASE 6: Seguridad y Auditoría (POR HACER)  
🎯 **Objetivo:** Asegurar el sistema contra fraudes y ataques.  
🔹 **Pasos:**  
🟡 Implementar validaciones en el backend para evitar transacciones fraudulentas.  
🟡 Usar logs y registros para auditar pagos en blockchain.  
🟡 Proteger claves privadas y datos sensibles usando Wagmi's `useSigner` y `useProvider`.  

---

### 🛠️ FASE 7: Despliegue y Producción (POR HACER)  
🎯 **Objetivo:** Hacer el sistema accesible para empresas reales.  
🔹 **Pasos:**  
🟡 Desplegar el contrato en la mainnet de Ethereum.  
🟡 Implementar soporte para otras redes como Polygon o Arbitrum usando Wagmi's `useNetwork`.  
🟡 Desplegar el backend en AWS, Vercel o Railway.  
🟡 Desplegar el frontend en Vercel o Netlify.  
🟡 Optimizar la UI y la experiencia del usuario usando Chakra UI para componentes responsive y accesibles.  

---

### 🛠️ FASE 8: Mejoras y Escalabilidad (OPCIONAL)  
🎯 **Objetivo:** Mejorar la plataforma con funcionalidades adicionales y optimizaciones.  
🔹 **Pasos:**  
🟡 Implementar soporte para más wallets (ej. WalletConnect, Coinbase Wallet) usando Wagmi.  
🟡 Añadir soporte para pagos en USDT y USDC usando Wagmi's `useContractRead` y `useContractWrite`.  
🟡 Optimizar el rendimiento del frontend con lazy loading y code splitting.  
🟡 Añadir un sistema de notificaciones en tiempo real usando WebSockets.  

---

Con la integración de **Wagmi** y **Chakra UI**, el proyecto se beneficiará de una mayor simplicidad en la integración con Ethereum y una interfaz de usuario moderna y accesible. Estas herramientas permitirán un desarrollo más rápido y un producto final más robusto y escalable.