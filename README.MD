# 🛒 Proyecto - Sistema de Inventario y Ventas

Aplicación web para la gestión de inventario y ventas. Contiene:
- Backend: Node.js + Express
- Frontend: React (Create React App)
- Base de datos: PostgreSQL
- Orquestación: Docker + Docker Compose

---

**Estado:** Código fuente disponible; base de datos inicializa con datos de prueba y procedimientos SQL.

---

## Requisitos

- Docker & Docker Compose (recomendado)
- Node.js (si desea ejecutar servicios individualmente)

---

## Variables de entorno

Colocar un archivo `.env` en la raíz del servicio `backend` con, como mínimo:

```env
DB_USER=proy3
DB_PASSWORD=secret
DB_HOST=db
DB_PORT=5432
DB_NAME=tienda
PORT=5000
JWT_SECRET=una_clave_secreta
```

Nota: Cuando se usa Docker Compose, el servicio `db` ya crea la BD con usuario/clave definidos en `docker-compose.yml`.

---

## Levantar con Docker

Desde la raíz del proyecto:

```bash
docker compose up --build
```

Si modifica `backend/sql/init.sql` o `backend/sql/procedures.sql`, recree volumenes y contenedores:

```bash
docker compose down -v
docker compose up --build
```

---

## Ejecutar localmente (sin Docker)

- Backend:

```bash
cd backend
npm install
# Asegurar .env configurado
node src/app.js
```

- Frontend:

```bash
cd frontend
npm install
npm start
```

---

## Base de datos

- El archivo `backend/sql/init.sql` crea la estructura y datos de prueba.
- Los procedimientos y funciones se encuentran en `backend/sql/procedures.sql` y se cargan al iniciar el contenedor `db`.
- Lista relevante de procedimientos/funciones:
  - `registrar_venta(...)` - registrar venta, insertar detalle y decrementar stock
  - `actualizar_stock(...)`
  - `crear_producto(...)`, `actualizar_producto(...)`, `eliminar_producto(...)`
  - `crear_cliente(...)`, `actualizar_cliente(...)`, `eliminar_cliente(...)`
  - `crear_proveedor(...)`, `crear_categoria(...)`, `crear_empleado(...)`
  - `ventas_por_fecha(date)`, `ventas_por_rango(date, date)`, `total_vendido()`, `total_vendido_por_fecha(date)`

---

## API - Resumen de endpoints

Base URL (desde frontend): `http://localhost:5000/api` (o `http://localhost:5000` para rutas no prefijadas)

- Autenticación
  - POST `/api/auth/login` — body: `{ "username": "admin", "password": "123" }` → respuesta `{ token, rol }`

- Productos (protegido por roles según middleware `authorize`)
  - GET `/api/productos`
  - POST `/api/productos`
  - PUT `/api/productos/:id`
  - DELETE `/api/productos/:id`

- Clientes
  - GET `/api/clientes`
  - POST `/api/clientes`
  - PUT `/api/clientes/:id`
  - DELETE `/api/clientes/:id`

- Ventas
  - POST `/api/ventas` — registra venta (usa `registrar_venta` en DB)

- Reportes
  - GET `/reporte` — devuelve la vista `vista_reporte_ventas` (lista de ventas con total calculado)

Nota: El middleware de autenticación espera el header `Authorization: Bearer <token>` para rutas protegidas.

Ejemplo de login + petición protegida (curl):

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"admin","password":"123"}'

# Usar token (ejemplo)
curl http://localhost:5000/reporte -H "Authorization: Bearer <TOKEN>"
```

---

## Frontend

- Código en `frontend/src`.
- Servicios de API en `frontend/src/services/api.js`.
- Componentes principales: `Login`, `Productos`, `Clientes`, `Ventas`, `Reportes`.
- La aplicación guarda `token` y `rol` en `localStorage` y añade `Authorization` cuando existe el token.

---

## Roles y permisos

- El backend genera JWT con el campo `rol` al iniciar sesión.
- En el frontend hay un mapeo `PERMISOS` para mostrar/ocultar pestañas según rol.
- Asegúrate de usar credenciales con rol adecuado (`admin`, `gerente`, `vendedor`, `inventario`, `auditor`).

---

## Problemas comunes y solución rápida

- `Error en la solicitud` al cargar datos del dashboard: comprueba que el backend está en `http://localhost:5000` y que el frontend usa la ruta correcta para reportes (`/reporte`).
- Si las migraciones o procedimientos no se cargan al iniciar DB, eliminar volumen: `docker compose down -v` y levantar de nuevo.
- Asegurar `JWT_SECRET` configurado en `.env` del backend antes de ejecutar sin Docker.

---

## Próximos pasos recomendados

- Ejecutar `docker compose up --build` y verificar logs de `db` y `backend`.
- Probar endpoints con Postman o curl y cargar manualmente `backend/sql/procedures.sql` si es necesario.

---

## Autor

Juan José Rivas Álvarez
