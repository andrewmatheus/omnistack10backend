import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
// Componente: Component é um bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação.
// Propriedade: Props informações que um component PAI passa para o component FILHO
// Estado: state informações mantidas pelo componente (Lembrar o conceito de imutabilidade)
// Fragment é uma tag sem nada <> mais de um component sem precisar criar div </>  

function App() { 
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data){        
    const response = await api.post('/devs', data)  
    
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>          
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}          
        </ul>
      </main>
    </div>
  );
}

export default App;
