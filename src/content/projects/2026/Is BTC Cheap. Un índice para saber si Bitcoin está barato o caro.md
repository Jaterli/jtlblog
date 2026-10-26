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
* **Liquidez:** mide si entra o sale dinero del sistema financiero (liquidez de la Reserva Federal, masa monetaria M2, fuerza del dólar y oferta de stablecoins).
* **Sentimiento:** el miedo o la euforia de los inversores (Fear & Greed Index) y el apalancamiento en los mercados de futuros (funding rate).
* **Análisis técnico:** RSI, bandas de Bollinger y distancia a la media de 200 velas (48 en la temporalidad mensual), calculados en vivo.

Cada métrica se convierte en una puntuación de 0 a 100 según su **percentil en los últimos 4 años**, un ciclo completo de halving. Así cada dato se compara solo con su pasado reciente, y no con las burbujas de 2013 o 2017, cuando el mercado era mucho más pequeño y volátil.

El índice se puede consultar en **cinco temporalidades**, de 1 hora a 1 mes. Los pesos cambian según la temporalidad: en las cortas pesan más el técnico y el sentimiento; en las largas, la valoración y el ciclo.

---

## Más allá del número

Un número solo no cuenta toda la historia, así que la plataforma añade contexto:

* **Histórico del score frente al precio** desde 2011, con zoom y desplazamiento, para ver dónde marcó el índice los suelos y techos de cada ciclo.
* **"Qué hizo el precio después":** toma los días del histórico con un score parecido al actual y muestra qué hizo Bitcoin al cabo de 1, 3, 6 y 12 meses (mediana, porcentaje de veces que subió y mejor y peor caso). También indica cuántos episodios independientes hay detrás de cada cifra, porque Bitcoin solo tiene unos pocos ciclos completos y conviene saber cuánto pesa cada dato.
* **Volatilidad:** cuánto se ha movido el precio en el último mes comparado con los últimos 4 años.
* **Explicaciones en cada métrica:** qué mide y cómo interpretarla, para que el índice no sea una caja negra.

La plataforma está disponible en **español e inglés**.

> **Importante:** Is BTC Cheap? describe datos, no da recomendaciones. No es asesoramiento financiero.

---

## Cómo está construida

Uno de los objetivos era que funcionara **con un coste mínimo** y sin consumir cuotas de APIs con cada visita:

* **Pipeline diario en Python (pandas):** una GitHub Action descarga cada noche los datos de Coin Metrics, Alternative.me, FRED y DefiLlama, calcula las métricas y los percentiles, y guarda el resultado en dos ficheros JSON en el repositorio.
* **Frontend en React + TypeScript (Vite):** la web lee esos JSON directamente del repositorio, así que los datos del día llegan sin redesplegar nada. Las métricas rápidas (técnico y funding rate) las calcula el propio navegador con la API pública de Binance.
* **Despliegue:** contenedor Docker con nginx en un droplet de DigitalOcean, detrás del mismo reverse proxy que uso para mis otros proyectos.

> **Nota:** la plataforma se ha desarrollado con la ayuda de **[Claude Code](https://www.anthropic.com/claude-code)**, el asistente de programación con IA de Anthropic.

---

## Lo que aprendí por el camino

Construir un indicador fiable tiene más trampas de las que parece. Algunos ejemplos que encontré y corregí:

* **Fuentes desfasadas un día:** Coin Metrics publica algunas series (como el MVRV) un día más tarde que el precio. Sin tenerlo en cuenta, el último día se calculaba solo con una parte de la valoración.
* **Saltos al cambiar de temporalidad:** el score pasaba brevemente por valores intermedios mientras llegaban los datos de la nueva temporalidad. Ahora se mantiene el último valor hasta tener los datos correctos.
* **Estadística honesta:** un primer diseño de la sección "Qué hizo el precio después" daba cifras que parecían más sólidas de lo que eran. Rehacerla para mostrar el tamaño real de la muestra fue una lección sobre cómo presentar datos sin engañar.

---

## Tu opinión cuenta

La plataforma sigue creciendo y **me encantaría conocer tu opinión**. Si echas en falta alguna métrica, algo no se entiende bien o tienes una idea para mejorarla, escríbeme o déjamela en los comentarios de mis redes.

Y si te resulta útil, puedes **apoyar el proyecto** desde la sección **"Apoya el proyecto"** de la propia web, con PayPal o con Bitcoin. Ayuda a mantenerlo gratuito y en marcha.

👉 **[Visita Is BTC Cheap?](https://isbtccheap.com/)**
