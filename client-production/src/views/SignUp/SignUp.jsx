import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../App'
import { useNavigate } from 'react-router-dom'
import './SignUp.sass'

const SignUp = () => {

  const navigate = useNavigate();

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const requestSignup = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        fName,
        lName,
        username,
        password
      })

      const { data: { token } } = res
      localStorage.setItem('token', `Bearer ${token}`)
      navigate('/initiate')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <>
    <div className="signup">
        <Navbar />
        <div className="signup__panel">
            <FontAwesomeIcon className="signup__user-icon" icon={faUser} />

            <div className="signup__input-panel">
                <input type="text" className="signup__input grey-inputs" placeholder='First Name' onChange={e => setFName(e.target.value)} />
                <input type="text" className="signup__input grey-inputs" placeholder='Last Name' onChange={e => setLName(e.target.value)} />  
                <input type="text" className="signup__input grey-inputs" placeholder='Username' onChange={e => setUsername(e.target.value)} />
                <input type="password" className="signup__input grey-inputs" placeholder='Password' onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <h4 className="signup__error">{error}</h4>}
            <div className="signup__options">
                <button className="signup__option o-1" onClick={requestSignup}>SIGN UP</button>
                <button className="signup__option o-2" onClick={() => navigate('/login')}>OR LOGIN</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default SignUp