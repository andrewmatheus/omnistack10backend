import React from 'react';

import './styles.css';

function DevItem(props){
  const { dev } = props

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}/>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <div className="click-dev">
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil Github</a>
        <div className="action">
          <button type="button" className="update">Alterar</button>
          <button type="button" className="delete">Excluir</button> 
        </div>        
      </div>
    </li>
  );
}

export default DevItem;