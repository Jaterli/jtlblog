---
title: "VeriThreat: Plataforma de Threat Intelligence con IA y Blockchain"
description: "Plataforma para compartir indicadores de compromiso entre organizaciones, con un motor de IA que puntúa su riesgo de forma explicable, una API segura por organización, una blockchain permisionada que garantiza la procedencia y un dashboard para analistas."
pubDate: "2026-10-19"
updatedDate: "2026-11-17"
heroImage: "/images/proyectos/projects.verithreat.webp"
badge: "EN DESARROLLO"
tags: [Python, Machine Learning, scikit-learn, PostgreSQL, Docker, Java, Spring Boot, Hyperledger Fabric, Blockchain, React, AI, Cyberseguridad, Threat Intelligence]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "VeriThreat"
  "applicationCategory": "SecurityApplication"
  "operatingSystem": "Web"
  "description": "Plataforma para compartir indicadores de compromiso entre organizaciones, con un motor de IA que puntúa su riesgo de forma explicable, una API segura por organización, una blockchain permisionada que garantiza la procedencia y un dashboard para analistas."
  "image": "https://jaterli.com/images/proyectos/projects.verithreat.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/verithreat-plataforma-de-threat-intelligence-con-ia-y-blockchain/"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-10-19"
  "dateModified": "2026-11-17"
  "programmingLanguage": [
    "Python",
    "Java",
    "SQL",
    "TypeScript"
  ]
  "featureList": [
    "Ingesta horaria automatizada de cinco fuentes abiertas de Threat Intelligence",
    "Modelo de datos unificado de indicadores y observaciones en PostgreSQL",
    "Validación de la fiabilidad de las fuentes con VirusTotal (825 indicadores)",
    "Modelo de IA (gradient boosting) que estima si un dominio es malicioso",
    "Severidad de 0 a 100 explicable para cada indicador",
    "API REST con autenticación por organización a través de un API Gateway",
    "Registro inmutable de la procedencia de cada aportación en Hyperledger Fabric",
    "Dashboard para analistas que explica cada puntuación paso a paso"
  ]
---

**VeriThreat** es una plataforma para que distintas organizaciones compartan **inteligencia de amenazas** (Threat Intelligence) de forma fiable. Combina cuatro piezas: un **motor de datos e inteligencia artificial** en Python que puntúa el riesgo de cada amenaza, **microservicios en Java** que ofrecen una API segura a cada organización, una **blockchain permisionada** que registra quién aportó cada indicador y cuándo, y un **dashboard** para los analistas.

Nació como proyecto final de máster y se ha convertido en un proyecto personal. La plataforma ya funciona de principio a fin: ingesta automática cada hora, puntuación de riesgo explicable, API protegida, registro en blockchain y dashboard. Lo que queda es completar las pruebas y la documentación. En este artículo explico el problema que resuelve, cómo está construida y qué he aprendido por el camino.

---

## 1. El problema

Cuando una empresa detecta una amenaza (una IP que la ataca, un dominio de phishing, un fichero con malware), lo que obtiene es un **indicador de compromiso** o **IOC**. Compartir esos indicadores con otras organizaciones permite que todas se protejan antes, pero hoy hay tres obstáculos:

- **La información está fragmentada.** Cada organización detecta indicadores por su cuenta y no hay un canal ágil y confiable para compartirlos.
- **No se puede verificar la procedencia.** Cuando sí se comparten, es difícil saber quién reportó qué y cuándo, o detectar manipulaciones y duplicados.
- **Los analistas están saturados.** El volumen de indicadores supera lo que un equipo de seguridad (SOC) puede revisar a mano, y eso provoca fatiga de alertas y retrasos en la respuesta.

---

## 2. La solución

VeriThreat ataca los tres problemas a la vez:

- Un **canal común y estructurado** para compartir indicadores entre organizaciones, a través de una API autenticada.
- Un **registro inmutable y auditable** del origen de cada indicador aportado, mediante blockchain.
- Una **priorización automática** de las amenazas, con una puntuación de riesgo que se puede explicar término a término, para que el analista se centre en lo importante y sepa por qué.

### Arquitectura

<div class="md-table">

| Pieza | Qué hace |
|-------|----------|
| **Fuentes externas** | Cinco feeds abiertos de Threat Intelligence, una señal de fiabilidad para IPs y un ranking de dominios populares |
| **Motor de datos e IA (Python)** | Descarga las fuentes cada hora, normaliza los datos, entrena el modelo de IA y calcula la severidad de cada indicador |
| **PostgreSQL** | Guarda todo y es el único punto de contacto entre Python y Java |
| **Microservicios (Java)** | Un API Gateway que autentica a cada organización y un servicio que ofrece consultas, recibe aportaciones y las registra en blockchain |
| **Blockchain (Hyperledger Fabric)** | Registra de forma inmutable la huella de cada indicador aportado, la organización que lo firma y la fecha |
| **Dashboard (React)** | Interfaz para analistas: panel general, búsqueda, detalle explicado y formulario de aportación |

</div>

La regla que ordena todo es sencilla: **Python ingiere y puntúa; Java expone; Fabric da fe**. Python y Java no se llaman entre sí: se comunican solo a través de la base de datos. Explico por qué elegí dos lenguajes en **[este artículo del blog](/blog/posts/2026/11/por-que-verithreat-usa-dos-lenguajes-python-para-los-datos-y-java-para-la-plataforma/)**.

---

## 3. Tecnologías

<div class="md-table">

| Capa | Tecnologías |
|------|-------------|
| **Datos e IA** | Python, pandas, scikit-learn, tldextract, Jupyter Notebook |
| **Base de datos** | PostgreSQL 17 en Docker |
| **Microservicios** | Java 17, Spring Boot 4, Spring Cloud Gateway, JDBC, Testcontainers |
| **Blockchain** | Hyperledger Fabric 2.5 LTS, chaincode en Java, Fabric Gateway SDK para Java |
| **Frontend** | React 19, TypeScript, Vite, Recharts, Tailwind CSS |
| **DevOps** | Docker Compose, WSL, Programador de tareas, GitHub |

</div>

Todo el stack es **open source** y se ejecuta en local, así que el proyecto se puede desarrollar sin coste económico.

---

## 4. Fases del proyecto

<div class="md-table">

| Fase | Contenido | Estado |
|------|-----------|--------|
| **1. Datos y fiabilidad** | Selección de fuentes, términos de uso, formato común y validación con VirusTotal | ✅ Completada |
| **2. Base de datos** | Esquema PostgreSQL y carga idempotente | ✅ Completada |
| **3. Ingesta, modelo y severidad** | Ingesta horaria, modelo de IA y fórmula de riesgo | ✅ Completada |
| **4. Microservicios** | API de indicadores y API Gateway con autenticación por organización | ✅ Completada |
| **5. Blockchain** | Red Hyperledger Fabric, chaincode y registro de las aportaciones | ✅ Completada |
| **6. Dashboard** | Interfaz React para analistas | ✅ Completada |
| **7. Pruebas y documentación** | Ampliar las pruebas, revisar los pesos y documentar la plataforma | ⏳ En curso |

</div>

---

## 5. Cómo está construida

### 5.1 Selección de fuentes

Evalué **más de quince fuentes abiertas** de Threat Intelligence con los mismos cinco criterios: cobertura nueva, fiabilidad medida, metadatos (fecha, categoría, procedencia), independencia respecto a las demás y coste de mantenimiento. Me quedé con un conjunto deliberadamente corto:

<div class="md-table">

| Fuente | Qué aporta |
|--------|-----------|
| **ThreatFox** (abuse.ch) | Indicadores mixtos con familia de malware; la única con servidores de mando y control (C2) |
| **URLhaus** (abuse.ch) | URLs de distribución de malware, con su estado online u offline |
| **blocklist.de** | IPs que atacan servicios |
| **PhishTank** | Phishing verificado por la comunidad |
| **TweetFeed** | Indicadores publicados por investigadores, con autor y enlace a la fuente |
| **IPsum** | No aporta indicadores: indica en cuántas listas aparece cada IP, y sirve como señal de fiabilidad |
| **Tranco** | Ranking de dominios populares, base de los ejemplos «no maliciosos» del modelo |

</div>

Descarté otras como MalwareBazaar, AlienVault OTX o Feodo Tracker por aportar poco, duplicar información o no tener datos utilizables. También revisé los **términos de uso** de cada fuente: el uso no comercial está cubierto, y un uso comercial necesitaría licencias.

### 5.2 Un formato común

Cada fuente tiene su formato, así que unifiqué los datos en un único esquema: un **indicador** (dominio, URL, IP, hash…) con una o varias **observaciones**, una por cada fuente que lo reporta. Cada observación guarda la fecha, la categoría de amenaza (phishing, C2, distribución de malware, ataques…) y la **familia de la fuente**, porque dos fuentes del mismo proveedor no deben contar como dos confirmaciones independientes.

El análisis inicial reunió **75.511 observaciones y 74.884 indicadores únicos**. Un dato revelador: solo 41 aparecían en dos familias de fuentes distintas, así que las fuentes se complementan más de lo que se corroboran.

### 5.3 Validación con VirusTotal

Para saber cuánto confiar en cada fuente, consulté una muestra aleatoria y reproducible de **825 indicadores** en VirusTotal, que agrupa más de 90 motores antivirus. Considero confirmado un indicador cuando al menos tres motores lo detectan.

- Entre el **90 y el 100 %** de los indicadores maliciosos tienen al menos una detección, frente al **6 %** de los dominios populares.
- **PhishTank** es la fuente más fiable: 97 % de dominios y 100 % de URLs confirmados.
- Una **URL concreta se confirma más que el dominio que la aloja**, porque ese dominio puede ser un sitio legítimo comprometido.
- En las IPs, el nivel de **IPsum** separa muy bien las fiables de las dudosas: se confirman el 96 % de las que aparecen en tres o más listas y solo el 36 % de las que no aparecen en ninguna.

Estas tasas se convierten después en los **pesos de fiabilidad** de cada fuente en la fórmula de riesgo.

### 5.4 Base de datos e ingesta automática

Los datos viven en **PostgreSQL** (en Docker). Un proceso de **ingesta horaria** descarga solo lo que corresponde según los términos de cada fuente, valida cada fichero antes de cargarlo y es **idempotente**: volver a cargar el mismo contenido no cambia nada. A finales de octubre la base de datos ya superaba los **277.000 indicadores**, todos con su puntuación de riesgo, y sigue creciendo cada hora.

### 5.5 El modelo de IA

Todas las fuentes contienen **solo amenazas**, así que lo primero fue decidir qué debía aprender el modelo. Elegí que distinga si un **dominio es malicioso o no**, usando como ejemplos «no maliciosos» los 50.000 dominios más populares de Tranco, depurados de servicios de doble uso (acortadores, almacenamiento en la nube, plataformas de subdominios…). Popular no es lo mismo que benigno: GitHub, por ejemplo, también aloja malware.

Para evitar que el modelo «haga trampa», solo usa rasgos que se pueden calcular para cualquier dominio desconocido: longitud, entropía, proporción de dígitos, guiones, subdominios y TLD.

Es un **gradient boosting** (`HistGradientBoostingClassifier` de scikit-learn) que obtiene una **PR-AUC de 0,81** y una **ROC-AUC de 0,89**. Lo importante es que **mantiene la misma calidad con los dominios más recientes**, que no había visto al entrenar.

### 5.6 La severidad: un score de riesgo explicable

El modelo de IA es solo una pieza. La **severidad final**, de 0 a 100, combina:

- La **fiabilidad** medida de cada fuente para cada tipo de indicador.
- Un **decaimiento temporal**: una amenaza que ya no aparece en las fuentes pierde peso con el tiempo.
- La **corroboración** entre familias de fuentes independientes.
- **IPsum** como señal adicional para las IPs.
- El **modelo de IA** como señal débil, que puede sumar hasta 30 puntos pero nunca domina sobre las fuentes.
- Una regla para los **dominios muy populares**, que se marcan como «disputados» y ven su puntuación reducida a la mitad. Los subdominios de plataformas de usuarios (nube, alojamiento, DNS dinámico) no heredan la popularidad del dominio padre.

Cada componente se guarda por separado, de modo que **se puede explicar por qué un indicador tiene su puntuación**. Por ejemplo, una URL de phishing de PhishTank vista hace unas horas obtiene un 100, y una IP de mando y control reportada hace dos semanas un 97 gracias a que aparece en varias listas de IPsum.

### 5.7 Microservicios y API Gateway

La parte expuesta a las organizaciones está en **Java con Spring Boot** y se divide en dos servicios:

- **Servicio de indicadores:** búsqueda de un IOC por su valor, listado priorizado por severidad con filtros por categoría y tipo, detalle con todas las observaciones y la puntuación desglosada, estadísticas para el dashboard y recepción de las aportaciones. Cada organización es una fuente más: lo que aporta entra en la severidad en la siguiente ejecución horaria, con una fiabilidad configurable.
- **API Gateway:** la única puerta de entrada. Cada organización tiene una **clave de API de 192 bits** de la que la base de datos solo guarda su hash, y que se puede revocar. El Gateway descarta lo que el cliente diga sobre su identidad, fija la organización real a partir de la clave y añade un secreto que el servicio interno exige, así que nadie puede saltárselo para hacerse pasar por otra organización.

Python y Java normalizan los valores (mayúsculas, puntos finales, IPv6…) exactamente igual, y lo garantizan **35 casos de prueba compartidos** que ejecutan los dos lenguajes. Los tests de integración usan una base de datos PostgreSQL real (Testcontainers).

### 5.8 Registro en blockchain

La red **Hyperledger Fabric** tiene dos organizaciones y un canal propio. Un contrato inteligente (chaincode) escrito en Java registra cada aportación con tres datos: la **huella sha256 del indicador** (nunca el indicador en claro), la **organización que firma** y la **fecha de la transacción**. Con ellos calcula un hash canónico que identifica el registro de forma inmutable.

Solo se registran las **aportaciones de las organizaciones**: los feeds públicos ya tienen su procedencia en la base de datos, generan unos 100.000 cambios al día y sus términos no permiten redistribuirlos.

Para que una aportación nunca falle porque la red esté caída, uso una **bandeja de salida**: la aportación y su registro pendiente se guardan en la misma transacción, y un proceso del servicio los envía a Fabric en segundos, con reintentos y sin duplicados. En el detalle de cada indicador se ve el estado del registro, su transacción y su hash.

Hay una simplificación propia de un proyecto de este tamaño: el servicio firma en nombre de cada organización. En un despliegue real, cada organización firmaría con su propia clave.

### 5.9 Dashboard para analistas

El dashboard, en **React con Recharts y Tailwind**, usa la misma API que cualquier otro cliente, a través del Gateway. La clave de API la añade el servidor, así que **el navegador nunca la ve**. Tiene cuatro vistas:

- **Panel general:** cifras clave, severidad por categoría y tipo, distribución de la severidad, frescura de cada fuente y estado de los registros en blockchain.
- **Indicadores:** búsqueda por valor y listado priorizado con filtros.
- **Detalle:** rehace la cuenta de la severidad paso a paso (fiabilidad y decaimiento de cada fuente, evidencia combinada, modelo y regla de disputado) y comprueba que da el mismo resultado que el guardado. Muestra también cada observación, su registro en la cadena y el historial de la puntuación.
- **Aportar un IOC:** formulario con las mismas comprobaciones que el servicio, que muestra el valor normalizado, la huella que irá a la cadena y el estado del registro.

---

## 6. Próximos pasos

- Ampliar las **pruebas automáticas** de la parte de Python (fórmula de severidad y lectura de cada fuente).
- Revisar la distribución de la severidad con más semanas de ingesta y **justificar cada peso**.
- Preparar una **demo reproducible** que levante toda la plataforma con un solo comando.
- Completar la **documentación técnica** de cada pieza.
- Permitir que los analistas marquen **falsos positivos** y usar esas marcas para reentrenar el modelo.
- **Reentrenar el modelo** periódicamente y activar una versión nueva solo si no empeora.

---

## 7. Reflexión

Lo que más he aprendido con este proyecto es que, en ciberseguridad, **la calidad del dato importa más que el modelo**. Medir la fiabilidad de cada fuente, detectar sesgos (como una sola campaña que concentraba el 44 % de las URLs de una fuente) y evitar que el modelo aprenda atajos me llevó más tiempo que entrenarlo, y es lo que hace que la puntuación sea defendible.

La segunda lección tiene que ver con la arquitectura: **una frontera simple entre piezas vale más que cualquier tecnología**. Que Python y Java solo compartan la base de datos, que la blockchain guarde solo lo que necesita garantía y que la API acepte aportaciones aunque Fabric esté caído ha hecho que cada pieza se pueda construir, probar y cambiar sin romper las demás.

*Este artículo se irá actualizando a medida que avance el proyecto.*
