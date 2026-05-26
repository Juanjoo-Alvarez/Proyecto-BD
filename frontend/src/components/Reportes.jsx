import { styles } from '../styles/styles';

function formatCurrency(value) {
  return new Intl.NumberFormat('es-GT', {
    style: 'currency',
    currency: 'GTQ',
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function Reportes({ reporte }) {
  const totalVentas = reporte.length;
  const totalIngresos = reporte.reduce((acc, item) => acc + Number(item.total || 0), 0);
  const ventaPromedio = totalVentas > 0 ? totalIngresos / totalVentas : 0;
  const mayorVenta = reporte.reduce((max, item) => {
    const valorActual = Number(item.total || 0);
    return valorActual > max ? valorActual : max;
  }, 0);

  return (
    <>
      <div style={styles.section}>
        <div style={styles.reportHeader}>
          <div>
            <p style={styles.sectionTitle}>Panel de Reportes</p>
            <p style={styles.reportLead}>
              Resumen general de ventas con indicadores clave y detalle por transacción.
            </p>
          </div>
        </div>

        <div style={styles.reportGrid}>
          <div style={styles.reportCard}>
            <div style={styles.reportCardLabel}>Ventas registradas</div>
            <div style={styles.reportCardValue}>{totalVentas}</div>
          </div>
          <div style={styles.reportCard}>
            <div style={styles.reportCardLabel}>Ingresos totales</div>
            <div style={styles.reportCardValue}>{formatCurrency(totalIngresos)}</div>
          </div>
          <div style={styles.reportCard}>
            <div style={styles.reportCardLabel}>Promedio por venta</div>
            <div style={styles.reportCardValue}>{formatCurrency(ventaPromedio)}</div>
          </div>
          <div style={styles.reportCard}>
            <div style={styles.reportCardLabel}>Venta mayor</div>
            <div style={styles.reportCardValue}>{formatCurrency(mayorVenta)}</div>
          </div>
        </div>

        <div style={styles.reportTableWrap}>
          {reporte.length === 0 ? (
            <div style={styles.reportEmpty}>No hay ventas para mostrar en este momento.</div>
          ) : (
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
                {reporte.map((item) => (
                  <tr key={item.id_venta}>
                    <td style={styles.tdMuted}>#{item.id_venta}</td>
                    <td style={styles.td}>{item.fecha}</td>
                    <td style={styles.td}>{item.cliente}</td>
                    <td style={styles.td}>{item.empleado}</td>
                    <td style={styles.td}>
                      <span style={styles.badgePrice}>{formatCurrency(item.total)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Reportes;
