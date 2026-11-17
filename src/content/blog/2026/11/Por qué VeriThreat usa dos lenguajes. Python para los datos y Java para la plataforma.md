---
draft: false
title: "Por qué VeriThreat usa dos lenguajes: Python para los datos y Java para la plataforma"
description: "Lo habitual es elegir un único lenguaje para un proyecto. En VeriThreat elegí dos: Python ingiere los datos y calcula el riesgo, y Java expone la API, autentica a las organizaciones y registra en blockchain. Explico por qué, qué cuesta y la regla que hace que funcione."
pubDate: "2026-11-17"
heroImage: "/images/proyectos/projects.verithreat.webp"
category: "Desarrollo Web"
tags: [Python, Java, Spring Boot, Arquitectura de Software, PostgreSQL, Hyperledger Fabric, Machine Learning]
jsonLd:
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Por qué VeriThreat usa dos lenguajes: Python para los datos y Java para la plataforma",
      "description": "Lo habitual es elegir un único lenguaje para un proyecto. En VeriThreat elegí dos: Python ingiere los datos y calcula el riesgo, y Java expone la API, autentica a las organizaciones y registra en blockchain.",
      "author": {
        "@type": "Person",
        "name": "Jaime TL"
      },
      "datePublished": "2026-11-17T00:00:00+01:00",
      "image": "https://jaterli.com/images/proyectos/projects.verithreat.webp",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2026/11/por-que-verithreat-usa-dos-lenguajes-python-para-los-datos-y-java-para-la-plataforma/"
      }
    }
  ]
---

## Introducción

**[VeriThreat](/proyectos/entry/2026/verithreat-plataforma-de-threat-intelligence-con-ia-y-blockchain/)** es una plataforma para que varias organizaciones compartan **indicadores de amenaza** (dominios de phishing, URLs que distribuyen malware, IPs que atacan servidores…) con una puntuación de riesgo de 0 a 100 que se puede explicar, y con la procedencia de lo que aporta cada una registrada en **blockchain**.

Cuando alguien revisa el código, una de las primeras preguntas es: **¿por qué hay dos lenguajes de programación?** Una parte está en **Python** y otra en **Java**, y lo normal es elegir uno y usarlo para todo.

Es una buena pregunta, porque elegir un solo lenguaje suele ser lo correcto. En este artículo explico por qué en VeriThreat no lo es, qué precio pago por ello y la regla que evita que dos lenguajes se conviertan en dos problemas.

---

## Lo normal es elegir uno, y por buenas razones

Antes de defender mi decisión, conviene reconocer lo que tiene de bueno la contraria. Un solo lenguaje significa:

* **Una sola cadena de herramientas:** un gestor de dependencias, un sistema de tests, una forma de compilar y desplegar.
* **Código compartido:** las reglas de negocio se escriben una vez y las usa todo el sistema.
* **Un equipo más flexible:** cualquier persona puede tocar cualquier parte.
* **Menos superficie para los errores** entre piezas que hablan idiomas distintos.

Por eso, para la mayoría de aplicaciones web, como una tienda online, un gestor de reservas o un panel de administración, elegiría un único lenguaje sin dudarlo. Usar dos tiene que estar justificado por algo que uno solo no resuelva bien.

---

## Dos problemas muy distintos dentro del mismo proyecto

La clave está en que VeriThreat no es un solo tipo de software, sino dos con necesidades opuestas.

**El primero es un problema de datos y de inteligencia artificial.** Cada hora hay que descargar seis fuentes públicas de amenazas, cada una con su formato, limpiarlas, unificarlas, cargarlas en la base de datos y calcular la severidad de cientos de miles de indicadores (eran 277.000 a finales de octubre). Antes de escribir una sola línea de la plataforma, pasé semanas explorando esos datos: midiendo cuánto se solapaban las fuentes, validando una muestra de 825 indicadores con VirusTotal para saber cuánto fiarme de cada una y entrenando un modelo que estima si un dominio parece malicioso por su forma.

**El segundo es un problema de plataforma empresarial.** Hay que ofrecer una API segura a organizaciones distintas, autenticar a cada una con su clave, impedir que una se haga pasar por otra, guardar sus aportaciones con transacciones fiables y registrarlas en una red **Hyperledger Fabric**.

Cada lenguaje es especialmente bueno en uno de los dos.

---

## Por qué Python para los datos y la IA

* **El ecosistema de datos.** Con **pandas** cargo y transformo cientos de miles de filas en pocas líneas, **scikit-learn** me da el modelo y sus métricas, y **tldextract** resuelve algo tan delicado como saber cuál es el dominio "registrable" de un host. En Java existen alternativas, pero ninguna con la madurez ni la cantidad de ejemplos de estas.
* **La exploración.** La fase de datos se hizo en notebooks de Jupyter, probando hipótesis y descartando fuentes. Ese trabajo se tradujo casi directamente en los scripts que hoy se ejecutan cada hora.
* **El modelo vive donde se entrena.** Un modelo de scikit-learn solo se puede cargar con la misma versión de la librería que lo entrenó. El cálculo de la severidad, que usa el modelo, tenía que estar en Python sí o sí.
* **Ya funcionaba.** Cuando empecé la parte de Java, la ingesta horaria y la severidad llevaban más de una semana en marcha y validadas. Reescribirlas habría sido repetir trabajo para obtener lo mismo, con riesgo de introducir errores.

---

## Por qué Java para la plataforma

* **Spring es el estándar de las APIs empresariales.** Con **Spring Boot** y **Spring Cloud Gateway** tengo resueltos de forma madura la seguridad, la validación, las transacciones, la documentación de la API (OpenAPI) y las tareas programadas.
* **Hyperledger Fabric habla Java.** Fabric tiene clientes oficiales para Java, Go y Node.js, pero no para Python. Además, el contrato inteligente (chaincode) que registra las aportaciones también está escrito en Java, así que toda la parte de blockchain comparte lenguaje.
* **El cliente final.** Una plataforma así está pensada para bancos, aseguradoras o empresas de energía, donde Java es el lenguaje dominante en el backend. Que la parte que se integra con sus sistemas esté en Java facilita su adopción y su mantenimiento.
* **Tipos y tests de integración.** El tipado estricto y los tests con una base de datos PostgreSQL real (con Testcontainers) dan confianza en la parte que está expuesta a terceros.

Hay también una razón de origen: VeriThreat empezó como el proyecto final de un máster cuyo enunciado pedía microservicios en Java. Pero, viendo el resultado, volvería a elegir Java para esta parte aunque no me lo hubieran pedido.

---

## La regla que lo hace funcionar: no se llaman entre sí

Dos lenguajes en un proyecto pueden acabar en un sistema difícil de mantener: servicios que se llaman entre sí, lógica repetida en ambos lados y errores en las fronteras. Para evitarlo me fijé una regla:

> **Python ingiere y puntúa; Java expone. Se comunican solo a través de PostgreSQL.**

```
  Feeds públicos ──► Python (ingesta, modelo, severidad) ──► PostgreSQL
                                                                 ▲
  Organizaciones ──► Gateway (Java) ──► ioc-service (Java) ──────┘
                                              │
                                              └──► Hyperledger Fabric
```

Python escribe los indicadores, sus observaciones y su severidad; Java los lee, guarda lo que aportan las organizaciones y lo registra en la cadena. **Ninguno llama al otro.** El contrato entre ambos es el **esquema de la base de datos**, versionado con sus migraciones.

Esto tiene ventajas concretas:

* **Cada parte falla por separado.** Si la ingesta de Python se cae una hora, la API sigue respondiendo con los datos que había. Si la API se reinicia, la ingesta ni se entera.
* **No hay lógica duplicada.** La severidad solo se calcula en Python. Cuando una organización aporta un indicador, Java lo guarda y la severidad se recalcula en la siguiente ejecución horaria, con el mismo código que puntúa todo lo demás.
* **Cada parte escala según lo que necesita.** La ingesta es un proceso por lotes que se ejecuta una vez por hora; la API atiende peticiones en tiempo real. No tienen por qué crecer al mismo ritmo.

Valoré la alternativa típica: que Java llamara a un servicio de Python para pedirle la puntuación de cada indicador. La descarté porque la severidad no se calcula al consultar, sino por lotes, y añadir una llamada de red entre ambos solo habría creado un punto más de fallo.

---

## Lo que cuesta tener dos lenguajes

No todo son ventajas, y prefiero ser transparente con el precio:

* **Dos cadenas de herramientas:** entornos virtuales y pip por un lado, Maven por otro; dos formas de ejecutar los tests.
* **Una pieza inevitablemente duplicada: la normalización.** Para que "Evil.COM." y "evil.com" sean el mismo indicador, ambos lados tienen que escribir los valores exactamente igual: Python cuando ingiere y Java cuando recibe una aportación o una búsqueda. Si alguna vez difieren, el mismo dominio aparecería dos veces.
* **El esquema de la base de datos es sagrado.** Cualquier cambio en una tabla afecta a los dos lados, así que va siempre en una migración numerada y se prueba en ambos.
* **Quien mantenga el proyecto tiene que conocer los dos lenguajes.**

Para el riesgo de la normalización, la solución fue un fichero compartido con **35 casos de prueba** (mayúsculas, puntos finales, IPv6, URLs con espacios…). Los tests de Python y los de Java leen ese mismo fichero y deben dar exactamente el mismo resultado. Si un día alguien cambia la normalización en un lado y no en el otro, los tests fallan antes de que el error llegue a la base de datos.

---

## Comparación de las tres opciones

<div class="md-table">

| | Todo en Python | Todo en Java | Python + Java |
|---|---|---|---|
| **Datos e IA** | ✅ Ecosistema líder | ⚠️ Librerías menos maduras; reescribir lo validado | ✅ |
| **API empresarial y seguridad** | ✅ Posible (FastAPI, Django) | ✅ Spring, estándar en empresas | ✅ |
| **Cliente oficial de Hyperledger Fabric** | ❌ No existe | ✅ | ✅ |
| **Herramientas y equipo** | ✅ Uno | ✅ Uno | ⚠️ Dos |
| **Lógica duplicada** | Ninguna | Ninguna | Solo la normalización, cubierta por tests compartidos |

</div>

La opción de Python con un framework como FastAPI habría sido razonable para la API, pero la falta de un cliente oficial de Fabric y el perfil del cliente empresarial inclinaban la balanza hacia Java. Y llevar todo a Java obligaba a rehacer, con peores herramientas, la parte que ya estaba validada.

---

## Cuándo elegiría un solo lenguaje

Esta decisión no es una receta. Elegiría **un solo lenguaje** cuando:

* El proyecto es sobre todo una aplicación web con lógica de negocio, sin un núcleo de análisis de datos o de IA.
* El equipo es pequeño y no domina bien los dos.
* Las piezas necesitan llamarse constantemente entre sí, porque la frontera entre lenguajes sería una fuente continua de problemas.

Y elegiría **dos** cuando, como aquí, hay **dos problemas de naturaleza distinta** y cada lenguaje es claramente mejor en uno, siempre que se cumplan dos condiciones: que la frontera entre ambos sea **simple y estable** (en este caso, una base de datos con un esquema versionado) y que lo poco que se tenga que duplicar esté **cubierto por tests compartidos**.

---

## Conclusión

Usar dos lenguajes no fue una forma de presumir de stack, sino de dejar que cada parte del sistema se construyera con la herramienta que mejor la resuelve.

**En resumen**:
* **Python** se encarga de lo que es un problema de datos: ingesta, modelo de IA y severidad.
* **Java** se encarga de lo que es un problema de plataforma: API, autenticación por organización y blockchain.
* **No se llaman entre sí:** el único contrato es el esquema de PostgreSQL.
* Lo único duplicado, la normalización, está protegido por **35 casos de prueba compartidos**.

Si tienes un proyecto con una parte de datos o de IA y otra de plataforma, la pregunta útil no es "¿qué lenguaje uso?", sino **"¿dónde está la frontera y qué cruza por ella?"**. Si la respuesta es "muy poco y de forma estable", dos lenguajes pueden ser la decisión más sencilla, no la más complicada.
