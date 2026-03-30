---
draft: false
title: "Cuando la intuición falla: Marilyn vos Savant y pensar como un programador"
description: "La historia del problema de Monty Hall y cómo el pensamiento condicional —tan natural para los programadores— explica por qué nuestra intuición suele engañarnos."
pubDate: "2026-02-02"
heroImage: "/images/blog/blog.monty-hall.webp"
category: "Tecnología"
tags: [ Lógica, Programación, Probabilidad, Pensamiento Crítico, Desarrollo de Software ]
jsonLd: 
  "@context": "https://schema.org"
  "@graph": [
    {
      "@type": "BlogPosting",
      "headline": "Cuando la intuición falla: Marilyn vos Savant y pensar como un programador",
      "description": "La historia del problema de Monty Hall y cómo el pensamiento condicional —tan natural para los programadores— explica por qué nuestra intuición suele engañarnos.",
      "author": {
        "@type": "Person",
        "name": "Jaterli"
      },
      "datePublished": "2026-02-02T15:30:00+01:00",
      "image": "https://jaterli.com/images/blog/blog.monty-hall.webp",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://jaterli.com/blog/posts/2026/02/cuando-la-intuicion-falla-marilyn-vos-savant"
      }
    }
  ]
---

## Introducción

A veces confiamos demasiado en la intuición.  
Funciona rápido, parece lógica… y aun así puede estar rotundamente equivocada.

Hace poco descubrí la historia de **Marilyn vos Savant** y el famoso **problema de Monty Hall**, y me llamó la atención lo rápido que pude entenderlo desde una mentalidad de programador. No porque sea especialmente bueno en probabilidad, sino porque el problema no va realmente de números, sino de **condiciones, estados y reglas**.

Exactamente lo mismo que manejamos cada día cuando programamos.

---

## Marilyn vos Savant y el problema que confundió a expertos

Marilyn vos Savant es conocida por tener uno de los coeficientes intelectuales más altos jamás registrados. Durante años escribió una columna en la revista *Parade* donde respondía preguntas de lógica y matemáticas.

En los años 90 recibió una pregunta basada en el concurso televisivo *Let’s Make a Deal*:

* Hay **tres puertas**
* Detrás de una hay un coche, detrás de las otras dos hay cabras
* El concursante elige una puerta
* El presentador, que **sabe dónde está el coche**, abre otra puerta mostrando una cabra
* Entonces pregunta:  
  **¿Quieres cambiar de puerta o quedarte con la que elegiste?**

La mayoría de la gente responde de inmediato:

> Da igual, ahora es 50/50.

Marilyn respondió lo contrario:  
**conviene cambiar**, porque hacerlo duplica las probabilidades de ganar.

La reacción fue descomunal. Profesores universitarios, matemáticos y estadísticos le escribieron asegurando que estaba equivocada. Algunos incluso le pidieron que se disculpara públicamente.

El tiempo demostró que **ella tenía razón**.

---

## El verdadero escándalo: no aceptar el modelo

Lo interesante no es solo que Marilyn acertara, sino **la reacción que provocó**.

Recibió miles de cartas.  
No de personas anónimas, sino de **profesores universitarios, doctores en matemáticas y estadística**, muchos de ellos convencidos de que el error no podía estar en ellos.

Algunos ejemplos reales:

* Le explicaban “paso a paso” por qué el problema era 50/50
* Le pedían que publicara una rectificación
* Otros iban más allá y cuestionaban directamente su capacidad intelectual

No estaban discutiendo números.  
Estaban defendiendo su **modelo mental**.

Aceptar que Marilyn tenía razón implicaba admitir algo mucho más incómodo:  
que habían ignorado una condición clave del sistema.

Y eso, curiosamente, es muy humano.

---

## El error no es matemático, es de modelo mental

El fallo habitual no es no saber probabilidad, sino **ignorar las condiciones** bajo las que ocurren las acciones.

El presentador:

* No abre una puerta al azar
* Nunca abre la puerta con el coche
* Nunca abre la puerta que tú elegiste

Ese comportamiento **no es neutral**.  
Está lleno de información.

Cuando una puerta se descarta, no se “reinicia” el sistema.  
Solo se eliminan los estados imposibles.

Las probabilidades no se redistribuyen porque ahora “queden dos opciones”.

---

## Pensar como programador

Aquí es donde los programadores solemos tener ventaja sin darnos cuenta.

En desarrollo de software sabemos que:

* El estado actual depende del **camino lógico previo**
* Un `if` mal planteado rompe todo el flujo
* No todos los caminos de ejecución tienen el mismo peso

En el problema de Monty Hall ocurre exactamente lo mismo.

Si ignoras **cómo** se llegó a la situación actual, el razonamiento falla.  
Si respetas las reglas y condiciones previas, todo encaja.

No es casualidad que muchos matemáticos solo aceptaran la solución tras ver simulaciones por ordenador:  
cuando ejecutas el modelo correctamente, la realidad se impone.

---

## Pensar en estados (no en pantallas)

Esta historia me hizo recordar mi último desarrollo de un componente para **AngoTest**, mi aplicación para crear y realizar tests online con comparativas entre usuarios.

El componente debía decidir **qué hacer** cuando un usuario acepta una invitación a un test. A primera vista parecía sencillo —la aplicación habría de llevar al usuario al test en cuestión— pero el número de combinaciones reales era alto:

* Estado del test: `iniciado`, `en progreso`, `completado`
* Usuario actual: autenticado o no
* Rol del usuario: `guest` o `user`
* Si el usuario que inició el test (`guest_user`) es el mismo o no que el usuario que lo retoma
* Si el test fue iniciado como invitado (`is_guest`)
* Si el test ha expirado o sigue vigente

Visualmente, muchas situaciones parecían equivalentes.  
Lógicamente, no lo eran.

---

## El error intuitivo: “esto es equivalente”

Al igual que en Monty Hall, es fácil caer en razonamientos del tipo:

> Si el test está completado, solo hay que mostrar resultados.

Pero eso ignora **cómo se llegó a ese estado**.

Un test completado:

* Como invitado
* Con un usuario autenticado
* Con un usuario distinto al actual
* Con transferencia pendiente de resultados del usuario invitado inicial al usuario posteriormente registrado

No es un único estado.  
Es una **familia de estados** con reglas distintas.

---

## La solución: reglas explícitas, no intuición

En lugar de pensar en términos de “pantallas” o “botones”, el enfoque correcto fue tratar el componente como una **máquina de estados**.

La lógica real se parecía más a esto:

```text
SI el usuario está autenticado
  SI el test está en progreso
    SI el usuario actual no es el usuario original
      SI el test se inició como invitado
        → Transferir resultados al usuario autenticado y continuar
      SINO
        → Redirigir a login
    SINO
      → Continuar test
  SI el test está completado
    SI el usuario actual no es el original
      SI el test fue como invitado
        → Transferir resultados
      SINO
        → Pedir autenticación
    SINO
      → Mostrar resultados
SINO
  SI el test está en progreso o completado
    SI fue iniciado como invitado
      → Continuar como invitado
    SINO
      → Pedir autenticación
  SINO
    → Iniciar test como invitado
```

No es corto.
No es especialmente bonito.
Pero **es correcto**.

---

## El paralelismo con Monty Hall

En Monty Hall:

* El presentador no actúa al azar
* Su acción elimina estados imposibles
* La probabilidad restante **no se redistribuye**
* El historial importa

En este componente:

* El sistema no muestra opciones “neutrales”
* Cada decisión depende del camino previo
* Ignorar una condición rompe la lógica
* El estado final no cuenta toda la historia

Cambiar de puerta en Monty Hall
es lo mismo que **aceptar una invitación sabiendo quién inició el test y cómo**.

---

## Programar es modelar la realidad (no simplificarla)

La intuición humana tiende a comprimir:

> Dos opciones → 50/50   
> Test completado → mostrar resultados

Pero el software no puede permitirse esa simplificación.

Un buen sistema:

* No adivina
* No reparte probabilidades por comodidad
* No ignora información previa

Solo elimina lo imposible
y respeta las reglas.

---

## Conclusión

Marilyn vos Savant no ganó el debate por saber más matemáticas.
Ganó porque **modeló correctamente el problema**.

Y eso es exactamente lo que hacemos cuando programamos bien:

* Definimos estados
* Aplicamos condiciones
* Eliminamos caminos inválidos
* Dejamos que el modelo decida

La intuición es rápida.
El pensamiento condicional es fiable.

Y cuando un sistema empieza a parecer “complicado”, muchas veces no es complejidad…
es simplemente **la realidad, correctamente modelada**.

---

## Epílogo: por qué vale la pena conocer a Marilyn vos Savant

La historia de Marilyn vos Savant no es solo la de un problema famoso.
Es la historia de alguien que se mantuvo firme cuando la intuición colectiva —y la autoridad— estaban equivocadas.

No porque fuera infalible,
sino porque **respetó el modelo completo**, incluso cuando el resultado parecía contraintuitivo.

Si este tema te ha parecido interesante, vale mucho la pena investigar más sobre su vida, su trabajo y los debates que generó.
No tanto por el problema de Monty Hall,
sino por lo que revela sobre cómo pensamos, cómo discutimos…
y lo difícil que es aceptar que nuestra intuición, a veces, falla.
