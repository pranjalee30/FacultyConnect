import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.sass'
import axios from 'axios'
import { API_URL } from '../../App'

const Login = () => {

    const navigate = useNavigate() 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const requestLogin = async e => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_URL}/auth/login`, {
                username,
                password
            })
    
            console.log(res);
            const { data: { token } } = res
            localStorage.setItem('token', `Bearer ${token}`)
            navigate('/initiate')
        } catch (err) {
            setError(err.response.data.message)
            console.log(err);
        }
    }

    return (
    <>
        <div className="login">
            <h1 className="login__title" onClick={() => navigate('/')}>CampusLocator</h1>
            <div className="login__warning">
                <p className="login__warning-text">ProfFinder Login is only for staff and teachers. Please do not misuse the service.</p>
            </div>
            <div className="login__inputs">
                <input type="text" className="login__input grey-inputs" placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input type="password" className="login__input grey-inputs" placeholder='Password' onChange={e => setPassword(e.target.value)}/>
            </div>
            {error && <h3 className="login__error">{error}</h3>}
            <div className="login__options">
                <button className="login__option gradient-btn" onClick={requestLogin}>LOG IN</button>
                <button className="login__option grey-btn" onClick={() => navigate('/signup')}>OR SIGN UP</button>
            </div>
        </div>
    </>
  )
}

export default Login