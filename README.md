# Mini RRHH - DDHH2-JS

Aplicación de gestión de empleados desarrollada con React, TypeScript, Vite y JSON Server.

## Repositorio

https://github.com/DDHH2-JS/mini-rrhh

## Sitio desplegado

Pendiente de publicar en Vercel. Al terminar el despliegue, reemplaza esta línea con la URL asignada por Vercel antes de entregar.

## Ejecutar localmente

Requiere Node.js y npm.

```bash
npm install
```

En una terminal, inicia el API local:

```bash
npm run mock-api
```

En otra terminal, inicia la aplicación:

```bash
npm run dev
```

Vite abrirá la aplicación en http://localhost:5173 y JSON Server en http://localhost:3001.
El API local usa datos ficticios guardados en `db.json`.

## Publicar el API en Render

1. En Render, crea un **Blueprint** conectado al repositorio `DDHH2-JS/mini-rrhh`.
2. Render detectará `render.yaml` y creará el servicio gratuito `mini-rrhh-ddhh2-js-api`.
3. Cuando el servicio esté activo, verifica que `https://<tu-servicio>.onrender.com/employees` devuelva la lista de empleados.

Este JSON Server es un API de demostración sin autenticación; no lo uses con datos personales o confidenciales.

## Publicar el frontend en Vercel

1. Importa `DDHH2-JS/mini-rrhh` en Vercel como proyecto Vite.
2. En **Settings > Environment Variables**, configura:
   - `VITE_API_URL`: URL base del API de Render, sin `/employees` al final.
   - `VITE_AUTH_API_URL`: URL del API de autenticación autorizado para el grupo.
3. Despliega o vuelve a desplegar el proyecto y copia la URL que Vercel asigne en la sección **Sitio desplegado** de este README.

El API de autenticación configurado actualmente es externo. Si el inicio de sesión muestra un error de CORS, el administrador de ese API debe autorizar el dominio de Vercel.

## Validación

```bash
npm run lint
npm run build
```
