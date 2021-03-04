import './App.css';
import {useEffect, useState} from 'react'

function App() {

  const [students, setStudents] = useState([])
  const [newStudents, setNewStudents] = useState('')

  const addStudent = () => {

    let alreadyExist = false
    
    for (let i = 0; i <= students.length; i++) {
      if (students[i].toLowerCase() == newStudents.toLocaleLowerCase()) {
        alreadyExist = true
        return alert('pas possible mec')
      } else if (newStudents.length === 0) {
        return alert('pas possible mec')
      }
    }
    if (!alreadyExist) {
      fetch("http://localhost:8000/students/add", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": newStudents
      })
    })
    }
  }

useEffect(() => {
  fetch("http://localhost:8000/students") 
       .then(response => response.json())
       .then(result => {
         setStudents(result)
      })
}, [])

  return (
      <div className="App">
      <header className="App-header">
        {students.map(student => {
          return (
            <h1>{student}</h1>
          )
        })}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <input onChange={(event) => {setNewStudents(event.target.value)}} className="form-control" type="text" name="student" placeholder="Nom" style={{width: '40%'}}></input>
              <button className="btn btn-success" onClick={addStudent}>Ajouter</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
