import { styles } from '../styles/styles';

function Clientes({
  clientes,
  form,
  setForm,
  editando,
  onSubmit,
  onEdit,
  onDelete,
  onCancelEdit,
}) {
  return (
    <>
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Lista de Clientes</p>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thFirst}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Apellido</th>
              <th style={styles.th}>Correo</th>
              <th style={styles.thLast}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => (
              <tr key={c.id_cliente}>
                <td style={styles.tdMuted}>#{c.id_cliente}</td>
                <td style={styles.td}>{c.nombre}</td>
                <td style={styles.td}>{c.apellido}</td>
                <td style={styles.td}>{c.correo}</td>
                <td style={styles.td}>
                  <button style={styles.btnEdit} onClick={() => onEdit(c)}>
                    Editar
                  </button>
                  <button style={styles.btnDelete} onClick={() => onDelete(c.id_cliente)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <p style={styles.sectionTitle}>{editando ? 'Editar' : 'Agregar'} Cliente</p>
        <form onSubmit={onSubmit}>
          <div style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Nombre</label>
              <input
                style={styles.input}
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Apellido</label>
              <input
                style={styles.input}
                placeholder="Apellido"
                value={form.apellido}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Teléfono</label>
              <input
                style={styles.input}
                placeholder="Teléfono"
                value={form.telefono}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Correo</label>
              <input
                style={styles.input}
                placeholder="correo@ejemplo.com"
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                required
              />
            </div>
          </div>
          <div style={styles.formActions}>
            <button type="submit" style={styles.btnSubmit}>
              {editando ? 'Actualizar' : 'Crear'} Cliente
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

export default Clientes;
