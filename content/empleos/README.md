# Ofertas laborales: "Trabaja con nosotros"

Cada cargo publicado en cicloaysen.com/trabaja-con-nosotros es un archivo `.json` en esta carpeta. No hay base de datos: para publicar, editar o cerrar un cargo basta con modificar estos archivos.

## Crear un cargo nuevo

1. Copie `_ejemplo.json` y renombre la copia con un nombre corto, en minúsculas, sin tildes ni espacios (use guiones). Ejemplo: `geologo-terreno-2026.json`.
2. Abra el archivo nuevo y cambie el campo `"slug"` para que sea **idéntico** al nombre del archivo sin `.json` (en el ejemplo, `"geologo-terreno-2026"`). Si no coinciden, la publicación falla con un mensaje que lo indica.
3. Cambie `"estado"` a `"abierto"` y complete el resto de los campos.
4. Guarde, haga commit y `git push` a la rama `main`. Vercel publica el cambio automáticamente en uno o dos minutos.

Los archivos que comienzan con `_` (como `_ejemplo.json`) **no se publican**; sirven solo de plantilla.

## Qué significa cada campo

| Campo | Obligatorio | Descripción |
|---|---|---|
| `slug` | Sí | Identificador del cargo. Igual al nombre del archivo. Forma parte de la dirección web: `/trabaja-con-nosotros/<slug>`. Solo minúsculas, números y guiones. |
| `titulo` | Sí | Nombre del cargo. Ejemplo: `"Geólogo/a de terreno"`. |
| `estado` | Sí | `"abierto"` o `"cerrado"`. |
| `ubicacion` | Sí | Lugar de trabajo. Ejemplo: `"Coyhaique, Región de Aysén"`. |
| `modalidad` | Sí | `"Presencial"`, `"Híbrida"` o `"Remota"`. |
| `jornada` | Sí | `"Completa"`, `"Parcial"` o `"Por proyecto"`. |
| `fechaPublicacion` | Sí | Fecha en formato `AAAA-MM-DD`. Ejemplo: `"2026-10-22"`. |
| `fechaCierre` | No | Último día para postular, formato `AAAA-MM-DD`. Desde el día siguiente el cargo aparece como cerrado. |
| `resumen` | Sí | Texto breve (2 o 3 líneas) que aparece en la tarjeta del listado y en buscadores. |
| `descripcion` | Sí | Lista de párrafos que describen el cargo. |
| `funciones` | Sí | Lista de funciones principales. |
| `requisitos` | Sí | Lista de requisitos excluyentes. |
| `deseables` | No | Lista de conocimientos o experiencias deseables. |
| `preguntas` | Sí | Preguntas específicas del cargo (puede ser una lista vacía: `[]`). |

Las listas se escriben entre corchetes, con cada elemento entre comillas y separados por comas:

```json
"funciones": [
  "Planificar y ejecutar campañas de terreno.",
  "Elaborar informes técnicos."
]
```

## Preguntas del cargo

Cada pregunta tiene esta forma:

```json
{ "id": "p1", "texto": "¿Cuántos años de experiencia tiene?", "tipo": "numero", "obligatoria": true }
```

- `id`: identificador único dentro del cargo (`p1`, `p2`, `p3`…).
- `texto`: la pregunta tal como la verá la persona.
- `tipo`: uno de los tipos de la tabla siguiente.
- `obligatoria`: `true` (debe responderse) o `false` (opcional).
- `opciones`: solo para `seleccion` y `seleccion_multiple`. Lista de alternativas.
- `maxCaracteres`: opcional, para `texto_corto` y `texto_largo`. Límite de caracteres de la respuesta.

| Tipo | Se muestra como | Notas |
|---|---|---|
| `texto_corto` | Una línea de texto | Máximo 200 caracteres salvo que indique `maxCaracteres`. |
| `texto_largo` | Cuadro de texto con contador | Máximo 3000 caracteres salvo que indique `maxCaracteres`. |
| `numero` | Campo numérico | Acepta decimales con punto o coma. |
| `si_no` | Dos opciones: Sí / No | |
| `seleccion` | Una sola opción de la lista | Requiere `opciones`. Con 4 opciones o menos se muestran como botones de opción; con más, como lista desplegable. |
| `seleccion_multiple` | Casillas para marcar varias opciones | Requiere `opciones`. |
| `fecha` | Selector de fecha | |

## Cerrar un cargo

Hay dos formas:

- Cambiar `"estado": "abierto"` por `"estado": "cerrado"` y hacer `git push`.
- Indicar `fechaCierre`: el cargo se cierra solo al día siguiente de esa fecha (el sitio lo actualiza en el plazo de una hora, sin necesidad de publicar de nuevo).

Un cargo cerrado sigue visible en el listado con la etiqueta "Cerrado", pero ya no muestra el formulario ni acepta postulaciones. Para quitarlo del sitio por completo, elimine su archivo.

## Qué ocurre con cada postulación

- Llega un correo a la dirección configurada en Vercel (`POSTULACIONES_EMAIL_TO`, por defecto contacto@cicloaysen.com) con los datos, las respuestas y los PDF adjuntos (CV y títulos renombrados como `Apellido_Nombre_CV.pdf`, `Apellido_Nombre_Titulo_1.pdf`, etc.).
- La persona recibe un correo de confirmación.
- El sitio no guarda los archivos ni los datos: solo existen en el correo recibido. Si alguien pide eliminar sus datos, borre esos correos.

## Publicación

Cada `git push` a la rama `main` hace que Vercel compile y publique el sitio automáticamente. Si un archivo JSON tiene un error de formato (por ejemplo, una coma de más o de menos), la publicación falla y el sitio sigue mostrando la versión anterior; revise el registro de la compilación en Vercel para ver el archivo con problemas.
