Este trabajo es una continuación sobre el proyecto final grupal, para la aprobación de la diplomatura en desarrollo web con Node JS y React 2020/21

Este trabajo consta de mejorasen los estilos del front-end, haciendo el sitio user-friendly. Mejoras en el routing de las distintas vistas del sitio y la implementación de paquetes para el manejo de autenticación de usuarios, búsquedas y conectividad con base de datos.

***Descripción del proyecto original***

***Detalle de la API***

Se trata de un proyecto de desarrollo backend en NodeJS, utilizando API Rest y base de datos MySQL para conocer si los libros del usuario se encuentran en su biblioteca o prestados. En caso de estar prestado, a quien se los prestó.

Se requiere conocer
	
De la persona a prestar los libros el nombre, apellido, email y alias. El email debe ser único. Todos los datos son requeridos.
De los géneros de los libros, solo los nombres, el campo nunca puede ser vacío o nulo y no pueden repetirse las categorías.
De los libros, el nombre, una descripción, su categoría y la persona a la cual se le ha prestado el libro. Para representar que un libro se encuentra en la biblioteca se puede utilizar cualquiera de las siguientes estrategias: null para libros en la biblioteca en el campo de persona_id, que el usuario se encuentre ingresado como una persona más.

Se solicita verificar que el usuario no envíe los campos requeridos solo con espacios en blanco.
Para asegurar los aciertos de las búsquedas, se sugiere el guardado en mayúsculas de todos los campos alfanuméricos y recordar hacer las verificaciones teniendo en cuenta esto.

El servidor deberá responder a la siguiente documentación de API

CATEGORIA

POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoría ya existe", "error inesperado"

GET '/categoria' retorna: status 200 y [{id:numerico, nombre:string}]  - status: 413 y []

GET '/categoria/:id' retorna: status 200 y {id: numérico, nombre:string} - status: 413, {mensaje: <descripción del error>} que puede ser: "error inesperado", "categoría no encontrada"

DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borró correctamente"} - status: 413, {mensaje: <descripción del error>} que puede ser: "error inesperado", "categoría con libros asociados, no se puede eliminar", "no existe la categoría indicada"

No se debe implementar el PUT

PERSONA

POST '/persona' recibe: {nombre: string, apellido: string, alias: string, email: string} retorna: status: 200, {id: numerico, nombre: string, apellido: string, alias: string, email: string} - status: 413, {mensaje: <descripcion del error>} que puede ser: "faltan datos", "el email ya se encuentra registrado", "error inesperado"

GET '/persona' retorna status 200 y [{id: numerico, nombre: string, apellido: string, alias: string, email; string}] o bien status 413 y []

GET '/persona/:id' retorna status 200 y {id: numerico, nombre: string, apellido: string, alias: string, email; string} - status 413 , {mensaje: <descripcion del error>} "error inesperado", "no se encuentra esa persona"

PUT '/persona/:id' recibe: {nombre: string, apellido: string, alias: string, email: string} el email no se puede modificar. retorna status 200 y el objeto modificado o bien status 413, {mensaje: <descripción del error>} "error inesperado", "no se encuentra esa persona"

DELETE '/persona/:id' retorna: 200 y {mensaje: "se borró correctamente"} o bien 413, {mensaje: <descripción del error>} "error inesperado", "no existe esa persona", "esa persona tiene libros asociados, no se puede eliminar"

LIBRO

POST '/libro' recibe: {nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} o bien status 413,  {mensaje: <descripcion del error>} que puede ser "error inesperado", "ese libro ya existe", "nombre y categoria son datos obligatorios", "no existe la categoria indicada", "no existe la persona indicada"

GET '/libro' devuelve 200 y [{id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null}] o bien 413, {mensaje: <descripcion del error>} "error inesperado"

GET '/libro/:id' devuelve 200 {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} y status 413, {mensaje: <descripcion del error>} "error inesperado", "no se encuentra ese libro"

PUT '/libro/:id' y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} devuelve status 200 y {id: numero, nombre:string, descripcion:string, categoria_id:numero, persona_id:numero/null} modificado o bien status 413, {mensaje: <descripcion del error>} "error inesperado",  "solo se puede modificar la descripcion del libro

PUT '/libro/prestar/:id' y {id:numero, persona_id:numero} devuelve 200 y {mensaje: "se prestó correctamente"} o bien status 413, {mensaje: <descripcion del error>} "error inesperado", "el libro ya se encuentra prestado, no se puede prestar hasta que no se devuelva", "no se encontró el libro", "no se encontró la persona a la que se quiere prestar el libro"

PUT '/libro/devolver/:id' y {} devuelve 200 y {mensaje: "se realizó la devolución correctamente"} o bien status 413, {mensaje: <descripción del error>} "error inesperado", "ese libro no estaba prestado!", "ese libro no existe"

DELETE '/libro/:id' devuelve 200 y {mensaje: "se borró correctamente"}  o bien status 413, {mensaje: <descripción del error>} "error inesperado", "no se encuentra ese libro", "ese libro esta prestado no se puede borrar"

***Detalle del proyecto en React***

