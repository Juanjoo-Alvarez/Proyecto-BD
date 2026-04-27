import { useEffect, useState } from 'react';

const styles = {
  app: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem 1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f5f5f3',
    minHeight: '100vh',
  },
  pageTitle: {
    fontSize: '22px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  pageSub: {
    fontSize: '14px',
    color: '#888780',
    marginBottom: '2rem',
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '1.5rem',
  },
  tab: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: '#888780',
    fontFamily: 'inherit',
  },
  tabActive: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '13px',
    cursor: 'pointer',
    border: 'none',
    background: '#185FA5',
    color: '#E6F1FB',
    fontWeight: '500',
    fontFamily: 'inherit',
  },
  section: {
    background: '#ffffff',
    border: '0.5px solid rgba(0,0,0,0.12)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: '1.25rem',
    paddingBottom: '0.75rem',
    borderBottom: '0.5px solid rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#888780',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background: '#f5f5f3',
  },
  thFirst: {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#888780',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background: '#f5f5f3',
    borderRadius: '6px 0 0 6px',
  },
  thLast: {
    textAlign: 'left',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '500',
    color: '#888780',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    background: '#f5f5f3',
    borderRadius: '0 6px 6px 0',
  },
  td: {
    padding: '10px 12px',
    color: '#1a1a1a',
    borderBottom: '0.5px solid rgba(0,0,0,0.08)',
  },
  tdMuted: {
    padding: '10px 12px',
    color: '#888780',
    fontSize: '13px',
    borderBottom: '0.5px solid rgba(0,0,0,0.08)',
  },
  badgePrice: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#0C447C',
    background: '#E6F1FB',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  badgeStock: {
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: '500',
    color: '#3B6D11',
    background: '#EAF3DE',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  btnEdit: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 12px',
    borderRadius: '8px',
    border: '0.5px solid #185FA5',
    fontSize: '13px',
    cursor: 'pointer',
    background: '#E6F1FB',
    color: '#185FA5',
    fontFamily: 'inherit',
    marginRight: '6px',
  },
  btnDelete: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 12px',
    borderRadius: '8px',
    border: '0.5px solid #A32D2D',
    fontSize: '13px',
    cursor: 'pointer',
    background: '#FCEBEB',
    color: '#A32D2D',
    fontFamily: 'inherit',
  },
  btnSubmit: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '0.5px solid #185FA5',
    fontSize: '14px',
    cursor: 'pointer',
    background: '#185FA5',
    color: '#E6F1FB',
    fontFamily: 'inherit',
  },
  btnCancel: {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '0.5px solid rgba(0,0,0,0.2)',
    fontSize: '14px',
    cursor: 'pointer',
    background: 'transparent',
    color: '#888780',
    fontFamily: 'inherit',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  label: {
    fontSize: '12px',
    color: '#888780',
    fontWeight: '500',
  },
  input: {
    padding: '8px 10px',
    border: '0.5px solid rgba(0,0,0,0.2)',
    borderRadius: '8px',
    fontSize: '14px',
    background: '#ffffff',
    color: '#1a1a1a',
    fontFamily: 'inherit',
    outline: 'none',
  },
  formActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '1rem',
  },
  alertError: {
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '1rem',
    background: '#FCEBEB',
    color: '#A32D2D',
    border: '0.5px solid #F7C1C1',
  },
  alertSuccess: {
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '1rem',
    background: '#EAF3DE',
    color: '#3B6D11',
    border: '0.5px solid #C0DD97',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('productos');

  const [reporte, setReporte] = useState([]);
  const [clientes, setClientes] = useState([]);

  const [nombreC, setNombreC] = useState('');
  const [apellidoC, setApellidoC] = useState('');
  const [telefonoC, setTelefonoC] = useState('');
  const [correoC, setCorreoC] = useState('');

  const [editandoC, setEditandoC] = useState(false);
  const [idEditarC, setIdEditarC] = useState(null);

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [productos, setProductos] = useState([]);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idProveedor, setIdProveedor] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchReporte = () => {
    fetch('http://localhost:5000/reporte')
      .then(res => res.json())
      .then(data => setReporte(data));
  };

  const fetchClientes = () => {
    fetch('http://localhost:5000/api/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));
  };

  const fetchProductos = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError('Error al cargar productos'));
  };

  useEffect(() => {
    fetchProductos();
    fetchClientes();
    fetchReporte();
  }, []);

  const handleSubmitCliente = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = editandoC
      ? `http://localhost:5000/api/clientes/${idEditarC}`
      : 'http://localhost:5000/api/clientes';
    const method = editandoC ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombreC, apellido: apellidoC, telefono: telefonoC, correo: correoC })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess(editandoC ? 'Cliente actualizado' : 'Cliente creado');
      fetchClientes();
      setNombreC(''); setApellidoC(''); setTelefonoC(''); setCorreoC('');
      setEditandoC(false); setIdEditarC(null);
    } catch { setError('Error de conexión'); }
  };

  const eliminarCliente = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/clientes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess('Cliente eliminado');
      fetchClientes();
    } catch { setError('Error al eliminar cliente'); }
  };

  const cargarCliente = (c) => {
    setEditandoC(true); setIdEditarC(c.id_cliente);
    setNombreC(c.nombre); setApellidoC(c.apellido);
    setTelefonoC(c.telefono); setCorreoC(c.correo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = editando
      ? `http://localhost:5000/api/products/${idEditar}`
      : 'http://localhost:5000/api/products';
    const method = editando ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          id_categoria: parseInt(idCategoria),
          id_proveedor: parseInt(idProveedor)
        })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al crear producto'); return; }
      setSuccess(editando ? 'Producto actualizado' : 'Producto creado');
      fetchProductos();
      setNombre(''); setDescripcion(''); setPrecio(''); setStock('');
      setIdCategoria(''); setIdProveedor('');
      setEditando(false); setIdEditar(null);
    } catch { setError('Error de conexión'); }
  };

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error al eliminar'); return; }
      setSuccess('Producto eliminado');
      fetchProductos();
    } catch { setError('Error al eliminar'); }
  };

  const limpiarFormulario = () => {
    setNombre(''); setDescripcion(''); setPrecio('');
    setStock(''); setIdCategoria(''); setIdProveedor('');
  };

  return (
    <div style={styles.app}>
      <p style={styles.pageTitle}>Panel de Gestión</p>
      <p style={styles.pageSub}>Administra productos, clientes y ventas desde un solo lugar</p>

      {/* Tabs de navegación */}
      <div style={styles.tabs}>
        {['productos', 'clientes', 'ventas'].map(tab => (
          <button
            key={tab}
            style={activeTab === tab ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Alertas */}
      {error && <div style={styles.alertError}>{error}</div>}
      {success && <div style={styles.alertSuccess}>{success}</div>}

      {/* ── TAB PRODUCTOS ── */}
      {activeTab === 'productos' && (
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
                {productos.map(p => (
                  <tr key={p.id_producto}>
                    <td style={styles.tdMuted}>#{p.id_producto}</td>
                    <td style={styles.td}>{p.nombre}</td>
                    <td style={styles.td}>
                      <span style={styles.badgePrice}>Q{p.precio}</span>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badgeStock}>{p.stock} unid.</span>
                    </td>
                    <td style={{ ...styles.td, borderBottom: styles.td.borderBottom }}>
                      <button
                        style={styles.btnEdit}
                        onClick={() => {
                          setEditando(true); setIdEditar(p.id_producto);
                          setNombre(p.nombre); setDescripcion(p.descripcion);
                          setPrecio(p.precio); setStock(p.stock);
                          setIdCategoria(p.id_categoria); setIdProveedor(p.id_proveedor);
                        }}
                      >
                        Editar
                      </button>
                      <button style={styles.btnDelete} onClick={() => eliminarProducto(p.id_producto)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.section}>
            <p style={styles.sectionTitle}>{editando ? 'Editar' : 'Crear'} Producto</p>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre</label>
                  <input style={styles.input} type="text" placeholder="Ej. Mouse inalámbrico" value={nombre} onChange={e => setNombre(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Descripción</label>
                  <input style={styles.input} type="text" placeholder="Descripción breve" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Precio (Q)</label>
                  <input style={styles.input} type="number" placeholder="0.00" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Stock</label>
                  <input style={styles.input} type="number" placeholder="0" value={stock} onChange={e => setStock(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ID Categoría</label>
                  <input style={styles.input} type="number" placeholder="1" value={idCategoria} onChange={e => setIdCategoria(e.target.value)} required />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>ID Proveedor</label>
                  <input style={styles.input} type="number" placeholder="1" value={idProveedor} onChange={e => setIdProveedor(e.target.value)} required />
                </div>
              </div>
              <div style={styles.formActions}>
                <button type="submit" style={styles.btnSubmit}>
                  {editando ? 'Actualizar Producto' : 'Crear Producto'}
                </button>
                {editando && (
                  <button type="button" style={styles.btnCancel} onClick={() => { setEditando(false); setIdEditar(null); limpiarFormulario(); }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {/* ── TAB CLIENTES ── */}
      {activeTab === 'clientes' && (
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
                {clientes.map(c => (
                  <tr key={c.id_cliente}>
                    <td style={styles.tdMuted}>#{c.id_cliente}</td>
                    <td style={styles.td}>{c.nombre}</td>
                    <td style={styles.td}>{c.apellido}</td>
                    <td style={styles.td}>{c.correo}</td>
                    <td style={styles.td}>
                      <button style={styles.btnEdit} onClick={() => cargarCliente(c)}>Editar</button>
                      <button style={styles.btnDelete} onClick={() => eliminarCliente(c.id_cliente)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={styles.section}>
            <p style={styles.sectionTitle}>{editandoC ? 'Editar' : 'Agregar'} Cliente</p>
            <form onSubmit={handleSubmitCliente}>
              <div style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Nombre</label>
                  <input style={styles.input} placeholder="Nombre" value={nombreC} onChange={e => setNombreC(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Apellido</label>
                  <input style={styles.input} placeholder="Apellido" value={apellidoC} onChange={e => setApellidoC(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Teléfono</label>
                  <input style={styles.input} placeholder="Teléfono" value={telefonoC} onChange={e => setTelefonoC(e.target.value)} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Correo</label>
                  <input style={styles.input} placeholder="correo@ejemplo.com" value={correoC} onChange={e => setCorreoC(e.target.value)} />
                </div>
              </div>
              <div style={styles.formActions}>
                <button type="submit" style={styles.btnSubmit}>
                  {editandoC ? 'Actualizar' : 'Crear'} Cliente
                </button>
                {editandoC && (
                  <button type="button" style={styles.btnCancel} onClick={() => {
                    setEditandoC(false); setIdEditarC(null);
                    setNombreC(''); setApellidoC(''); setTelefonoC(''); setCorreoC('');
                  }}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </>
      )}

      {/* ── TAB VENTAS ── */}
      {activeTab === 'ventas' && (
        <div style={styles.section}>
          <p style={styles.sectionTitle}>Reporte de Ventas</p>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thFirst}>ID Venta</th>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Cliente</th>
                <th style={styles.th}>Empleado</th>
                <th style={styles.thLast}>Total</th>
              </tr>
            </thead>
            <tbody>
              {reporte.map(r => (
                <tr key={r.id_venta}>
                  <td style={styles.tdMuted}>#{r.id_venta}</td>
                  <td style={styles.td}>{r.fecha}</td>
                  <td style={styles.td}>{r.cliente}</td>
                  <td style={styles.td}>{r.empleado}</td>
                  <td style={styles.td}>
                    <span style={styles.badgePrice}>Q{r.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;