import React, { useState } from 'react'

export default function Home() {

    const [association, setAssociation] = useState()

    const search = (value) => {
        fetch(`http://localhost:8000/associations/${value}`)
            .then(response => response.json())
            .then(result => {
                setAssociation(result)
            })
    }

    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <button onClick={() => { search('konexio') }}>Konexio</button>
                    <button onClick={() => { search('restau-du-coeur') }}>Restau du coeur</button>
                    <button onClick={() => { search('la-croix-rouge') }}>La croix rouge</button>
                    {association != undefined &&
                        <>
                            <p>{association.name}</p>
                            <img src={association.img} />
                            <p>{association.description}</p>
                        </>
                    }
                </header>
            </div>
        </div>
    )
}
