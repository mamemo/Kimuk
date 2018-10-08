# Kimuk

Página web para creación de voluntariados y reclutamiento de voluntarios.

## Instalación

Solo se necesita tener instalado NodeJS y NPM. Para utilizar el sitio web es necesario clonarlo. Moverse dentro del directorio y una vez dentro utilizar el comando:

```
npm start
```

## Estructura del proyecto

Todo el contenido creado por el grupo de trabajo se agrupa dentro de la carpeta *src*, específicamente dentro de las carpetas *components*, *controllers* y *routes*. Esto para mantener una separación entre la capa de presentación y la comunicación con Firebase. La idea general detrás de esta estructura es la siguiente:

- components: esta carpeta agrupa todos los componentes de react, la idea es que cada componente tenga su propia carpeta donde estén todos los archivos necesarios para que este componente exista, por ejemplo, su archivo .css para **estilos** y su archivo .js donde esté definido **el componente y su comportamiento**. 
- controllers: en esta carpeta se agrupan los archivos que intermedian el acceso del sitio con Firebase, **cualquier interacción con Firebase** debe estar dentro de esta carpeta.
- routes: dentro de esta carpeta estarán definidas las **rutas y el comportamiento del Router de React**, aislando así las rutas de los componentes como tales.

