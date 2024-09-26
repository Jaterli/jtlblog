---
draft: false
title: "Almacenamiento de valores separados por comas en campos TextField en Django"
description: "Aquí os dejo una explicación del enfoque qué le dí a una aplicación Django para gestionar listas de valores en campos `TextField` en Django."
pubDate: "2024-09-26"
heroImage: "/assets/images/blog/blog.django.jpg"
category: "Tutoriales"
tags: [desarrolladores, Django]
---

Aquí os dejo una explicación del qué le dí a una aplicación Django para gestionar listas de valores en campos `TextField` en Django:

---

En lugar de utilizar relaciones *OneToMany* o crear tablas adicionales para gestionar datos que se almacenan en listas, podemos optar por un enfoque más simple, que consiste en almacenar estos valores directamente en campos de tipo `TextField`, separados por comas. Este método resulta útil cuando no necesitamos realizar consultas complejas sobre esos valores.

### Modelo

En el archivo `models.py`, se define un campo `TextField` que almacenará los valores separados por comas. Por ejemplo:

```python
class PerfilProfesional(models.Model):
    softwares = models.TextField(blank=True)
    sistemas_operativos = models.TextField(blank=True)
```

### Formularios

En `forms.py`, puedes utilizar `MultipleChoiceField` con un widget de tipo `CheckboxSelectMultiple` para presentar los valores como checkboxes. Aquí, un ejemplo para el campo `softwares`:

```python
from django import forms

SOFTWARES = [
    ('software1', 'Software 1'),
    ('software2', 'Software 2'),
    # Agrega más opciones aquí
]

SIS_OPERATIVOS = [
    ('Windows', 'Software 1'),
    ('Unix', 'Unix'),
    ('Mac OS', 'Mac OS'),
    # Agrega más opciones aquí
]

class PerfilProfesionalForm(forms.ModelForm):
    softwares = forms.MultipleChoiceField(
        choices=SOFTWARES,
        widget=forms.CheckboxSelectMultiple(),
        required=False
    )
    sistemas_operativos = forms.MultipleChoiceField(
        choices=SIS_OPERATIVOS,
        widget=forms.CheckboxSelectMultiple(),
        required=False
    )

    class Meta:
        model = PerfilProfesional
        fields = ['softwares','sistemas_operativos']

    # Inicialización de valores
    def __init__(self, *args, **kwargs):
        super(PerfilProfesionalForm, self).__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.initial['softwares'] = list(self.instance.lenguas_softwares.split(', '))
            self.initial['sistemas_operativos'] = list(self.instance.sistemas_operativos.split(', '))
            # Puedes inicializar los campos que quieras aquí

    # Limpieza de datos
    def clean_softwares(self):
        return ', '.join(self.cleaned_data['softwares'])

    def clean_sistemas_operativos(self):
        return ', '.join(self.cleaned_data['sistemas_operativos'])        

```

### Explicación:

1. **Almacenamiento en el modelo**: Los campos `softwares` y `sistemas_operativos` son campos `TextField` que contendrán los datos separados por comas.
   
2. **Múltiples opciones en el formulario**: En el formulario, utilizamos `MultipleChoiceField` para presentar al usuario una lista de opciones con checkboxes. El atributo `choices` está vinculado a una lista de tuplas, en este caso `SOFTWARES` y `SIS_OPERATIVOS`, que define las opciones disponibles.

3. **Inicialización de los valores**: En el método `__init__` del formulario, si el formulario corresponde a una instancia existente (es decir, si estamos editando un registro), se inicializan los campos de checkbox con los valores ya almacenados, dividiéndolos en una lista mediante `split(', ')`.

4. **Limpieza de datos**: El método `clean_softwares` Y `clean_sistemas_operativos` se encargan de unir los valores seleccionados en una cadena de texto separada por comas antes de guardarlos en la base de datos.

Este enfoque es útil cuando necesitas gestionar listas simples de datos, sin necesidad de crear relaciones complejas en la base de datos, manteniendo el código más ligero y sencillo.
