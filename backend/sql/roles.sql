CREATE ROLE admin;
CREATE ROLE gerente;
CREATE ROLE vendedor;
CREATE ROLE inventario;
CREATE ROLE auditor;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

GRANT SELECT ON producto TO auditor;

GRANT SELECT, INSERT, UPDATE ON producto TO inventario;

GRANT SELECT, INSERT ON venta TO vendedor;

GRANT SELECT ON vista_reporte_ventas TO gerente;

CREATE USER admin1 WITH PASSWORD '123';
GRANT admin TO admin1;

CREATE USER vendedor1 WITH PASSWORD '123';
GRANT vendedor TO vendedor1;

CREATE USER auditor1 WITH PASSWORD '123';
GRANT auditor TO auditor1;