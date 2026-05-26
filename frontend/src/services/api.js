const API_BASE_URL = 'http://localhost:5000';

async function request(path, options = {}) {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
        ...options,
    });

    // Token expirado o inválido → limpiar sesión y recargar
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        window.location.reload();
        return;
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || data.message || 'Error en la solicitud');
    }

    return data;
}

// ── Productos ──────────────────────────────────────────────────────────────────
export function getProductos() {
    return request('/api/products');
}
export function createProducto(payload) {
    return request('/api/products', { method: 'POST', body: JSON.stringify(payload) });
}
export function updateProducto(id, payload) {
    return request(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
export function deleteProducto(id) {
    return request(`/api/products/${id}`, { method: 'DELETE' });
}

// ── Clientes ───────────────────────────────────────────────────────────────────
export function getClientes() {
    return request('/api/clientes');
}
export function createCliente(payload) {
    return request('/api/clientes', { method: 'POST', body: JSON.stringify(payload) });
}
export function updateCliente(id, payload) {
    return request(`/api/clientes/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
export function deleteCliente(id) {
    return request(`/api/clientes/${id}`, { method: 'DELETE' });
}

// ── Ventas / Reporte ───────────────────────────────────────────────────────────
export function getReporteVentas() {
    return request('/reporte');  
}

// ── Auth ───────────────────────────────────────────────────────────────────────
export function login(payload) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}