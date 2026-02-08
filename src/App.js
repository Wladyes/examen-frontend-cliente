import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [simulacion, setSimulacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  
  const [formData, setFormData] = useState({
    usuario_id: '',
    capital_disponible: 3000
  });

  useEffect(() => {
    cargarUsuarios();
    cargarProductos();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Llamando a GET /usuarios...');
      const response = await axios.get(`${API_URL}/usuarios`);
      console.log('Respuesta:', response.data);
      setUsuarios(response.data);
      setMensaje('Usuarios cargados correctamente');
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar usuarios: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Llamando a GET /productos...');
      const response = await axios.get(`${API_URL}/productos`);
      console.log('Respuesta:', response.data);
      setProductos(response.data);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar productos: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const crearSimulacion = async () => {
    try {
      setLoading(true);
      setError(null);
      setSimulacion(null);
      
      const payload = {
        usuario_id: formData.usuario_id,
        capital_disponible: parseFloat(formData.capital_disponible),
        productos: productos.map(p => ({
          nombre: p.nombre,
          precio: parseFloat(p.costo || p.precio),
          porcentaje_ganancia: parseFloat(p.porcentaje_retorno || p.porcentaje_ganancia)
        }))
      };

      console.log('Llamando a POST /simulaciones...');
      console.log('Payload:', JSON.stringify(payload, null, 2));
      
      const response = await axios.post(`${API_URL}/simulaciones`, payload);
      console.log('Respuesta:', response.data);
      setSimulacion(response.data);
      setMensaje('Simulacion creada exitosamente');
    } catch (err) {
      console.error('Error:', err);
      setError('Error al crear simulacion: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <div className="container">
      <h1>AndesFin - Cliente de Examen</h1>
      <p>Este frontend consume tu microservicio en: <strong>{API_URL}</strong></p>
      
      {error && <div className="error">{error}</div>}
      {mensaje && <div className="success">{mensaje}</div>}
      {loading && <div className="loading">Cargando...</div>}

      <section>
        <h2><span className="badge badge-get">GET</span> /usuarios</h2>
        <button onClick={cargarUsuarios} disabled={loading}>Cargar Usuarios</button>
        {usuarios.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Capital</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.id?.substring(0, 8)}...</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>${parseFloat(u.capital_disponible).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay usuarios. Haz clic en Cargar Usuarios.</p>
        )}
      </section>

      <section>
        <h2><span className="badge badge-get">GET</span> /productos</h2>
        <button onClick={cargarProductos} disabled={loading}>Cargar Productos</button>
        {productos.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Retorno %</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${parseFloat(p.costo || p.precio).toFixed(2)}</td>
                  <td>{p.porcentaje_retorno || p.porcentaje_ganancia}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay productos. Haz clic en Cargar Productos.</p>
        )}
      </section>

      <section>
        <h2><span className="badge badge-post">POST</span> /simulaciones</h2>
        <div className="form-group">
          <label>Usuario:</label>
          <select 
            value={formData.usuario_id}
            onChange={(e) => setFormData({...formData, usuario_id: e.target.value})}
          >
            <option value="">-- Seleccionar --</option>
            {usuarios.map(u => (
              <option key={u.id} value={u.id}>{u.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Capital: $</label>
          <input 
            type="number"
            value={formData.capital_disponible}
            onChange={(e) => setFormData({...formData, capital_disponible: e.target.value})}
          />
        </div>
        <button 
          onClick={crearSimulacion} 
          disabled={loading || !formData.usuario_id || productos.length === 0}
        >
          Crear Simulacion
        </button>
      </section>

      {simulacion && (
        <section>
          <h2>Resultado de Simulacion</h2>
          <pre>{JSON.stringify(simulacion, null, 2)}</pre>
        </section>
      )}

      <section style={{background: '#fff3cd', padding: '20px', borderRadius: '5px', marginTop: '30px'}}>
        <h2>Endpoints que tu Microservicio DEBE implementar:</h2>
        <table>
          <thead>
            <tr>
              <th>Metodo</th>
              <th>Ruta</th>
              <th>Descripcion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="badge badge-get">GET</span></td>
              <td>/usuarios</td>
              <td>Retornar array de usuarios</td>
            </tr>
            <tr>
              <td><span className="badge badge-get">GET</span></td>
              <td>/productos</td>
              <td>Retornar array de productos</td>
            </tr>
            <tr>
              <td><span className="badge badge-post">POST</span></td>
              <td>/simulaciones</td>
              <td>Crear simulacion</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
