import { useState } from "react";

function Signup() {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [surname, setSurname] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [error, setError] = useState("")

    const signup = () => {
        fetch("http://localhost:8000/signup", {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                surname: surname,
                password: password,
                passwordConfirm: passwordConfirm,
                dateOfBirth: dateOfBirth
            })
        })
            .then((response) => {
                return response.json()
            })
            .then(response => {
                console.log("response =",response.error)
                setError(response.error)  
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h1 className="text-white">Signup</h1>
                        <div className="form-group">
                            {error != null &&
                                <p className="text-danger">{error}</p>
                            }
                            <input onChange={(event) => { setEmail(event.target.value) }} className="form-control w-75 mt-3 mb-3" type="text" name="email" placeholder="Email"></input>
                            <input onChange={(event) => { setFirstName(event.target.value) }} className="form-control w-75 mb-3" type="text" name="firstName" placeholder="First Name"></input>
                            <input onChange={(event) => { setSurname(event.target.value) }} className="form-control w-75 mb-3" type="text" name="surname" placeholder="Surname"></input>
                            <input onChange={(event) => { setPassword(event.target.value) }} className="form-control w-75 mb-3" type="password" name="password" placeholder="Password"></input>
                            <input onChange={(event) => { setPasswordConfirm(event.target.value) }} className="form-control w-75 mb-3" type="password" name="passwordConfirm" placeholder="Paswword confirm"></input>
                            <input onChange={(event) => { setDateOfBirth(event.target.value) }} className="form-control w-75 mb-3" type="date" name="dateOfBirth"></input>
                            <button onClick={signup} className="btn btn-success w-75">Sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
