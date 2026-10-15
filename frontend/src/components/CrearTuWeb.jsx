import React, { useState } from 'react';
import supabase from '../utils/supabaseClient';
import './CrearTuWeb.css';

export default function CrearTuWeb() {
  const [plantilla, setPlantilla] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    objetivo: '',
    keywords: '',
    color: '#0d6efd',
    imagen: '',
    cta: '',
    url: '',
    email: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  function seleccionarPlantilla(tipo) {
    setPlantilla(tipo);
    setMensaje(`Plantilla seleccionada: ${tipo}`);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function generarLanding(e) {
    e && e.preventDefault();
    if (!plantilla) {
      setMensaje('Por favor selecciona una plantilla.');
      return;
    }
    setLoading(true);
    setMensaje(null);

    const datos = {
      plantilla,
      ...form
    };

    try {
      const { data, error } = await supabase.from('landings').insert([datos]);
      if (error) {
        console.error('Error guardando en Supabase:', error);
        setMensaje('Hubo un error al guardar tus datos. Revisa la consola.');
      } else {
        console.log('Datos guardados:', data);
        setMensaje('¡Tu landing ha sido guardada exitosamente en Supabase!');
        // limpiar o mantener según prefieras
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error inesperado al guardar.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <section id="crea-tu-web" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h2>Crea tu propia web con IA</h2>
        <p>Elige una plantilla, personaliza tu contenido y genera tu landing dentro de Coporo.</p>

        <div className="plantillas" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <div className="plantilla" style={{ border: '1px solid #ccc', padding: '1rem', width: '30%' }}>
            <h3>Negocio Local</h3>
            <p>Ideal para tiendas, servicios o emprendimientos.</p>
            <button type="button" onClick={() => seleccionarPlantilla('negocio')}>Usar esta plantilla</button>
          </div>
          <div className="plantilla" style={{ border: '1px solid #ccc', padding: '1rem', width: '30%' }}>
            <h3>Rifa o Evento</h3>
            <p>Promociona sorteos, rifas o actividades especiales.</p>
            <button type="button" onClick={() => seleccionarPlantilla('rifa')}>Usar esta plantilla</button>
          </div>
          <div className="plantilla" style={{ border: '1px solid #ccc', padding: '1rem', width: '30%' }}>
            <h3>Producto o Servicio</h3>
            <p>Vende productos o muestra tus servicios.</p>
            <button type="button" onClick={() => seleccionarPlantilla('producto')}>Usar esta plantilla</button>
          </div>
        </div>

        <form id="formularioLanding" style={{ marginTop: '3rem' }} onSubmit={generarLanding}>
          <h3>Personaliza tu landing</h3>

          <label>Nombre del proyecto:</label><br />
          <input type="text" name="nombre" required value={form.nombre} onChange={handleChange} /><br /><br />

          <label>Descripción breve:</label><br />
          <textarea name="descripcion" rows="3" required value={form.descripcion} onChange={handleChange}></textarea><br /><br />

          <label>Objetivo principal:</label><br />
          <input type="text" name="objetivo" required value={form.objetivo} onChange={handleChange} /><br /><br />

          <label>Palabras clave (SEO):</label><br />
          <input type="text" name="keywords" placeholder="Ej: rifas, sorteos, premios" value={form.keywords} onChange={handleChange} /><br /><br />

          <label>Color principal:</label><br />
          <input type="color" name="color" value={form.color} onChange={handleChange} /><br /><br />

          <label>Imagen o logo (URL):</label><br />
          <input type="url" name="imagen" value={form.imagen} onChange={handleChange} /><br /><br />

          <label>Botón principal (texto):</label><br />
          <input type="text" name="cta" placeholder="Ej: Participa ahora" value={form.cta} onChange={handleChange} /><br /><br />

          <label>Enlace del botón (URL destino):</label><br />
          <input type="url" name="url" value={form.url} onChange={handleChange} /><br /><br />

          <label>Correo de contacto:</label><br />
          <input type="email" name="email" value={form.email} onChange={handleChange} /><br /><br />

          <label>Teléfono o WhatsApp:</label><br />
          <input type="tel" name="telefono" value={form.telefono} onChange={handleChange} /><br /><br />

          <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Generar mi landing'}</button>
        </form>

        {mensaje && <p style={{ marginTop: '1rem' }}>{mensaje}</p>}
      </section>
    </div>
  );
}
