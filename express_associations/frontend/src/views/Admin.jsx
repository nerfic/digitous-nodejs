import React, { useState, useEffect } from 'react'
export default function Admin() {

    const [message, setMessage] = useState("Aucun message")

    useEffect(() => {
        fetch("http://localhost:8000/admin")
            .then(response => response.json())
            .then(result => {
                setMessage(result)
            })
    }, [])

    return (
        <div>

        </div>
    )
}
