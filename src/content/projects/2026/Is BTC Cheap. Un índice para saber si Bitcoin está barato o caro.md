---
title: "Is BTC Cheap?: un índice para saber si Bitcoin está barato o caro"
description: "Presento Is BTC Cheap?, una plataforma gratuita que resume en un índice de 1 a 100 si Bitcoin está barato o caro, combinando valoración on-chain, ciclo, liquidez, sentimiento y análisis técnico."
pubDate: "2026-10-23"
heroImage: "/images/proyectos/projects.isbtccheap.png"
tags: [Bitcoin, React, TypeScript, Python, Pandas, GitHub Actions, Docker, Análisis de Datos, Claude Code]
jsonLd:
  "@context": "https://schema.org"
  "@type": "SoftwareApplication"
  "name": "Is BTC Cheap?"
  "applicationCategory": "FinanceApplication"
  "operatingSystem": "Web"
  "description": "Plataforma gratuita que resume en un índice de 1 a 100 si Bitcoin está barato o caro, combinando valoración on-chain, ciclo, liquidez, sentimiento y análisis técnico."
  "image": "https://jaterli.com/images/proyectos/projects.isbtccheap.png"
  "url": "https://jaterli.com/proyectos/entry/2026/is-btc-cheap-un-indice-para-saber-si-bitcoin-esta-barato-o-caro/"
  "sameAs": "https://isbtccheap.com/"
  "author": {
    "@type": "Person",
    "name": "Jaime TL"
  }
  "datePublished": "2026-10-23"
  "programmingLanguage": [
    "TypeScript",
    "Python"
  ]
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  }
---

## Introducción

Quien sigue Bitcoin acaba haciéndose siempre la misma pregunta: **¿está caro o barato ahora mismo?** Para responderla hay decenas de indicadores (MVRV, Puell Multiple, Fear & Greed, medias móviles…), cada uno en una web distinta y con su propia escala. Consultarlos todos lleva tiempo, y al final cuesta sacar una conclusión.

Con esa idea nació **[Is BTC Cheap?](https://isbtccheap.com/)**: una plataforma gratuita y sin publicidad que combina esos indicadores en **un único índice de 1 (muy barato) a 100 (muy caro)**.

---

## Qué mide

El índice reúne cinco categorías de datos:

* **Valoración on-chain:** compara el precio con lo que "vale" la red según la blockchain (MVRV, Puell Multiple y Mayer Multiple).
* **Ciclo:** sitúa el momento actual dentro del ciclo de unos 4 años que marcan los halvings y respecto a la tendencia de largo plazo de Bitcoin.
* **Liquidez:** mide si entra o sale dinero del sistema financiero: liquidez global de los grandes bancos centrales (Reserva Federal, BCE y Banco de Japón, en dólares), masa monetaria M2, fuerza del dólar y oferta de stablecoins.
* **Sentimiento:** el miedo o la euforia de los inversores (Fear & Greed Index), si quienes compraron hace poco venden con ganancia o con pérdida (SOPR de corto plazo), el dinero que entra o sale de los ETF de bitcoin al contado y el apalancamiento en los mercados de futuros (funding rate). En las temporalidades de 1 y 4 horas se usan además datos de derivados en vivo: open interest y ratios long/short y de compra/venta de los futuros.
* **Análisis técnico:** RSI, bandas de Bollinger y distancia a la media de 200 velas (48 en la temporalidad mensual), calculados en vivo.

Cada métrica se convierte en una puntuación de 0 a 100 según su **percentil en los últimos 4 años**, un ciclo completo de halving. Así cada dato se compara solo con su pasado reciente, y no con las burbujas de 2013 o 2017, cuando el mercado era mucho más pequeño y volátil.

La media de cinco señales poco relacionadas entre sí tiende a quedarse cerca de 50, así que el resultado final se "estira" para que los extremos sean alcanzables: los suelos de 2015, 2018, 2020 y 2022 quedan en torno a 8, y los techos de cada ciclo entre 78 y 97.

El índice se puede consultar en **cinco temporalidades**: 1 hora, 4 horas, 1 día, 1 semana y 1 mes. Los pesos cambian según la temporalidad: en las cortas pesan más el técnico y el sentimiento; en las largas, la valoración y el ciclo.

---

## Más allá del número

Un número solo no cuenta toda la historia, así que la plataforma añade contexto:

* **Histórico del score frente al precio** desde 2011, con zoom y desplazamiento, para ver dónde marcó el índice los suelos y techos de cada ciclo. En el rango de 6 meses se puede ver también **con velas de 4 horas**: el score de esa temporalidad recalculado vela a vela solo con lo que se sabía en cada momento.
* **"Qué hizo el precio después":** toma los días del histórico con un score parecido al actual y muestra qué hizo Bitcoin al cabo de 1, 3, 6 y 12 meses (mediana, porcentaje de veces que subió y mejor y peor caso). También indica cuántos episodios independientes hay detrás de cada cifra, porque Bitcoin solo tiene unos pocos ciclos completos y conviene saber cuánto pesa cada dato.
* **Volatilidad:** cuánto se ha movido el precio en el último mes comparado con los últimos 4 años.
* **Noticias y agenda económica:** las 10 noticias de más impacto de las últimas 48 horas, seleccionadas y traducidas con IA a partir de siete medios (Cointelegraph, CoinDesk, Decrypt, Investing.com, CNBC, BBC y la Reserva Federal), y los datos económicos y decisiones de tipos de la semana que más pueden mover el precio, con el dato real en cuanto se publica.
* **Explicaciones en cada métrica:** qué mide y cómo interpretarla, para que el índice no sea una caja negra. También hay una sección de preguntas frecuentes.

Además del índice, la web tiene **páginas temáticas** para profundizar en cada aspecto del mercado:

* **Liquidez:** la liquidez global de los bancos centrales, adelantada 13 semanas, frente al precio, para ver si se anticipa a él.
* **ETF:** el dinero que entra o sale cada día de los ETF de bitcoin al contado de EE. UU.
* **Volatilidad:** cuánto se mueve el precio según el tamaño de vela.
* **Valoración:** el precio frente a sus niveles de largo plazo (precio realizado, media de 200 semanas y tendencia de la power law).
* **Caídas:** cuánto está Bitcoin por debajo de su máximo histórico, cómo se compara con las grandes caídas anteriores y cuánto tiempo lleva sin caer o subir un 5 %, un 10 % o más.
* **Categorías:** la evolución de las cinco categorías del índice desde 2011 y qué marcaban en cada techo y suelo.
* **Ciclos:** el ciclo actual frente a los de 2012, 2016 y 2020, contados desde cada halving.

La plataforma está disponible en **español e inglés**.

> **Importante:** Is BTC Cheap? describe datos, no da recomendaciones. No es asesoramiento financiero.

---

## Cómo está construida

Uno de los objetivos era que funcionara **con un coste mínimo** y sin consumir cuotas de APIs con cada visita:

* **Pipeline diario en Python (pandas):** una GitHub Action descarga cada noche los datos de Coin Metrics, Alternative.me, FRED, DefiLlama, Bitview (SOPR y precio realizado) y The Commoner Bitcoin ETF Tracker (flujos de ETF), calcula las métricas y los percentiles, y guarda el resultado en ficheros JSON en el repositorio.
* **Frontend en React + TypeScript (Vite):** la web lee esos JSON directamente del repositorio, así que los datos del día llegan sin redesplegar nada. Las métricas rápidas (técnico, funding rate y, en 1 y 4 horas, los derivados) las calcula el propio navegador con la API pública de Binance.
* **Noticias y agenda con IA:** dos scripts en Python, programados con cron en el servidor, leen los titulares de los feeds RSS y el calendario de Forex Factory. Un modelo de lenguaje de la inferencia serverless de DigitalOcean clasifica las noticias por impacto, descarta las repetidas y las traduce. Cuesta 1-2 $ al mes.
* **Despliegue:** contenedor Docker con nginx en un droplet de DigitalOcean, detrás del mismo reverse proxy que uso para mis otros proyectos. Cada página tiene su propio contenido para buscadores e imágenes para compartir en redes.

> **Nota:** la plataforma se ha desarrollado con la ayuda de **[Claude Code](https://www.anthropic.com/claude-code)**, el asistente de programación con IA de Anthropic.

---

## Lo que aprendí por el camino

Construir un indicador fiable tiene más trampas de las que parece. Algunos ejemplos que encontré y corregí:

* **Fuentes desfasadas un día:** Coin Metrics publica algunas series (como el MVRV) un día más tarde que el precio. Sin tenerlo en cuenta, el último día se calculaba solo con una parte de la valoración.
* **Saltos al cambiar de temporalidad:** el score pasaba brevemente por valores intermedios mientras llegaban los datos de la nueva temporalidad. Ahora se mantiene el último valor hasta tener los datos correctos.
* **Estadística honesta:** un primer diseño de la sección "Qué hizo el precio después" daba cifras que parecían más sólidas de lo que eran. Rehacerla para mostrar el tamaño real de la muestra fue una lección sobre cómo presentar datos sin engañar.
* **No toda métrica suma:** antes de añadir una métrica compruebo si mejora la capacidad del índice para anticipar el precio a un año vista. El precio realizado de corto plazo, por ejemplo, la empeoraba (se comporta como una señal de momentum), así que solo aparece en la página de valoración y no cuenta en el score. Con los flujos de ETF pasó algo parecido: medidos en 5 o 10 sesiones también eran momentum, y por eso se usan 20.
* **Mejor la liquidez global que la de la Fed:** la suma de la Reserva Federal, el BCE y el Banco de Japón anticipaba el año siguiente el doble de bien que la liquidez de la Fed sola, así que la sustituyó.

---

## Tu opinión cuenta

La plataforma sigue creciendo y **me encantaría conocer tu opinión**. Si echas en falta alguna métrica, algo no se entiende bien o tienes una idea para mejorarla, escríbeme o déjamela en los comentarios de mis redes.

Y si te resulta útil, puedes **apoyar el proyecto** desde la sección **"Apoya el proyecto"** de la propia web, con PayPal o con Bitcoin. Ayuda a mantenerlo gratuito y en marcha.

👉 **[Visita Is BTC Cheap?](https://isbtccheap.com/)**
