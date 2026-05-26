CREATE OR REPLACE PROCEDURE registrar_venta(
    p_cliente INT,
    p_empleado INT,
    p_producto INT,
    p_cantidad INT,
    INOUT p_resultado TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_stock INT;
    v_precio DECIMAL;
    v_venta INT;
BEGIN

    SELECT stock, precio
    INTO v_stock, v_precio
    FROM producto
    WHERE id_producto = p_producto;

    IF v_stock < p_cantidad THEN

        p_resultado := 'Stock insuficiente';

        RAISE EXCEPTION 'No hay stock suficiente';

    END IF;

    INSERT INTO venta(
        fecha,
        id_cliente,
        id_empleado,
        total
    )
    VALUES(
        CURRENT_DATE,
        p_cliente,
        p_empleado,
        v_precio * p_cantidad
    )
    RETURNING id_venta INTO v_venta;

    INSERT INTO descripcion_venta(
        id_venta,
        id_producto,
        cantidad,
        precio_unitario,
        subtotal
    )
    VALUES(
        v_venta,
        p_producto,
        p_cantidad,
        v_precio,
        v_precio * p_cantidad
    );

    UPDATE producto
    SET stock = stock - p_cantidad
    WHERE id_producto = p_producto;

    p_resultado := 'Venta registrada';

EXCEPTION
    WHEN OTHERS THEN

        ROLLBACK;

        p_resultado := 'Error en venta';

END;
$$;

CREATE OR REPLACE PROCEDURE actualizar_stock(
    p_producto INT,
    p_stock INT
)
LANGUAGE plpgsql
AS $$
BEGIN

    UPDATE producto
    SET stock = p_stock
    WHERE id_producto = p_producto;

END;
$$;

CREATE OR REPLACE PROCEDURE crear_producto(
    p_nombre VARCHAR,
    p_descripcion VARCHAR,
    p_precio DECIMAL,
    p_stock INT,
    p_categoria INT,
    p_proveedor INT
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO producto(
        nombre,
        descripcion,
        precio,
        stock,
        id_categoria,
        id_proveedor
    )
    VALUES(
        p_nombre,
        p_descripcion,
        p_precio,
        p_stock,
        p_categoria,
        p_proveedor
    );

END;
$$;

CREATE OR REPLACE FUNCTION ventas_por_fecha(
    p_fecha DATE
)
RETURNS TABLE(
    id_venta INT,
    fecha DATE,
    total DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN

    RETURN QUERY

    SELECT
        v.id_venta,
        v.fecha,
        v.total
    FROM venta v
    WHERE v.fecha = p_fecha;

END;
$$;

CREATE OR REPLACE PROCEDURE total_vendido(
    INOUT total DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN

    SELECT SUM(total)
    INTO total
    FROM venta;

END;
$$;

CREATE OR REPLACE PROCEDURE crear_cliente(
    p_nombre VARCHAR,
    p_apellido VARCHAR,
    p_telefono VARCHAR,
    p_correo VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO cliente(nombre, apellido, telefono, correo)
    VALUES (p_nombre, p_apellido, p_telefono, p_correo);

END;
$$;

CREATE OR REPLACE PROCEDURE actualizar_cliente(
    p_id INT,
    p_nombre VARCHAR,
    p_apellido VARCHAR,
    p_telefono VARCHAR,
    p_correo VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    UPDATE cliente
    SET nombre = p_nombre,
        apellido = p_apellido,
        telefono = p_telefono,
        correo = p_correo
    WHERE id_cliente = p_id;

END;
$$;

CREATE OR REPLACE PROCEDURE eliminar_cliente(
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN

    IF EXISTS (SELECT 1 FROM venta WHERE id_cliente = p_id) THEN
        RAISE EXCEPTION 'No se puede eliminar cliente con ventas registradas';
    END IF;

    DELETE FROM cliente WHERE id_cliente = p_id;

END;
$$;

CREATE OR REPLACE PROCEDURE crear_proveedor(
    p_nombre VARCHAR,
    p_telefono VARCHAR,
    p_correo VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO proveedor(nombre, telefono, correo)
    VALUES (p_nombre, p_telefono, p_correo);

END;
$$;

CREATE OR REPLACE PROCEDURE crear_categoria(
    p_nombre VARCHAR,
    p_descripcion VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO categoria(nombre, descripcion)
    VALUES (p_nombre, p_descripcion);

END;
$$;

CREATE OR REPLACE PROCEDURE crear_empleado(
    p_nombre VARCHAR,
    p_apellido VARCHAR,
    p_puesto VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN

    INSERT INTO empleado(nombre, apellido, puesto)
    VALUES (p_nombre, p_apellido, p_puesto);

END;
$$;

CREATE OR REPLACE PROCEDURE actualizar_producto(
    p_id INT,
    p_nombre VARCHAR,
    p_descripcion VARCHAR,
    p_precio DECIMAL,
    p_stock INT,
    p_categoria INT,
    p_proveedor INT
)
LANGUAGE plpgsql
AS $$
BEGIN

    UPDATE producto
    SET nombre = p_nombre,
        descripcion = p_descripcion,
        precio = p_precio,
        stock = p_stock,
        id_categoria = p_categoria,
        id_proveedor = p_proveedor
    WHERE id_producto = p_id;

END;
$$;

CREATE OR REPLACE PROCEDURE eliminar_producto(
    p_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN

    IF EXISTS (SELECT 1 FROM descripcion_venta WHERE id_producto = p_id) THEN
        RAISE EXCEPTION 'No se puede eliminar producto con ventas asociadas';
    END IF;

    DELETE FROM producto WHERE id_producto = p_id;

END;
$$;

CREATE OR REPLACE FUNCTION ventas_por_rango(
    p_fecha_desde DATE,
    p_fecha_hasta DATE
)
RETURNS TABLE(
    id_venta INT,
    fecha DATE,
    total DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN

    RETURN QUERY

    SELECT
        v.id_venta,
        v.fecha,
        v.total
    FROM venta v
    WHERE v.fecha BETWEEN p_fecha_desde AND p_fecha_hasta;

END;
$$;

CREATE OR REPLACE PROCEDURE total_vendido_por_fecha(
    p_fecha DATE,
    INOUT total DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN

    SELECT SUM(total)
    INTO total
    FROM venta
    WHERE fecha = p_fecha;

END;
$$;