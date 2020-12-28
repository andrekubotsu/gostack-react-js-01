import React, { useEffect, useState } from "react"; //  incluir useEffect e useState
import api from './services/api'; // para chamar o axios 

import "./styles.css";

function App() {
  // lugar para armazenar as informações da API
  const [repositories, setRepositories] = useState([]);

  // dispara uma função assim que entra em tela
  useEffect(()=>{
    api.get('repositories').then(response=>{
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Algoritmos',
      url: 'http://www.google.com',
      techs: ['js', 'html', 'css']
    });

    setRepositories([...repositories, response.data]); // lembrar da imutabilidade
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository=>(
           <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
           </button></li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
