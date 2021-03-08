import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [association, setAssociation] = useState()

  const search = (value) => {
    fetch(`http://localhost:8000/associations/${value}`)
      .then(response => response.json())
      .then(result => {
        setAssociation(result)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <input type="text" onChange={(event) => {setAssociation(event.target.value)}}></input> */}
        <button onClick={() => { search('konexio') }}>Konexio</button>
        <button onClick={() => { search('restau-du-coeur') }}>Restau du coeur</button>
        <button onClick={() => { search('la-croix-rouge') }}>La croix rouge</button>
        {association != undefined &&
          <>
            <p>{association.name}</p>
            <p>{association.description}</p>
          </>
        }
      </header>
    </div>
  );
}

export default App;
