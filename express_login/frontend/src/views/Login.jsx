import { useState } from "react";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = () => {
        fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then((response) => {
                return response.json()
            })
            .then(response => {
                console.log(response.error)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="col-12 col-md-6">
            <h1 className="text-white">Login</h1>
            <div className="form-group">
                <input onChange={(event) => { setEmail(event.target.value) }} className="form-control w-75 mt-3 mb-3" type="text" name="email" placeholder="Email"></input>
                <input onChange={(event) => { setPassword(event.target.value) }} className="form-control w-75 mb-3" type="password" name="password" placeholder="Password"></input>
                <button onClick={login} className="btn btn-success w-75">Login</button>
            </div>
        </div>
    )
}
