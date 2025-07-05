---
draft: false
title: "Integración de Chakra UI v3.13 con Temas Claro y Oscuro"
description: "integrar Chakra UI v3.13 con temas claro y oscuro en tu aplicación React de manera sencilla y eficiente, utilizando los componentes y hooks generados por el CLI de Chakra UI."
pubDate: "2025-03-20"
heroImage: "/images/blog/blog.tutorial.jpg"
category: "Tutoriales"
tags: [Tutorial, React, Chakra UI]
---

### **Introducción**

Al intentar implementar el modo claro y oscuro en una aplicación de React utilizando **Chakra UI**, me encontré con algunas complicaciones. La mayor parte de la documentación disponible estaba orientada a la **versión 2**, y al actualizar a la **versión 3.13**, noté que habían introducido cambios significativos en la forma de manejar los temas. Componentes como `ColorModeProvider`, `useColorMode`, `LightMode`, `DarkMode` y `useColorModeValue` ya no estaban disponibles, y en su lugar, Chakra UI ahora se integra con **`next-themes`** para gestionar los modos de color.

Tras investigar y experimentar, logré dar con la solución adecuada para implementar el modo claro y oscuro en la versión 3.13. Con la iniciativa de ayudar a quienes se topen con el mismo problema, decidí redactar este pequeño tutorial. Aquí te guiaré paso a paso para integrar Chakra UI v3.13 con los temas claro y oscuro, destacando los cambios clave y proporcionando ejemplos prácticos para que puedas aplicarlo en tu proyecto sin complicaciones. ¡Vamos a ello! 😊


### **Tutorial: Integración de Chakra UI v3.13 con Temas Claro y Oscuro**

En este tutorial, te guiaré paso a paso para integrar **Chakra UI v3.13** en una aplicación React, junto con la configuración de temas claro y oscuro utilizando **`next-themes`**. Además, destacaré los cambios importantes con respecto a versiones anteriores de Chakra UI.

---

### **1. Cambios en Chakra UI v3.13**

En la versión 3.13 de Chakra UI, se han realizado cambios significativos en la implementación del modo de color (color mode). Aquí están los principales cambios:

1. **Eliminación de `ColorModeProvider` y `useColorMode`**:
   - Estos han sido reemplazados por **`next-themes`**, que maneja el cambio entre temas claro y oscuro de manera más eficiente.

2. **Eliminación de `LightMode`, `DarkMode` y `ColorModeScript`**:
   - En lugar de estos componentes, ahora debes usar **`className="light"`** o **`className="dark"`** para forzar un tema específico.

3. **Eliminación de `useColorModeValue`**:
   - Este hook ha sido reemplazado por **`useTheme`** de `next-themes`, que proporciona una API similar para manejar valores dinámicos basados en el tema.

4. **Snippets del CLI**:
   - Chakra UI ahora proporciona snippets generados automáticamente a través del CLI para facilitar la configuración del modo de color con `next-themes`.

---

### **2. Requisitos previos**

Asegúrate de tener instalado lo siguiente:

- **Node.js** (v16 o superior).
- **React** (v18 o superior).
- Un proyecto React configurado (puedes usar `create-react-app`, `Vite`, o cualquier otro).

---

### **3. Instalación de dependencias**

Instala las dependencias necesarias:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion next-themes
```

- `@chakra-ui/react`: La biblioteca principal de Chakra UI.
- `next-themes`: Para manejar los temas claro y oscuro.

---

### **4. Configuración de Chakra UI y `next-themes`**

#### **Paso 1: Generar el snippet de color mode**

Ejecuta el siguiente comando para generar automáticamente los componentes y hooks necesarios para el modo de color:

```bash
npx @chakra-ui/cli snippet add color-mode
```

Esto generará un archivo en `src/components/ui/color-mode` con los siguientes componentes y hooks:

- `ColorModeButton`: Un botón para alternar entre los temas claro y oscuro.
- `useTheme`: Hook para acceder al tema actual y cambiarlo.
- `useColorModeValue`: Hook para obtener valores dinámicos basados en el tema.

#### **Paso 2: Configura `ChakraProvider` y `ThemeProvider`**

En tu archivo de entrada principal (`main.tsx` o `index.tsx`), configura `ChakraProvider` y `ThemeProvider`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ChakraProvider>
  </React.StrictMode>
);
```

---

### **5. Usar los componentes y hooks generados**

#### **Paso 1: Usar `ColorModeButton`**

El componente `ColorModeButton` se genera automáticamente y puedes usarlo en tu aplicación para alternar entre los temas claro y oscuro.

```tsx
import { ColorModeButton } from "@/components/ui/color-mode";

function App() {
  return (
    <Box minH="100vh" py={10} px={4}>
      <Container maxW="container.md">
        {/* Botón de cambio de modo */}
        <ColorModeButton />

        {/* Contenido principal */}
        <VStack textAlign="center" pb={10} spacing={4}>
          <Heading as="h1" size="2xl">
            Mi Aplicación
          </Heading>
          <Heading as="h2" size="md">
            Con Chakra UI y temas claro/oscuro
          </Heading>
        </VStack>
      </Container>
    </Box>
  );
}
```

#### **Paso 2: Usar `useTheme`**

El hook `useTheme` reemplaza a `useColorMode` y te permite acceder al tema actual y cambiarlo.

```tsx
import { useTheme } from "@/components/ui/color-mode";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <Box>
      <Text>El tema actual es: {theme}</Text>
      <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Cambiar a {theme === 'light' ? 'Oscuro' : 'Claro'}
      </Button>
    </Box>
  );
}
```

#### **Paso 3: Usar `useColorModeValue`**

El hook `useColorModeValue` te permite definir valores dinámicos basados en el tema actual.

```tsx
import { useColorModeValue } from "@/components/ui/color-mode";

function MyComponent() {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box bg={bgColor} color={textColor} p={4}>
      Este es un componente con colores dinámicos.
    </Box>
  );
}
```

#### **Paso 4: Forzar un tema específico**

En lugar de usar `LightMode` y `DarkMode`, ahora debes usar `className="light"` o `className="dark"` para forzar un tema específico.

```tsx
function App() {
  return (
    <Box minH="100vh" py={10} px={4}>
      <Container maxW="container.md">
        {/* Forzar tema oscuro */}
        <div className="dark">
          <Box bg="gray.800" color="white" p={4}>
            Este contenido siempre estará en modo oscuro.
          </Box>
        </div>

        {/* Forzar tema claro */}
        <div className="light">
          <Box bg="white" color="black" p={4}>
            Este contenido siempre estará en modo claro.
          </Box>
        </div>
      </Container>
    </Box>
  );
}
```

---

### **6. Ejecutar la aplicación**

Finalmente, ejecuta tu aplicación:

```bash
npm run dev
```

---

### **7. Resultado**

- **Tema Claro**: Fondo blanco, texto oscuro, botones azules.
- **Tema Oscuro**: Fondo oscuro, texto claro, botones azul oscuro.
- **Cambio de tema**: El botón `ColorModeButton` permite alternar entre los temas.

---

### **8. Consideraciones adicionales**

- **Compatibilidad**: Asegúrate de que `next-themes` esté correctamente configurado para evitar problemas de hidratación en SSR (Server-Side Rendering).
- **Personalización**: Puedes extender los temas de Chakra UI usando `extendTheme` si necesitas más personalización.
- **Optimización**: Usa `useTheme` y `useColorModeValue` para acceder al tema actual y aplicar estilos dinámicos en otros componentes.

