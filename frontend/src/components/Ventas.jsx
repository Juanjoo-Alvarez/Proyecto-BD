import { styles } from '../styles/styles';

function Ventas({ reporte }) {
  return (
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
          {reporte.map((r) => (
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
  );
}

export default Ventas;
