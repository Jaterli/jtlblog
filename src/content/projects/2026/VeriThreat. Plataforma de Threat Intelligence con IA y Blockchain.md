---
title: "VeriThreat: Plataforma de Threat Intelligence con IA y Blockchain"
description: "Plataforma para compartir indicadores de compromiso entre organizaciones, con un motor de IA que puntúa su riesgo y una blockchain permisionada que garantiza su procedencia. Proyecto en desarrollo."
pubDate: "2026-10-19"
heroImage: "/images/proyectos/projects.verithreat.webp"
badge: "EN DESARROLLO"
tags: [Python, Machine Learning, scikit-learn, PostgreSQL, Docker, Java, Spring Boot, Hyperledger Fabric, Blockchain, AI, Cyberseguridad, Threat Intelligence]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "VeriThreat"
  "applicationCategory": "SecurityApplication"
  "operatingSystem": "Web"
  "description": "Plataforma para compartir indicadores de compromiso entre organizaciones, con un motor de IA que puntúa su riesgo y una blockchain permisionada que garantiza su procedencia."
  "image": "https://jaterli.com/images/proyectos/projects.verithreat.webp"
  "url": "https://jaterli.com/proyectos/entry/2026/verithreat-plataforma-de-threat-intelligence-con-ia-y-blockchain/"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-10-19"
  "programmingLanguage": [
    "Python",
    "SQL",
    "Java"
  ]
  "featureList": [
    "Ingesta horaria automatizada de cinco fuentes abiertas de Threat Intelligence",
    "Modelo de datos unificado de indicadores y observaciones en PostgreSQL",
    "Validación de la fiabilidad de las fuentes con VirusTotal (825 indicadores)",
    "Modelo de IA (gradient boosting) que estima si un dominio es malicioso",
    "Severidad de 0 a 100 explicable para cada indicador",
    "Registro inmutable de la procedencia en Hyperledger Fabric (en desarrollo)"
  ]
---

**VeriThreat** es el proyecto en el que estoy trabajando ahora mismo: una plataforma para que distintas organizaciones compartan **inteligencia de amenazas** (Threat Intelligence) de forma fiable. Combina tres piezas: una arquitectura de **microservicios en Java**, un **motor de inteligencia artificial** que puntúa el riesgo de cada amenaza y una **blockchain permisionada** que registra quién la reportó y cuándo.

El proyecto está en una **fase temprana**. La base de datos, la ingesta automática, el modelo de IA y el cálculo del riesgo ya funcionan; los microservicios, la blockchain y el dashboard están por construir. En este artículo explico el problema que resuelve, cómo está planteado, en qué fases se divide y qué llevo hecho hasta ahora.

---

## 1. El problema

Cuando una empresa detecta una amenaza (una IP que la ataca, un dominio de phishing, un fichero con malware), lo que obtiene es un **indicador de compromiso** o **IOC**. Compartir esos indicadores con otras organizaciones permite que todas se protejan antes, pero hoy hay tres obstáculos:

- **La información está fragmentada.** Cada organización detecta indicadores por su cuenta y no hay un canal ágil y confiable para compartirlos.
- **No se puede verificar la procedencia.** Cuando sí se comparten, es difícil saber quién reportó qué y cuándo, o detectar manipulaciones y duplicados.
- **Los analistas están saturados.** El volumen de indicadores supera lo que un equipo de seguridad (SOC) puede revisar a mano, y eso provoca fatiga de alertas y retrasos en la respuesta.

---

## 2. La solución propuesta

VeriThreat ataca los tres problemas a la vez:

- Un **canal común y estructurado** para compartir indicadores entre organizaciones, construido con microservicios.
- Un **registro inmutable y auditable** de cada indicador compartido y de su origen, mediante blockchain.
- Una **priorización automática** de las amenazas más relevantes con IA, para que el analista se centre en lo importante.

### Arquitectura en cinco capas

1. **Fuentes externas**: feeds abiertos de Threat Intelligence.
2. **Microservicios Java**: API Gateway, ingesta y normalización de indicadores.
3. **Motor de IA**: puntuación del riesgo y, como complemento, resúmenes generados por un modelo de lenguaje local.
4. **Blockchain**: red permisionada que registra el hash y la procedencia de cada indicador.
5. **Consumo**: un dashboard para analistas y una API segura para las organizaciones socias.

Separar el sistema en capas me permite desarrollar y probar cada una por separado, y avanzar por fases sin bloquear el resto.

---

## 3. Tecnologías

<div class="md-table">

| Capa | Tecnologías |
|------|-------------|
| **Datos e IA** | Python, pandas, scikit-learn, Jupyter Notebook, Ollama (LLM local) |
| **Base de datos** | PostgreSQL en Docker |
| **Microservicios** | Java 17+, Spring Boot, Spring Cloud Gateway, Spring Data JPA, Kafka o RabbitMQ |
| **Blockchain** | Hyperledger Fabric, chaincode en Go o Java, Fabric SDK for Java |
| **Frontend** | React, Recharts o Chart.js, Tailwind CSS |
| **DevOps** | Docker Compose, GitHub, GitHub Actions |

</div>

Todo el stack es **open source** y se ejecuta en local, así que el proyecto se puede desarrollar sin coste económico.

---

## 4. Fases del proyecto

<div class="md-table">

| Fase | Contenido | Estado |
|------|-----------|--------|
| **1. Diseño y modelado** | Modelo de datos, arquitectura y casos de uso | ✅ Completada |
| **2. Datos y modelo de IA** | Selección y validación de fuentes, base de datos, ingesta, modelo de IA y fórmula de severidad | ✅ Funcionando (en revisión) |
| **3. Microservicios base** | API Gateway, ingesta y consulta en Java | ⏳ Pendiente |
| **4. Red blockchain** | Despliegue de Hyperledger Fabric y chaincode de registro | ⏳ Pendiente |
| **5. Integración end-to-end** | Conexión de todas las capas y dashboard en React | ⏳ Pendiente |
| **6. Pruebas y documentación** | Testing, memoria y defensa | ⏳ Pendiente |

</div>

---

## 5. Lo que llevo desarrollado

Hasta ahora me he centrado en la base de todo el sistema: **de dónde salen los datos, cuánto se puede confiar en ellos y cómo se convierten en una puntuación de riesgo**. Sin datos fiables, lo demás no tiene sentido.

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

Descarté otras como MalwareBazaar, AlienVault OTX o Feodo Tracker por aportar poco, duplicar información o no tener datos utilizables. También revisé los **términos de uso** de cada fuente: el uso académico está cubierto, y un uso comercial necesitaría licencias.

### 5.2 Un formato común

Cada fuente tiene su formato, así que unifiqué los datos en un único esquema: un **indicador** (dominio, URL, IP, hash…) con una o varias **observaciones**, una por cada fuente que lo reporta. Cada observación guarda la fecha, la categoría de amenaza (phishing, C2, distribución de malware, ataques…) y la **familia de la fuente**, porque dos fuentes del mismo proveedor no deben contar como dos confirmaciones independientes.

El resultado inicial: **75.511 observaciones y 74.884 indicadores únicos**. Un dato revelador: solo 41 aparecen en dos familias de fuentes distintas, así que las fuentes se complementan más de lo que se corroboran.

### 5.3 Validación con VirusTotal

Para saber cuánto confiar en cada fuente, consulté una muestra aleatoria y reproducible de **825 indicadores** en VirusTotal, que agrupa más de 90 motores antivirus. Considero confirmado un indicador cuando al menos tres motores lo detectan.

- Entre el **90 y el 100 %** de los indicadores maliciosos tienen al menos una detección, frente al **6 %** de los dominios populares.
- **PhishTank** es la fuente más fiable: 97 % de dominios y 100 % de URLs confirmados.
- Una **URL concreta se confirma más que el dominio que la aloja**, porque ese dominio puede ser un sitio legítimo comprometido.
- En las IPs, el nivel de **IPsum** separa muy bien las fiables de las dudosas: se confirman el 96 % de las que aparecen en tres o más listas y solo el 36 % de las que no aparecen en ninguna.

Estas tasas se convierten después en los **pesos de fiabilidad** de cada fuente en la fórmula de riesgo.

### 5.4 Base de datos e ingesta automática

Los datos viven en **PostgreSQL** (en Docker). Un proceso de **ingesta horaria** descarga solo lo que corresponde según los términos de cada fuente, valida cada fichero antes de cargarlo y es **idempotente**: volver a cargar el mismo contenido no cambia nada. Desde que arrancó, la base de datos ha pasado de unos 75.000 a más de 107.000 indicadores y sigue creciendo cada hora.

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

Cada componente se guarda por separado, de modo que **se puede explicar por qué un indicador tiene su puntuación**. Por ejemplo, una URL de phishing de PhishTank vista hace unas horas obtiene un 100, y una IP de mando y control reportada hace dos semanas un 97 gracias a que aparece en varias listas de IPsum.

La primera puntuación completa cubrió **108.319 indicadores**.

---

## 6. Próximos pasos

- Revisar la distribución de la severidad con más días de ingesta y justificar los pesos.
- Construir los **microservicios Java** de consulta y la API.
- Desplegar la red **Hyperledger Fabric** y registrar el hash y la procedencia de cada indicador.
- Desarrollar el **dashboard en React** para analistas.
- Permitir que los analistas marquen **falsos positivos** y usar esas marcas para reentrenar el modelo.
- **Reentrenar el modelo** periódicamente y activar una versión nueva solo si no empeora.

---

## 7. Reflexión

Lo que más estoy aprendiendo en esta fase es que, en ciberseguridad, **la calidad del dato importa más que el modelo**. Medir la fiabilidad de cada fuente, detectar sesgos (como una sola campaña que concentraba el 44 % de las URLs de una fuente) y evitar que el modelo aprenda atajos me ha llevado más tiempo que entrenarlo, y es lo que hace que la puntuación sea defendible.

*Este artículo se irá actualizando a medida que avance el proyecto.*
