import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Profile.sass'
import axios from 'axios'
import { API_URL } from '../../App'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [decode, setDecode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const requestVerification = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            const res = await axios.get(`${API_URL}/auth/verify`)
            setDecode(res.data.decode)
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
        }
        setLoading(false)
    }

    const logout = async e => {
        localStorage.removeItem('token')
        navigate('/')
    }

    useEffect(() => {
        requestVerification()
    }, [])

    return (
        <>
            <div className="profile">
                <Navbar />
                {loading && (
                    <h1 className="profile__loading">Loading...</h1>
                )}
                {!loading && !decode && (
                    <div className="profile__not-logged-in">
                        <h1>You are not logged in</h1>
                        <p>Please log in or sign up to access your profile.</p>
                        <div className="profile__btn-container">
                            <button className="profile__btn gradient-btn" onClick={() => navigate('/login')}>Log In</button>
                            <button className="profile__btn gradient-btn" onClick={() => navigate('/signup')}>Sign Up</button>
                        </div>
                    </div>
                )}
                {!loading && decode && (
                    <>
                        <h1 className="profile__title">My Profile</h1>
                        <div className="profile__details">
                            <h5 className="profile__label">First Name:</h5>
                            <h3 className="profile__detail">{decode?.fname}</h3>
                            
                            <h5 className="profile__label">Last Name:</h5>
                            <h3 className="profile__detail">{decode?.lname}</h3>

                            <h5 className="profile__label">Username:</h5>
                            <h3 className="profile__detail">{decode?.username}</h3>

                            <button className="profile__btn gradient-btn" onClick={() => navigate('/timetable')}>My Timetable</button>
                            <button className="profile__btn gradient-btn" onClick={logout}>Log Out</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Profile
