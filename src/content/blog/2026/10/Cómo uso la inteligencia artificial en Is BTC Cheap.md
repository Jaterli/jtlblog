---
draft: false
title: "Cómo uso la inteligencia artificial en Is BTC Cheap?"
description: "La IA en Is BTC Cheap? no decide si Bitcoin está barato o caro: selecciona y traduce noticias, traduce la agenda económica y redacta un análisis diario del precio que valido antes de publicarlo. Así lo he diseñado, qué modelos uso y cuánto cuesta."
pubDate: "2026-10-31"
heroImage: "/images/proyectos/projects.isbtccheap.png"
category: "Desarrollo Web"
tags: [Inteligencia Artificial, LLM, Bitcoin, Python, Claude Code, Gemini, DigitalOcean]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Cómo uso la inteligencia artificial en Is BTC Cheap?",
      "description": "La IA en Is BTC Cheap? no decide si Bitcoin está barato o caro: selecciona y traduce noticias, traduce la agenda económica y redacta un análisis diario del precio que valido antes de publicarlo.",
      "author": {
        "@type": "Person",
        "name": "Jaime TL"
      },
      "datePublished": "2026-10-31T00:00:00+01:00",
      "image": "https://jaterli.com/images/proyectos/projects.isbtccheap.png",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2026/10/como-uso-la-inteligencia-artificial-en-is-btc-cheap/"
      }
    }
  ]
---

## Introducción

**[Is BTC Cheap?](https://isbtccheap.com/)** es una plataforma que ideé para responder a una pregunta muy concreta: **¿está Bitcoin barato o caro ahora mismo?** La respuesta es un índice de 1 a 100 que combina valoración on-chain, ciclo, liquidez, sentimiento y análisis técnico. Si quieres conocer el proyecto completo, lo presenté en **[este artículo](/proyectos/entry/2026/is-btc-cheap-un-indice-para-saber-si-bitcoin-esta-barato-o-caro/)**.

Hoy quiero contar algo distinto: **cómo uso la inteligencia artificial** dentro de él. Es fácil caer en la tentación de "ponerle IA" a todo, así que desde el principio me marqué una regla: **la IA solo entra donde aporta algo que un algoritmo clásico no puede hacer bien**, y siempre con controles para que un error del modelo no llegue a la web.

---

## Donde NO hay IA: el índice

Lo primero es lo que la IA **no hace**: **no calcula el índice**.

El score de 1 a 100 sale de un pipeline en Python que se ejecuta cada noche: descarga los datos, calcula cada métrica y la convierte en un percentil frente a los últimos 4 años. Es **determinista y reproducible**: con los mismos datos da siempre el mismo resultado, y puedo comprobar cómo se habría comportado en cada techo y suelo desde 2011.

Un modelo de lenguaje no ofrece esas garantías. Por eso la parte central del proyecto, la que responde a la pregunta del nombre, se basa solo en datos y estadística.

---

## 1. Noticias: clasificar, eliminar duplicados y traducir

La web muestra las **10 noticias que más pueden mover el precio de Bitcoin** en las últimas 48 horas. Cada 15 minutos, un script lee los feeds RSS de siete medios (Cointelegraph, CoinDesk, Decrypt, Investing.com, CNBC, BBC y la Reserva Federal) y la IA hace tres tareas, **cada una en su propia llamada**:

1. **Clasificar:** asigna a cada titular una categoría (macro, geopolítica, flujos, cripto…) y un **impacto de 0 a 10** según cuánto puede mover el precio en horas o días.
2. **Eliminar duplicados:** cuando varios medios cuentan el mismo hecho, los agrupa y se queda con uno.
3. **Traducir:** pasa al español solo las noticias que se van a publicar.

Algunas decisiones de diseño:

* **Una tarea por llamada.** Con modelos abiertos, pedirlo todo a la vez daba resultados menos fiables. Separado, cada respuesta es más sencilla y más fácil de validar.
* **No pagar dos veces por lo mismo.** Cada titular clasificado se recuerda durante 7 días, así que solo se envían al modelo los nuevos. Y la traducción solo se paga para las 10 que se publican.
* **Salidas estructuradas.** Cada llamada exige una respuesta JSON con un esquema estricto, así que el script recibe siempre datos con el formato esperado, no texto libre que interpretar.
* **El impacto se diluye.** La prioridad de cada noticia es su impacto menos su antigüedad: una noticia de hace dos días, por importante que fuera, deja sitio a las nuevas.

La **agenda económica** de la semana (datos de empleo, inflación, decisiones de tipos…) usa la misma idea: la IA traduce el nombre de cada evento la primera vez que aparece y la traducción se guarda. Como los eventos se repiten cada mes, casi nunca hace falta volver a llamar al modelo.

---

## 2. El análisis diario del precio

La funcionalidad más reciente es la página de **[Análisis](https://isbtccheap.com/analisis/)**: un análisis breve de la situación de Bitcoin que se genera de lunes a viernes a las 10:00 y a las 17:00, y los domingos a las 18:00 (hora de Madrid). Incluye:

* Un **resumen** de la situación y las claves que están moviendo el precio.
* De **1 a 3 zonas de soporte y de resistencia**, con su fuerza.
* El **sesgo** del mercado y la confianza en él.
* **Lo más probable en las próximas horas y en 1-2 días**, con su precio objetivo y el precio que invalidaría ese escenario, más un **escenario alternativo**.

La web dibuja todo esto sobre el gráfico de velas: las zonas como bandas de color y los escenarios como flechas.

### Qué recibe el modelo

Aquí tomé una decisión importante: **el modelo recibe datos en bruto, nunca mis conclusiones**. No le paso niveles calculados ni le digo si el mercado está alcista; recibe:

* Velas diarias, de 4 horas y de 1 hora.
* Datos de derivados: funding rate, open interest, porcentaje de cuentas en largo y ratio de compras y ventas a mercado.
* El Fear & Greed Index y los flujos de los ETF de las últimas 20 sesiones.
* Los **titulares de impacto medio y alto** de las últimas 48 horas, que ya clasifica el sistema de noticias.
* La **agenda económica de la semana**, con la previsión y el dato real cuando ya se ha publicado.
* La fecha y la hora, y si la bolsa de EE. UU. está abierta.

Con eso, **el análisis es suyo**: el modelo decide qué factores pesan más.

### ¿Por qué darle los datos en vez de dejar que busque en internet?

Lo valoré, e incluso lo probé con la búsqueda integrada de Gemini. Me quedé con pasarle los datos por varias razones:

* **Control:** sé exactamente con qué información trabaja y de qué momento es.
* **Reproducibilidad:** cada análisis se guarda en un registro, y puedo revisar después qué datos tenía y cuánto acertó.
* **Coste:** la búsqueda con Gemini requiere un plan de pago; con los datos, cada análisis cuesta una fracción de céntimo.

### Lo que decidí NO darle

También es importante lo que se queda fuera:

* **Datos de liquidaciones.** Llegué a integrar las liquidaciones de varios exchanges a través de APIs externas, pero las retiré: cuando hay liquidaciones fuertes ya aparecen en los titulares, y quitarlas hacía el código más simple y la consulta más barata.
* **Mis propias ideas sobre el mercado.** Por ejemplo, el precio de Bitcoin suele moverse poco los fines de semana. En vez de decírselo al modelo, lo que sesgaría su análisis, le paso un dato neutral: la hora y si la bolsa está abierta. Si lo considera relevante, lo tendrá en cuenta.

### Validar antes de publicar

Un modelo de lenguaje puede equivocarse con total seguridad, así que **ninguna respuesta se publica sin pasar controles**:

* El precio que cita el modelo debe estar a menos de un 3 % del precio real en Binance.
* Los soportes deben estar por debajo del precio y las resistencias por encima, a una distancia y con una anchura razonables, y como mucho 3 de cada lado.
* La dirección de cada escenario se deduce del objetivo: un escenario "alcista" con un objetivo por debajo del precio no se sostiene.
* Los objetivos no pueden estar fuera de un rango realista, y el escenario alternativo debe ir en una dirección distinta del principal.

Si una respuesta no supera los controles, **se pasa al siguiente modelo**. Y si ninguno sirve, la web mantiene el último análisis válido.

### Elegir el modelo

Probé varios modelos con exactamente los mismos datos y comparé sus respuestas:

* **GLM-5.3 Flash** (inferencia serverless de DigitalOcean) dio el análisis más completo y preciso. Es el principal.
* **Qwen 3.5** es el primer respaldo.
* **Gemini 3.5 Flash** acertó también, aunque con menos detalle, y queda como último respaldo usando su nivel gratuito.
* Otros, como **DeepSeek V4 Flash**, interpretaban mal la tendencia de los datos de derivados, así que los descarté.

La comparación me enseñó que no basta con elegir "el mejor modelo" en abstracto: hay que **probarlos con tus datos y tu tarea**. Fue así como detecté, por ejemplo, que algunos proponían un escenario alternativo en la misma dirección que el principal, y añadí la validación correspondiente.

---

## Cuánto cuesta

Uno de mis objetivos era que el proyecto fuera **sostenible con un coste mínimo**:

* **Noticias y agenda:** 1-2 $ al mes.
* **Análisis diario:** unos 0,35 $ al mes.
* **Gemini**, cuando hace falta como respaldo, dentro de su nivel gratuito.

Menos de lo que cuesta un café al mes por toda la IA de la plataforma.

---

## La IA como herramienta de desarrollo

Además de usar IA *dentro* del proyecto, la he usado *para construirlo*. He desarrollado Is BTC Cheap? con la ayuda de **[Claude Code](https://www.anthropic.com/claude-code)**, el asistente de programación de Anthropic.

La idea, el enfoque del índice y cada decisión de producto son míos: qué métricas entran y cuáles no, cómo se presenta la información, qué datos recibe el análisis o qué se queda fuera. Claude Code me ha permitido avanzar mucho más rápido en la implementación, investigar alternativas (APIs, modelos, costes) y comparar opciones antes de decidir. Pero **la dirección la marco yo**, y reviso cada cambio antes de publicarlo.

Creo que esa es la forma sensata de trabajar con IA hoy: como un compañero muy capaz, no como un sustituto del criterio propio.

---

## Transparencia y responsabilidad

Publicar contenido generado por IA sobre un activo financiero exige ser claro con quien lo lee:

* La web indica qué contenido genera la IA y con qué modelo se ha hecho cada análisis.
* Los textos hablan de **probabilidades y escenarios, nunca de certezas**, y el modelo tiene instrucciones de no dar recomendaciones de compra o venta.
* El **[aviso legal](https://isbtccheap.com/aviso-legal/)** recuerda que nada de esto es asesoramiento financiero y que el contenido automático puede contener errores.

---

## Conclusión

La IA en Is BTC Cheap? cumple tres funciones concretas: **filtrar el ruido** de las noticias, **traducir** y **redactar un análisis** que valido antes de publicar. El índice, que es el corazón del proyecto, sigue siendo pura estadística.

**En resumen**:
* La IA se usa **solo donde aporta valor** que un algoritmo clásico no da.
* Recibe **datos en bruto y no conclusiones**, para que su análisis sea independiente.
* **Nada se publica sin validar**, y si un modelo falla hay respaldo.
* Todo funciona por **menos de 3 $ al mes**.

Si te interesa ver el resultado, pásate por **[isbtccheap.com/analisis](https://isbtccheap.com/analisis/)**. Y si tienes ideas para mejorarlo, me encantará leerlas.
