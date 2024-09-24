---
draft: false
title: "Rust como parte de mi aprendizaje"
description: "Al poco de comenzar a estudiar Rust, me di cuenta de su importancia y me surgió la motivación de profundizar en él."
pubDate: "2024-09-21"
heroImage: "/assets/images/blog/blog.Rust.webp"
category: "Máster en Desarrollo Blockchain"
tags: [blog, Rust]
---

Desde que comencé el módulo de Rust en mi Máster de Desarrollo de Blockchain, he ido descubriendo las grandes capacidades y ventajas que ofrece este lenguaje de programación. Aunque al principio puede parecer desafiante, estoy disfrutando mucho el proceso de aprendizaje, especialmente por la claridad y precisión con la que Rust gestiona la memoria y garantiza la seguridad del código. Me ha sorprendido gratamente lo eficiente que es, y ya puedo decir que me ha motivado a profundizar aún más allá de lo que el máster pueda ofrecerme, con el objetivo de convertirme en un desarrollador avanzado de Rust.

### Ventajas de Rust que me han llamado la atención:

1. **Seguridad en la memoria sin un recolector de basura**: Una de las principales fortalezas de Rust es su sistema de propiedad y "borrowing[^1]", que evita errores comunes como el uso indebido de punteros y fugas de memoria, todo sin necesidad de un garbage collector[^2]. Esto garantiza un rendimiento muy alto y una gestión eficiente de los recursos.

2. **Concurrencia sin condiciones de carrera[^3]**: Rust facilita la programación concurrente segura. Su modelo de propiedad asegura que los datos compartidos entre hilos de ejecución sean manejados correctamente, lo que reduce significativamente los errores en aplicaciones multihilo.

3. **Alto rendimiento comparable con C/C++**: Rust combina la eficiencia de bajo nivel con características modernas, lo que lo convierte en una excelente opción para aplicaciones de alto rendimiento, sin sacrificar la seguridad y estabilidad del código.

4. **Ecosistema y comunidad en crecimiento**: Aunque es relativamente nuevo en comparación con otros lenguajes de sistemas, Rust tiene un ecosistema muy activo y una comunidad que lo respalda. Esto se refleja en herramientas, bibliotecas y proyectos clave que hacen que trabajar con Rust sea cada vez más accesible y productivo.

5. **Versatilidad**: Rust no solo es útil para el desarrollo de sistemas y aplicaciones de bajo nivel, sino que también se está utilizando para desarrollar aplicaciones web, juegos, herramientas de línea de comandos, sistemas embebidos, e incluso está jugando un papel crucial en la creación de infraestructura blockchain, que es el ámbito en el que estoy especializándome.

Esta combinación de características me ha hecho ver el potencial de Rust para una amplia gama de aplicaciones, y seguiré profundizando en este lenguaje para aprovechar al máximo su poder.



**Terminos:**

[^1]: - **Borrowing**: En Rust, es el proceso de tomar prestada una referencia a una variable sin tomar posesión de ella. Esto permite acceder a los datos sin transferir la propiedad, manteniendo la seguridad en la memoria y evitando errores como dobles liberaciones o acceso a memoria no válida.

[^2]: - **Garbage Collector**: Es un mecanismo automático que algunos lenguajes de programación (como Java o C#) utilizan para liberar la memoria que ya no es utilizada por el programa. Rust no tiene garbage collector; en su lugar, utiliza un sistema de propiedad para gestionar la memoria de forma eficiente y manual.

[^3]: - **Condiciones de carrera**: Son errores que ocurren en programas concurrentes cuando dos o más hilos de ejecución acceden y modifican simultáneamente los mismos datos sin la adecuada sincronización, lo que puede llevar a resultados impredecibles o fallos en la ejecución del programa.