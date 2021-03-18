import React, {useState, useEffect} from 'react'

export default function Admin() {

    const [isConnected, setIsConnected] = useState(false)
    const [users, setUsers] = useState()

    const connected = () => {
        fetch('http://localhost:8000/admin', {
          headers: {
            'Authorization': "Bearer " + localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(response => {
            console.log(response.status);
            if (response.status === 401) {
              setIsConnected(false)
            } else {
              setIsConnected(true)
            }
            return response.json()
          })
          .then(response => {
              setUsers(response.users)
              console.log(users)
          })
      }

      useEffect(() => {
        connected()
      }, [])

    return (
        <div>
            {isConnected &&
            <>
                <div className="container">
                <h2 className="text-white">Liste des utilisateurs</h2>
                {users &&
                    users.map(user => {
                        return (
                            <>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <p>First name: {user.firstName}</p>
                                        <p>Email : {user.email}</p>
                                    </div>
                                </div>
                                
                            </>
                        )
                    })
                }
                </div>
            </>
            }
            {!isConnected &&
                <p>Pas les droits</p>
            }
        </div>
    )
}
