import { styles } from '../styles/styles';

const LABELS = {
  productos: 'Productos',
  clientes:  'Clientes',
  ventas:    'Ventas',
  reportes:  'Reportes',
};

export default function Navbar({ activeTab, onTabChange, tabsVisibles = [] }) {
  return (
    <nav style={styles.navbar}>
      {tabsVisibles.map(tab => (
        <button
          key={tab}
          style={activeTab === tab ? styles.navBtnActive : styles.navBtn}
          onClick={() => onTabChange(tab)}
        >
          {LABELS[tab]}
        </button>
      ))}
    </nav>
  );
}