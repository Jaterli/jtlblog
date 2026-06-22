---
draft: false
title: "Conseguí el Certificado de Agent Harness"
description: "Acabo de superar con éxito el examen de evaluación para obtener el certificado de Agent Harness impartido por la academia Conquer Blocks."
pubDate: "2026-06-22"
heroImage: "/certifications/Certificado-de-Agent-Harness.png"
category: "Blog"
tags: [Certificado, Agent Harness, IA, Agentes CLI]
jsonLd: 
    "@context": "https://schema.org"
    "@graph": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Certificado de Agent Harness",
        "description": "Certificación en Agent Harness de Academia Conquer Blocks",
        "dateIssued": "2026-06-22",
        "recognizedBy": {
          "@type": "Organization",
          "name": "Academia Conquer Blocks"
        },
        "image": "https://jaterli.com/certifications/Certificado-de-Agent-Harness.png"
      },
      {
        "@type": "BlogPosting",
        "headline": "He aprobado el Certificado de Agent Harness",
        "description": "Acabo de superar con éxito el examen de evaluación para obtener el certificado de Agent Harness.",
        "datePublished": "2026-06-22T00:00:00+01:00",
        "image": "https://jaterli.com/certifications/Certificado-de-Agent-Harness.png",
        "author": {
          "@type": "Person",
          "name": "Jaime TL",
          "url": "https://jaterli.com"
        },
        "mainEntity": {
          "@type": "EducationalOccupationalCredential",
          "name": "Certificado de Agent Harness"
        }
      }
    ]
---

Hoy quiero compartir un logro personal que me hace especialmente ilusión: **he superado con éxito el examen de evaluación del módulo Agent Harness** impartido por la academia **Conquer Blocks**, dentro del Máster de Desarrollo Web Full Stack. Para lograrlo había que acertar al menos el **80%** en un test de 33 preguntas que cubría desde los fundamentos de los modelos de IA hasta la implementación práctica de agentes, memoria, herramientas y protocolos como MCP.

Este certificado no es solo un papel. Representa haber profundizado una de las áreas más **revolucionarias** y **estratégicas** del desarrollo de software actual: **cómo construir agentes de IA que realmente pueden interactuar con el mundo exterior, recordar, razonar y ejecutar tareas de forma autónoma y segura**.

---

## ¿Qué he aprendido exactamente?

El módulo ha sido un viaje desde los cimientos hasta la arquitectura completa de un agente de IA. Estos son algunos de los conceptos clave que he asimilado y que me han hecho ver el potencial inmenso de esta tecnología:

- **La naturaleza stateless de los LLM** y cómo el *Agent Harness* (la capa de software que envuelve al modelo) le otorga memoria, herramientas y control.
- **Los distintos tipos de memoria** que puede tener un agente: episódica (historial de conversación), contextual (ventana de tokens), procedimental (cómo hacer las cosas, a través de *Skills*) y semántica (RAG y Knowledge Graphs).
- **El protocolo MCP (Model Context Protocol)**, un estándar impulsado por Anthropic y ahora en la Linux Foundation, que permite conectar agentes con herramientas externas de forma estandarizada (*Tools*, *Resources* y *Prompts*).
- **El patrón ReAct** (Thought → Action → Observation), que dota al agente de un bucle de razonamiento para decidir qué acciones tomar y aprender de los resultados.
- **La implementación práctica de RAG** con Qdrant, generando embeddings con modelos como *BAAI/bge-small-en-v1.5*, y la importancia del *chunking*, la métrica de similitud y la inyección de contexto en el prompt.
- **La filosofía minimalista de Pi Agent**, basada en pocas herramientas potentes como `read`, `write`, `edit` y `bash`, y cómo las *Skills* permiten extender su comportamiento sin sobrecargar el sistema.
- **La seguridad y control** mediante *guardrails* (validación de entradas y salidas) y *sandboxes* (entornos aislados para ejecución de código).

Todo esto, además, acompañado de ejemplos prácticos en notebooks y código Python que me han permitido ver el funcionamiento real de estos conceptos.

---

## ¿Por qué es importante esta tecnología hoy?

Vivimos en un momento en el que la IA ha dejado de ser un asistente pasivo para convertirse en un **agente activo** capaz de planificar, ejecutar y aprender. Esto no es ciencia ficción; es una realidad que ya está transformando la forma en que se desarrollan aplicaciones y se resuelven problemas complejos.

### Los agentes de IA son el siguiente salto

- **Automatización inteligente:** Ya no se trata de scripts fijos, sino de sistemas que entienden el contexto, deciden qué herramientas usar y ejecutan tareas de principio a fin.
- **Personalización masiva:** Con memoria persistente y RAG, los agentes pueden recordar preferencias, historiales y datos específicos de cada usuario.
- **Acceso a datos y acciones del mundo real:** Gracias a protocolos como MCP, los agentes pueden leer y escribir en bases de datos, gestionar documentos, enviar correos, controlar sistemas externos… todo con un estándar unificado.
- **Reducción de barreras técnicas:** Cada vez más, los agentes permiten a personas sin conocimientos profundos de programación resolver problemas complejos simplemente describiéndolos en lenguaje natural.

Empresas como **Anthropic** (con Claude Code), **Microsoft** (Copilot), **OpenAI** (ChatGPT) o **Google** (Gemini) ya están invirtiendo masivamente en esta dirección. No es una moda: es el **nuevo paradigma** del desarrollo de software.

---

## Mi experiencia previa y mi visión de futuro

Hasta ahora, ya había trabajado con APIs de IA en mi proyecto **AngoTest**, donde genero tests educativos de forma automática en cuestión de segundos. Esa experiencia me permitió ver el potencial inmediato de la IA generativa, pero siempre desde una perspectiva de **consumo de modelos** (input → output).

Este módulo me ha abierto los ojos a un **universo mucho más grande**: el de los agentes que no solo generan texto, sino que **razonan, recuerdan, deciden y actúan**. La posibilidad de combinar:

- **Memoria persistente** (RAG + Knowledge Graphs)
- **Herramientas estandarizadas** (MCP)
- **Razonamiento estructurado** (ReAct, Chain of Thought, tokens intermedios como espacio de computación)
- **Seguridad y control** (guardrails, sandboxes)

… me ha hecho comprender que estamos ante una **nueva capa de abstracción** en la programación, tan importante como lo fueron en su día los sistemas operativos o las bases de datos relacionales.

Mi objetivo ahora es claro: **profundizar al máximo en este campo**. Quiero exprimir todos los recursos que ofrece el ecosistema de agentes de IA e incorporarlos en futuros proyectos personales y profesionales. Desde asistentes inteligentes personalizados hasta sistemas de automatización complejos, pasando por integraciones con datos empresariales y flujos de trabajo colaborativos.

---

## Conclusión: estar al día marca la diferencia

Soy consciente de que el mundo del desarrollo avanza a una velocidad vertiginosa, y la IA está acelerando ese ritmo. Pero también sé que **quien domina estas tecnologías se convierte en un activo diferencial** para cualquier equipo o empresa.

Lo que he obtenido de este módulo no es solo un certificado, es la confirmación de que voy por el camino correcto y de que debo seguir formándome, experimentando y compartiendo lo que aprendo.
