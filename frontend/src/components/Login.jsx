import { useState } from 'react';
import { styles } from '../styles/styles';
import { login } from '../services/api';

function Login({ onLoginSuccess }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');
    setLoading(true);

    try {

      const data = await login({
        username,
        password
      });

      console.log(data);

      localStorage.setItem(
        'token',
        data.token
      );

      localStorage.setItem(
        'rol',
        data.rol
      );

      onLoginSuccess({
        token: data.token,
        rol: data.rol
      });

    } catch (error) {

      console.error(error);
      setError(error.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.loginWrapper}>

      <div style={styles.loginCard}>

        <p style={styles.pageTitle}>
          Iniciar sesión
        </p>

        {error && (
          <div style={styles.alertError}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Nombre de usuario
            </label>

            <input
              style={styles.input}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />

          </div>

          <div style={styles.formGroup}>

            <label style={styles.label}>
              Contraseña
            </label>

            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            style={styles.btnPrimary}
            type="submit"
            disabled={loading}
          >

            {loading
              ? 'Ingresando...'
              : 'Ingresar'}

          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;