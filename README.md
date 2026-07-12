# Butaca Vacia - Backend

API RESTful desarrollado con **NestJS**, **TypeScript**, **PostgreSQL** y **Prisma ORM** para una plataforma de recomendación de películas y series. La API fue desplegada en Render y la base de datos en Neon.

El proyecto permite a los usuarios registrarse, iniciar sesión mediante autenticación JWT, publicar comentarios y puntuaciones sobre películas y series obtenidas desde la [API de TMDB](https://developer.themoviedb.org/reference/getting-started).

Este repositorio fue desarrollado como proyecto personal para profundizar conocimientos en desarrollo backend utilizando buenas prácticas, arquitectura modular y autenticación segura.

Para ver la **pagina** [ingrese aca]()

Para ver el **codigo del frontend** [ingrese aca](https://github.com/Gastonguz3/butaca-vacia-frontend)


## Tecnologías

- NestJS 
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Passport
- Bcrypt
- Class Validator
- Joi
- Cookie Parser

## Funcionalidades

- Gestión completa de usuarios (registro, inicio de sesión, perfil, cambio de contraseña y eliminación de cuenta).
- Sistema de autenticación seguro utilizando JWT, Refresh Tokens y cookies HttpOnly.
- Los usuarios autenticados pueden crear comentarios, calificarlos, editarlos y eliminarlos (cada usuario solo puede publicar un comentario por película o serie.)
- CRUD de comentarios y puntuaciones sobre películas y series.
- Integración con la API de TMDB para consultar contenido y recomendaciones.
- Validación de datos, paginación y configuración mediante variables de entorno.

## Autenticación

El sistema implementa autenticación basada en JWT utilizando dos tokens.

### Access Token

- Duración corta (15 minutos)
- Enviado mediante Authorization Bearer Token

### Refresh Token

- Duración de 7 días
- Almacenado en cookie HttpOnly
- Hasheado antes de guardarse en la base de datos
- Utilizado para generar nuevos Access Tokens

De esta manera, evito almacenar tokens sensibles en el navegador y mejora la seguridad.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Gastonguz3/butaca-vacia-backend
```

### 2. Instalar dependencias


```bash
pnpm install
```

---

### 3. Configurar variables de entorno

Crear un archivo `.env`.

Ejemplo:

```env
PORT=4000
DATABASE_URL=

JWT_SECRET=
JWT_REFRESH_SECRET=

FRONTEND_URL=http://localhost:3000

NODE_ENV=development

TMDB_API_KEY=
TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 4. Levantar Contenedor de Docker con PostgreSQL

Este paso es opcional, es solo si queres usar el docker-compose que contiene el proyecto para levantar la base de datos

```bash
docker compose up -d
```

### 5. Ejecutar migraciones

```bash
pnpm dlx prisma migrate dev
```

### 6. Generar Prisma Client

```bash
pnpm dlx prisma generate
```

### 7. Ejecutar el proyecto

```bash
pnpm start:dev
```
## Endpoints principales

### Auth

| Método | Endpoint | Descripción |
|:------:|:---------|:------------|
| POST | `/api/auth/register` | Registrar un nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| POST | `/api/auth/refresh` | Renovar el Access Token |
| POST | `/api/auth/logout` | Cerrar sesión |

---

### Users

| Método | Endpoint | Descripción |
|:------:|:---------|:------------|
| GET | `/api/users/me` | Obtener el perfil del usuario autenticado |
| PATCH | `/api/users/me` | Actualizar la información del perfil |
| PATCH | `/api/users/me/password` | Cambiar la contraseña |
| DELETE | `/api/users/me` | Eliminar la cuenta |

---

### Reviews

| Método | Endpoint | Descripción |
|:------:|:---------|:------------|
| GET | `/api/reviews/me/list` | Obtener los comentarios del usuario autenticado |
| GET | `/api/reviews/:mediaType/:tmdbId` | Obtener los comentarios de una película o serie |
| POST | `/api/reviews` | Crear un comentario |
| PATCH | `/api/reviews/:id` | Editar un comentario |
| DELETE | `/api/reviews/:id` | Eliminar un comentario |

---

### Movies

| Método | Endpoint | Descripción |
|:------:|:---------|:------------|
| GET | `/api/movies/genres` | Obtener la lista de géneros |
| GET | `/api/movies/discover` | Obtener una película en base a los filtros |
| GET | `/api/movies/popular` | Obtener películas populares |
| GET | `/api/movies/:id` | Obtener los detalles de una película |
| GET | `/api/movies/:id/recommendations` | Obtener recomendaciones relacionadas |

---

### Series

| Método | Endpoint | Descripción |
|:------:|:---------|:------------|
| GET | `/api/series/genres` | Obtener la lista de géneros |
| GET | `/api/series/discover` | Obtener una serie en base a los filtros |
| GET | `/api/series/popular` | Obtener series populares |
| GET | `/api/series/:id` | Obtener los detalles de una serie |
| GET | `/api/series/:id/recommendations` | Obtener recomendaciones relacionadas |

#### Autor: Gaston Guzman [linKedIn](https://www.linkedin.com/in/gaston-guzman-192730352/).