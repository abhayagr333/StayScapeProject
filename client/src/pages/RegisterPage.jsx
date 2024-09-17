import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

export default function RgisterPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function RegisterUser(ev) {
        ev.preventDefault();  //to ensure that it doen not reload the page
        // axios.get('https://localhost:4091/test')
        // axios.get('http://127.0.0.1:4091/test', { withCredentials: true })
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error(error));
        try {
            await axios.post('http://localhost:4091/Register', {
                name,
                email,
                password
            });
            alert('Registration successful. now you can log in')
        } catch (e) {
            if (e.response && e.response.data) {
                alert(`Registration failed: ${e.response.data.message}`);
            } else {
                alert('Registration failed. Please try again later');
            }
        }

    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-16 ">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={RegisterUser}>
                    <input type="text" placeholder="xyx abc"
                        value={name}
                        onChange={ev => {
                            setName(ev.target.value)
                        }} />
                    <input type="email" placeholder="ahshfhhb@email.com"
                        value={email}
                        onChange={ev => {
                            setEmail(ev.target.value)
                        }} />
                    <input type="password" placeholder="password"
                        value={password}
                        onChange={ev => {
                            setPassword(ev.target.value)
                        }} />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member?
                        <Link className="underline text-black" to={'/login'}> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}