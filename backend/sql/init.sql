CREATE TABLE cliente(
id_cliente SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
apellido VARCHAR(255) NOT NULL,
telefono VARCHAR(20) NOT NULL, 
correo VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE empleado(
id_empleado SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
apellido VARCHAR(255) NOT NULL,
puesto VARCHAR(255) NOT NULL
);

CREATE TABLE venta(
id_venta SERIAL PRIMARY KEY,
fecha DATE NOT NULL,
id_cliente INT NOT NULL,
id_empleado INT NOT NULL,
total DECIMAL(10,2),
FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);


CREATE TABLE proveedor(
id_proveedor SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
telefono VARCHAR(20) NOT NULL,
correo VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE categoria(
id_categoria SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
descripcion VARCHAR(255)
);

CREATE TABLE producto(
id_producto SERIAL PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
descripcion VARCHAR(255),
precio DECIMAL(10,2) NOT NULL,
stock INT NOT NULL CHECK (stock >= 0),
id_categoria INT NOT NULL,
id_proveedor INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor)
);

CREATE TABLE descripcion_venta(
  id_detalle SERIAL PRIMARY KEY,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
  FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

INSERT INTO categoria (nombre, descripcion) VALUES
('Electrónica','Dispositivos electrónicos'),
('Ropa','Vestimenta'),
('Alimentos','Comida'),
('Hogar','Artículos del hogar'),
('Oficina','Suministros'),
('Deportes','Artículos deportivos'),
('Juguetes','Para niños'),
('Belleza','Cuidado personal'),
('Automotriz','Accesorios de autos'),
('Salud','Productos médicos'),
('Tecnología','Gadgets'),
('Mascotas','Accesorios mascotas'),
('Libros','Lectura'),
('Música','Instrumentos'),
('Jardín','Herramientas jardín'),
('Cocina','Utensilios'),
('Viaje','Accesorios viaje'),
('Calzado','Zapatos'),
('Accesorios','Moda'),
('Gaming','Videojuegos');

INSERT INTO proveedor (nombre, telefono, correo) VALUES
('Proveedor1','10000001','p1@gmail.com'),
('Proveedor2','10000002','p2@gmail.com'),
('Proveedor3','10000003','p3@gmail.com'),
('Proveedor4','10000004','p4@gmail.com'),
('Proveedor5','10000005','p5@gmail.com'),
('Proveedor6','10000006','p6@gmail.com'),
('Proveedor7','10000007','p7@gmail.com'),
('Proveedor8','10000008','p8@gmail.com'),
('Proveedor9','10000009','p9@gmail.com'),
('Proveedor10','10000010','p10@gmail.com'),
('Proveedor11','10000011','p11@gmail.com'),
('Proveedor12','10000012','p12@gmail.com'),
('Proveedor13','10000013','p13@gmail.com'),
('Proveedor14','10000014','p14@gmail.com'),
('Proveedor15','10000015','p15@gmail.com'),
('Proveedor16','10000016','p16@gmail.com'),
('Proveedor17','10000017','p17@gmail.com'),
('Proveedor18','10000018','p18@gmail.com'),
('Proveedor19','10000019','p19@gmail.com'),
('Ximenaaa', '99990000', 'xl@gmail.com');

INSERT INTO cliente (nombre, apellido, telefono, correo) VALUES
('Juan','Perez','20000001','c1@gmail.com'),
('Maria','Lopez','20000002','c2@gmail.com'),
('Carlos','Ramirez','20000003','c3@gmail.com'),
('Ana','Gomez','20000004','c4@gmail.com'),
('Luis','Martinez','20000005','c5@gmail.com'),
('Jose','Hernandez','20000006','c6@gmail.com'),
('Lucia','Diaz','20000007','c7@gmail.com'),
('Pedro','Sanchez','20000008','c8@gmail.com'),
('Laura','Castro','20000009','c9@gmail.com'),
('Jorge','Morales','20000010','c10@gmail.com'),
('Sofia','Ruiz','20000011','c11@gmail.com'),
('Miguel','Torres','20000012','c12@gmail.com'),
('Elena','Vargas','20000013','c13@gmail.com'),
('Diego','Flores','20000014','c14@gmail.com'),
('Valeria','Mendoza','20000015','c15@gmail.com'),
('Andres','Silva','20000016','c16@gmail.com'),
('Paula','Rojas','20000017','c17@gmail.com'),
('Ricardo','Ortega','20000018','c18@gmail.com'),
('Daniela','Navarro','20000019','c19@gmail.com'),
('Fernando','Reyes','20000020','c20@gmail.com');

INSERT INTO empleado (nombre, apellido, puesto) VALUES
('Emp1','A','Cajero'),
('Emp2','B','Vendedor'),
('Emp3','C','Gerente'),
('Emp4','D','Cajero'),
('Emp5','E','Vendedor'),
('Emp6','F','Cajero'),
('Emp7','G','Vendedor'),
('Emp8','H','Supervisor'),
('Emp9','I','Cajero'),
('Emp10','J','Vendedor'),
('Emp11','K','Cajero'),
('Emp12','L','Vendedor'),
('Emp13','M','Gerente'),
('Emp14','N','Cajero'),
('Emp15','O','Vendedor'),
('Emp16','P','Supervisor'),
('Emp17','Q','Cajero'),
('Emp18','R','Vendedor'),
('Emp19','S','Cajero'),
('Emp20','T','Gerente');

INSERT INTO producto (nombre, descripcion, precio, stock, id_categoria, id_proveedor) VALUES
('Producto1','Desc',100,10,1,1),
('Producto2','Desc',200,15,2,2),
('Producto3','Desc',300,20,3,3),
('Producto4','Desc',400,25,4,4),
('Producto5','Desc',500,30,5,5),
('Producto6','Desc',600,12,6,6),
('Producto7','Desc',700,14,7,7),
('Producto8','Desc',800,16,8,8),
('Producto9','Desc',900,18,9,9),
('Producto10','Desc',1000,20,10,10),
('Producto11','Desc',1100,22,11,11),
('Producto12','Desc',1200,24,12,12),
('Producto13','Desc',1300,26,13,13),
('Producto14','Desc',1400,28,14,14),
('Producto15','Desc',1500,30,15,15),
('Producto16','Desc',1600,10,16,16),
('Producto17','Desc',1700,12,17,17),
('Producto18','Desc',1800,14,18,18),
('Producto19','Desc',1900,16,19,19),
('Producto20','Desc',2000,18,20,20);

INSERT INTO venta (fecha, id_cliente, id_empleado, total) VALUES
('2026-04-01',1,1,100),
('2026-04-02',2,2,200),
('2026-04-03',3,3,300),
('2026-04-04',4,4,400),
('2026-04-05',5,5,500),
('2026-04-06',6,6,600),
('2026-04-07',7,7,700),
('2026-04-08',8,8,800),
('2026-04-09',9,9,900),
('2026-04-10',10,10,1000),
('2026-04-11',11,11,1100),
('2026-04-12',12,12,1200),
('2026-04-13',13,13,1300),
('2026-04-14',14,14,1400),
('2026-04-15',15,15,1500),
('2026-04-16',16,16,1600),
('2026-04-17',17,17,1700),
('2026-04-18',18,18,1800),
('2026-04-19',19,19,1900),
('2026-04-20',20,20,2000);

INSERT INTO descripcion_venta (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1,1,1,100,100),
(2,2,1,200,200),
(3,3,1,300,300),
(4,4,1,400,400),
(5,5,1,500,500),
(6,6,1,600,600),
(7,7,1,700,700),
(8,8,1,800,800),
(9,9,1,900,900),
(10,10,1,1000,1000),
(11,11,1,1100,1100),
(12,12,1,1200,1200),
(13,13,1,1300,1300),
(14,14,1,1400,1400),
(15,15,1,1500,1500),
(16,16,1,1600,1600),
(17,17,1,1700,1700),
(18,18,1,1800,1800),
(19,19,1,1900,1900),
(20,20,1,2000,2000);

CREATE VIEW vista_reporte_ventas AS
SELECT 
    v.id_venta,
    v.fecha,
    c.nombre || ' ' || c.apellido AS cliente,
    e.nombre || ' ' || e.apellido AS empleado,
    SUM(dv.subtotal) AS total
FROM venta v
JOIN cliente c ON v.id_cliente = c.id_cliente
JOIN empleado e ON v.id_empleado = e.id_empleado
JOIN descripcion_venta dv ON v.id_venta = dv.id_venta
GROUP BY v.id_venta, v.fecha, c.nombre, c.apellido, e.nombre, e.apellido;