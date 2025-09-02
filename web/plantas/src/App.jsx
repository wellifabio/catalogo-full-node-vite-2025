import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3001/plantas',
      );
      setPlantas(result.data);
    };
    fetchData();
  }, []);

  return(
    <>
    <header>
      <h1>Catálogo de Plantas</h1>
    </header>
    <main>
      {
        plantas.map( planta => (
          <div key={planta.id} className="card">
            <h2>{planta.nome}</h2>
            <p>{planta.descricao}</p>
          </div>
        ))
      }
    </main>
    <footer>
      <p>By wellifabio</p>
    </footer>
    </>
  )
}

export default App;