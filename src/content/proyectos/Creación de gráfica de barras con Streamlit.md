---
title: "Creación de gráfica de barras con Streamlit."
description: "Obtención de datos desde una API y visualización mediante una gráfica de barras apiladas."
pubDate: "2024-09-18"
heroImage: "/assets/images/proyectos/projects.streamlit.webp"
badge: "Finalizado"
tags: ["Python", "Streamlit"]
---


### Introducción ###

El siguiente script obtiene datos desde una API y los visualiza mediante una gráfica de barras apiladas. Este gráfico muestra el número de posts publicados por mes en diferentes categorías. Utiliza **Streamlit** para crear una interfaz web interactiva que permite visualizar fácilmente la información sin necesidad de conocimientos avanzados en desarrollo web. Además, emplea técnicas de optimización como el uso de caché para mejorar el rendimiento. Esta biblioteca de Python es ideal para el análisis y la presentación de datos de manera visual e intuitiva.

```python
import requests
import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

# URL de la API FastAPI
API_URL = "https://raw.githubusercontent.com/Jaterli/jtlblog/main/public/data/postsByMonth.json"

# Función para obtener los datos de la API
def fetch_data():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()
    else:
        st.error("Error al cargar los datos.")
        return {}

# Función para generar la gráfica de barras apiladas
@st.cache_data
def plot_stacked_bar_chart(data):
    # Obtener todas las categorías y los meses
    categories = list(data.keys())
    months = list(next(iter(data.values())).keys())  # Usamos la primera categoría para obtener los meses

    # Crear un array de ceros para el valor inicial del bottom
    bottom = np.zeros(len(months))

    # Configurar los colores
    colors = ['skyblue', 'coral', 'yellowgreen', 'lightcoral', 'cyan']

    fig, ax = plt.subplots(1,1, figsize = (6,4))  # Ajustar el tamaño de la gráfica
    
    # Iterar por cada categoría para apilar las barras
    for i, category in enumerate(categories):
        counts = [data[category].get(month, 0) for month in months]  # Obtener los valores para cada mes
        p = ax.bar(months, counts, bottom=bottom, label=category, width=0.2, color=colors[i % len(colors)])  # Agregar la barra
        bottom += np.array(counts)  # Actualizar el bottom para la próxima barra
        ax.bar_label(p, label_type='center', fontsize=12)
        

    # Configurar etiquetas y título
    # ax.set_xlabel('Mes', fontsize=12)
    ax.set_ylabel('Número de Posts', fontsize=16)
    ax.set_title('Número de Posts por Mes', fontsize=16)

    # Configurar el tamaño de los ticks del eje X y Y
    ax.tick_params(axis='x', labelsize=12)  # Tamaño de los valores en el eje X
    ax.tick_params(axis='y', labelsize=12)  # Tamaño de los valores en el eje Y
    # Mostrar la leyenda con un tamaño personalizado

    # Ajusta la rotación y la alineación de las etiquetas del eje x (meses) para mejorar la legibilidad y evitar que se superpongan.
    plt.xticks(rotation=45, ha="right")

    # Ajustar manualmente los márgenes usando subplots_adjust
    # plt.subplots_adjust(left=0.1, bottom=0.3, right=0.9, top=0.9)

    # Mostrar la leyenda
    ax.legend(fontsize=12)  # Tamaño de la leyenda


    # Mostrar la gráfica en Streamlit
    st.pyplot(fig)

    # Guardar en archivo
    plt.savefig('grap.png', bbox_inches='tight')

def main():
    # st.title("Gráfica de Posts por Mes (Stacked Bar Chart)")
    data = fetch_data()
    
    if data:
        plot_stacked_bar_chart(data)

if __name__ == "__main__":
    main()
```


### Descripción del Script

1. **Obtención de Datos desde una API**:
    - El script utiliza la librería **`requests`** para obtener datos de una API externa. Esta API devuelve información en formato JSON que contiene el número de posts publicados por mes, agrupados por categoría.
    - Si la solicitud es exitosa (código de estado 200), se procesan los datos; en caso de error, se muestra un mensaje en la interfaz de Streamlit mediante `st.error()`.

2. **Visualización con Gráfica de Barras Apiladas**:
    - A partir de los datos recibidos, se construye una **gráfica de barras apiladas** que muestra el número de posts por mes para varias categorías.
    - Cada categoría se representa con un color distinto, y las barras están apiladas para mostrar la suma total de posts por mes.
    - Para mejorar la claridad, se ajustan aspectos visuales como las etiquetas, la rotación de los meses en el eje X, y el tamaño de la fuente para los ejes y leyenda.

3. **Función de Cacheo con Streamlit**:
    - Se utiliza el decorador `@st.cache_data` para optimizar la eficiencia del script, almacenando en caché los resultados de la función que genera la gráfica. Esto evita que la visualización se recalculen innecesariamente cada vez que la aplicación se recarga, mejorando la rapidez.

4. **Interfaz Gráfica con Streamlit**:
    - **Streamlit** permite mostrar la gráfica directamente en la aplicación web a través de `st.pyplot(fig)`.
    - Además, la gráfica generada también se guarda como un archivo PNG local usando `plt.savefig()` para posibles usos futuros o exportación.
