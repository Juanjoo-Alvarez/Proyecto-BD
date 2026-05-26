import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Productos from './components/Productos';
import Clientes from './components/Clientes';
import Ventas from './components/Ventas';
import Reportes from './components/Reportes';
import Login from './components/Login';
import {
  getProductos, createProducto, updateProducto, deleteProducto,
  getClientes, createCliente, updateCliente, deleteCliente,
  getReporteVentas,
} from './services/api';
import { styles } from './styles/styles';

export const PERMISOS = {
  admin:      { tabs: ['productos', 'clientes', 'ventas', 'reportes'], puedeEscribir: true },
  inventario: { tabs: ['productos'],                                    puedeEscribir: true },
  vendedor:   { tabs: ['ventas'],                                       puedeEscribir: true },
  gerente:    { tabs: ['ventas', 'reportes'],                           puedeEscribir: false },
  auditor:    { tabs: ['reportes'],                                     puedeEscribir: false },
};

const productoInicial = { nombre: '', descripcion: '', precio: '', stock: '', id_categoria: '', id_proveedor: '' };
const clienteInicial  = { nombre: '', apellido: '', telefono: '', correo: '' };

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [rol,   setRol]   = useState(() => localStorage.getItem('rol')   || '');

  const [activeTab,      setActiveTab]      = useState('');
  const [productos,      setProductos]      = useState([]);
  const [clientes,       setClientes]       = useState([]);
  const [reporte,        setReporte]        = useState([]);
  const [productoForm,   setProductoForm]   = useState(productoInicial);
  const [clienteForm,    setClienteForm]    = useState(clienteInicial);
  const [productoEditId, setProductoEditId] = useState(null);
  const [clienteEditId,  setClienteEditId]  = useState(null);
  const [error,          setError]          = useState('');
  const [success,        setSuccess]        = useState('');

  const editandoProducto = productoEditId !== null;
  const editandoCliente  = clienteEditId  !== null;
  const permisos         = PERMISOS[rol]  || { tabs: [], puedeEscribir: false };

  // ✅ Fix 3: permisos.tabs en dependencias
  useEffect(() => {
    if (permisos.tabs.length > 0) setActiveTab(permisos.tabs[0]);
  }, [rol]); // eslint-disable-line react-hooks/exhaustive-deps

  // ✅ Fix 2: todos los hooks ANTES del return condicional
  useEffect(() => {
    if (!token) return; // si no hay token, no carga nada
    async function cargarDatos() {
      const resultados = await Promise.allSettled([
        getProductos(),
        getClientes(),
        getReporteVentas(),
      ]);

      const [productosResult, clientesResult, reporteResult] = resultados;

      if (productosResult.status === 'fulfilled') {
        setProductos(productosResult.value);
      } else {
        setError(productosResult.reason.message || 'Error al cargar productos');
      }

      if (clientesResult.status === 'fulfilled') {
        setClientes(clientesResult.value);
      } else {
        setError(clientesResult.reason.message || 'Error al cargar clientes');
      }

      if (reporteResult.status === 'fulfilled') {
        setReporte(reporteResult.value);
      } else {
        setError(reporteResult.reason.message || 'Error al cargar reporte');
      }
    }
    cargarDatos();
  }, [token]);

  const limpiarMensajes = () => { setError(''); setSuccess(''); };

  const handleLoginSuccess = ({ token, rol }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    setToken(token);
    setRol(rol);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    setToken('');
    setRol('');
    setActiveTab('');
  };

  // ✅ Fix 2: return condicional DESPUÉS de todos los hooks
  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // ── Handlers productos ────────────────────────────────────────────────────────
  const onSubmitProducto = async (e) => {
    e.preventDefault(); limpiarMensajes();
    const payload = {
      ...productoForm,
      precio:       parseFloat(productoForm.precio),
      stock:        parseInt(productoForm.stock, 10),
      id_categoria: parseInt(productoForm.id_categoria, 10),
      id_proveedor: parseInt(productoForm.id_proveedor, 10),
    };
    try {
      if (editandoProducto) { await updateProducto(productoEditId, payload); setSuccess('Producto actualizado'); }
      else                  { await createProducto(payload);                 setSuccess('Producto creado'); }
      setProductoForm(productoInicial); setProductoEditId(null);
      setProductos(await getProductos());
    } catch (e) { setError(e.message || 'Error al guardar producto'); }
  };

  const onEditProducto   = (p) => { limpiarMensajes(); setProductoEditId(p.id_producto); setProductoForm({ nombre: p.nombre||'', descripcion: p.descripcion||'', precio: p.precio??'', stock: p.stock??'', id_categoria: p.id_categoria??'', id_proveedor: p.id_proveedor??'' }); };
  const onDeleteProducto = async (id) => { limpiarMensajes(); try { await deleteProducto(id); setSuccess('Producto eliminado'); setProductos(await getProductos()); } catch(e){ setError(e.message||'Error'); } };
  const onCancelProducto = () => { setProductoEditId(null); setProductoForm(productoInicial); };

  // ── Handlers clientes ─────────────────────────────────────────────────────────
  const onSubmitCliente  = async (e) => { e.preventDefault(); limpiarMensajes(); try { if(editandoCliente){ await updateCliente(clienteEditId, clienteForm); setSuccess('Cliente actualizado'); } else { await createCliente(clienteForm); setSuccess('Cliente creado'); } setClienteForm(clienteInicial); setClienteEditId(null); setClientes(await getClientes()); } catch(e){ setError(e.message||'Error al guardar cliente'); } };
  const onEditCliente    = (c) => { limpiarMensajes(); setClienteEditId(c.id_cliente); setClienteForm({ nombre: c.nombre||'', apellido: c.apellido||'', telefono: c.telefono||'', correo: c.correo||'' }); };
  const onDeleteCliente  = async (id) => { limpiarMensajes(); try { await deleteCliente(id); setSuccess('Cliente eliminado'); setClientes(await getClientes()); } catch(e){ setError(e.message||'Error'); } };
  const onCancelCliente  = () => { setClienteEditId(null); setClienteForm(clienteInicial); };

  return (
    <div style={styles.app}>
      <div style={styles.headerBar}>
        <div>
          <p style={styles.pageTitle}>Panel de Gestión</p>
          <p style={styles.pageSub}>Administra productos, clientes y ventas desde un solo lugar</p>
        </div>
        <div style={styles.headerMeta}>
          <span style={styles.rolBadge}>{rol}</span>
          <button style={styles.btnLogout} onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabsVisibles={permisos.tabs}
      />

      {error   && <div style={styles.alertError}>{error}</div>}
      {success && <div style={styles.alertSuccess}>{success}</div>}

      {activeTab === 'productos' && permisos.tabs.includes('productos') && (
        <Productos
          productos={productos} form={productoForm} setForm={setProductoForm}
          editando={editandoProducto} onSubmit={onSubmitProducto}
          onEdit={onEditProducto} onDelete={onDeleteProducto}
          onCancelEdit={onCancelProducto} puedeEscribir={permisos.puedeEscribir}
        />
      )}
      {activeTab === 'clientes' && permisos.tabs.includes('clientes') && (
        <Clientes
          clientes={clientes} form={clienteForm} setForm={setClienteForm}
          editando={editandoCliente} onSubmit={onSubmitCliente}
          onEdit={onEditCliente} onDelete={onDeleteCliente}
          onCancelEdit={onCancelCliente} puedeEscribir={permisos.puedeEscribir}
        />
      )}
      {activeTab === 'ventas'   && permisos.tabs.includes('ventas')   && (
        <Ventas reporte={reporte} puedeEscribir={permisos.puedeEscribir} />
      )}
      {activeTab === 'reportes' && permisos.tabs.includes('reportes') && (
        <Reportes reporte={reporte} />
      )}
      
    </div>
  );
}

export default App;