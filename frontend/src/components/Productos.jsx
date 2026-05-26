import { styles } from '../styles/styles';

function Productos({
    productos,
    form,
    setForm,
    editando,
    onSubmit,
    onEdit,
    onDelete,
    onCancelEdit,
    puedeEscribir
}) {
    return (
        <>
            <div style={styles.section}>
                <p style={styles.sectionTitle}>Lista de Productos</p>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.thFirst}>ID</th>
                            <th style={styles.th}>Nombre</th>
                            <th style={styles.th}>Precio</th>
                            <th style={styles.th}>Stock</th>
                            <th style={styles.thLast}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((p) => (
                            <tr key={p.id_producto}>
                                <td style={styles.tdMuted}>#{p.id_producto}</td>
                                <td style={styles.td}>{p.nombre}</td>
                                <td style={styles.td}>
                                    <span style={styles.badgePrice}>Q{p.precio}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.badgeStock}>{p.stock} unid.</span>
                                </td>
                                {puedeEscribir && (
                                    <td style={styles.td}>
                                        <button style={styles.btnEdit} onClick={() => onEdit(p)}>
                                            Editar
                                        </button>
                                        <button style={styles.btnDelete} onClick={() => onDelete(p.id_producto)}>
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={styles.section}>
                {puedeEscribir && (
                    <p style={styles.sectionTitle}>{editando ? 'Editar' : 'Crear'} Producto</p>
                )}
                <form onSubmit={onSubmit}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre</label>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Ej. Mouse inalámbrico"
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Descripción</label>
                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Descripción breve"
                                value={form.descripcion}
                                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Precio (Q)</label>
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="0.00"
                                step="0.01"
                                value={form.precio}
                                onChange={(e) => setForm({ ...form, precio: e.target.value })}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Stock</label>
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="0"
                                value={form.stock}
                                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>ID Categoría</label>
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="1"
                                value={form.id_categoria}
                                onChange={(e) => setForm({ ...form, id_categoria: e.target.value })}
                                required
                            />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>ID Proveedor</label>
                            <input
                                style={styles.input}
                                type="number"
                                placeholder="1"
                                value={form.id_proveedor}
                                onChange={(e) => setForm({ ...form, id_proveedor: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div style={styles.formActions}>
                        <button type="submit" style={styles.btnSubmit}>
                            {editando ? 'Actualizar Producto' : 'Crear Producto'}
                        </button>
                        {editando && (
                            <button type="button" style={styles.btnCancel} onClick={onCancelEdit}>
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

export default Productos;
