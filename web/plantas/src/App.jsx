  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta planta?')) return;
    try {
      await axios.delete(`${uri}/${id}`);
      setPlantas(plantas.filter(planta => planta.id !== id));
    } catch (err) {
      alert('Erro ao excluir planta!');
    }
  };
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const uri = "http://localhost:3001/plantas"

function App() {
  const [plantas, setPlantas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(uri, form);
      setPlantas([...plantas, result.data]);
      setForm({ nome: '', nomeCientifico: '', descricao: '', imagem: '' });
      setShowModal(false);
    } catch (err) {
      alert('Erro ao cadastrar planta!');
    }
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
              <h2>Planta: {planta.nome}</h2>
              <p>Nome científico: {planta.nomeCientifico}</p>
              <p>Descrição: {planta.descricao}</p>
              <img src={planta.imagem} alt={planta.nome} />
              <div className='faixa'>
                <button onClick={() => handleDelete(planta.id)}>Excluir</button>
                <button>Editar</button>
              </div>
            </div>
          ))
        }
      </main>
      <footer>
        <p>By wellifabio</p>
        <button onClick={handleOpenModal} style={{ padding: '0.5rem 1.5rem', fontSize: '1rem', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Novo</button>
      </footer>

      {showModal && (
        <section className='modal'>
          <div className='janela'>
            <h2>Cadastrar Nova Planta</h2>
            <form onSubmit={handleSubmit}>
              <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
              <input name="nomeCientifico" placeholder="Nome Científico" value={form.nomeCientifico} onChange={handleChange} required />
              <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} required />
              <input name="imagem" placeholder="URL da Imagem" value={form.imagem} onChange={handleChange} required />
              <div className='faixa'>
                <button type="button" onClick={handleCloseModal} style={{ background: '#ccc', color: '#333', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem' }}>Cancelar</button>
                <button type="submit" style={{ background: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem' }}>Salvar</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  )
}

export default App;