# 🛒 Proyecto 2 - Sistema de Inventario y Ventas

Aplicación web para la gestión de inventario y ventas de una tienda.
Incluye backend en Node.js, frontend en React y base de datos PostgreSQL, todo orquestado con Docker.

---

# 🚀 Tecnologías utilizadas

* **Backend:** Node.js + Express
* **Frontend:** React
* **Base de datos:** PostgreSQL
* **Contenedores:** Docker + Docker Compose

---

# 📦 Requisitos

Antes de ejecutar el proyecto necesitas:

* Docker instalado
* Docker Compose instalado

---

# ⚙️ Configuración

El proyecto utiliza variables de entorno definidas en un archivo `.env`.

Ejemplo (`.env.example`):

```env
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
PORT=5000
```

---

# 🐳 Cómo ejecutar el proyecto

Desde la raíz del proyecto:

```bash
docker compose up --build
```

---

# 🧠 Importante

* La base de datos se inicializa automáticamente usando el archivo:

```
backend/sql/init.sql
```

* Este archivo crea:

  * Tablas
  * Relaciones (FK)
  * Datos de prueba (20 registros por tabla)

* ⚠️ Si haces cambios en `init.sql`, debes reiniciar completamente:

```bash
docker compose down -v
docker compose up --build
```

---

# 🌐 Acceso a la aplicación

| Servicio | URL                   |
| -------- | --------------------- |
| Backend  | http://localhost:5000 |
| Frontend | http://localhost:3000 |

---

# 🔌 Endpoints principales

## 🛍️ Productos

* GET `/api/productos`
* POST `/api/productos`
* PUT `/api/productos/:id`
* DELETE `/api/productos/:id`

---

## 👤 Clientes

* GET `/api/clientes`
* POST `/api/clientes`
* PUT `/api/clientes/:id`
* DELETE `/api/clientes/:id`

---

# 📊 Funcionalidades implementadas

✔ CRUD completo de productos
✔ CRUD completo de clientes
✔ Manejo de errores en backend y frontend
✔ Consultas SQL (JOIN, GROUP BY, CTE, subqueries)
✔ Vista (VIEW) para reportes
✔ Transacciones en operaciones de venta
✔ Base de datos normalizada

---

# ⚠️ Manejo de errores

El sistema valida:

* Campos obligatorios
* Duplicados (correo único)
* Integridad referencial (productos en ventas)
* Errores de conexión

Los errores se muestran directamente en la interfaz del usuario.

---

# 🧪 Datos de prueba

El sistema incluye datos precargados:

* 20 clientes
* 20 productos
* 20 ventas
* 20 proveedores
* 20 categorías

---

# 👨‍💻 Autor

Juan José Rivas Álvarez
