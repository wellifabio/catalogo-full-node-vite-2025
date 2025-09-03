import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const uri = "http://localhost:3001/plantas"

function App() {
  const [plantas, setPlantas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });

  const handleOpenModal = () => {
    setForm({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setForm({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        // Editar planta existente
        const result = await axios.patch(`${uri}/${form.id}`, form);
        setPlantas(plantas.map(p => p.id === form.id ? result.data : p));
      } else {
        // Nova planta
        const result = await axios.post(uri, form);
        setPlantas([...plantas, result.data]);
      }
      setForm({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });
      setShowModal(false);
    } catch (err) {
      alert('Erro ao salvar planta!');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma a exclusão desta planta?')) return;
    try {
      await axios.delete(`${uri}/${id}`);
      setPlantas(plantas.filter(planta => planta.id != id));
    } catch (err) {
      alert('Erro ao excluir planta!');
    }
  };

  const handleEdit = (id) => {
    const planta = plantas.find(planta => planta.id === id);
    setForm({ ...planta });
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        uri,
      );
      setPlantas(result.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <header>
        <h1>Catálogo de Plantas</h1>
      </header>
      <main>
        {
          plantas.map(planta => (
            <div key={planta.id} className="card">
              <h2>{planta.nome}</h2>
              <p><b>Binómeno:</b> {planta.nomeCientifico}</p>
              <p><b>Descrição:</b> {planta.descricao}</p>
              <img src={planta.imagem ? planta.imagem : 'logo.jpg'} alt={planta.nome} />
              <div className='faixa'>
                <button onClick={() => handleEdit(planta.id)}>Editar</button>
                <button onClick={() => handleDelete(planta.id)}>Excluir</button>
              </div>
            </div>
          ))
        }
      </main>
      <footer>
        <p>By wellifabio</p>
        <button onClick={handleOpenModal}>Novo</button>
      </footer>

      {showModal && (
        <section className='modal'>
          <div className='janela'>
            {/* Se form.id estiver definido, estamos editando uma planta existente */}
            <h2>{form.id ? 'Editar Planta' : 'Cadastrar Nova Planta'}</h2>
            <form onSubmit={handleSubmit}>
              <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
              <input name="nomeCientifico" placeholder="Nome Científico" value={form.nomeCientifico} onChange={handleChange} required />
              <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
              <input name="imagem" placeholder="URL da Imagem" value={form.imagem} onChange={handleChange} />
              <div className='faixa'>
                <button type="button" onClick={handleCloseModal}>Cancelar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default App;