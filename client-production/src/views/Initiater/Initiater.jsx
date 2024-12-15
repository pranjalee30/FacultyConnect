import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Initiater.sass'
import axios from 'axios';
import { API_URL } from '../../App';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

const Initiater = () => {

    const navigate = useNavigate();

    const [decode, setDecode] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const requestVerification = async () => {
        setLoading(true)
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            const res = await axios.get(`${API_URL}/auth/verify`)

            setDecode(res.data.decode)
            console.log(res.data.decode.initiated);
        } catch (err) {
            setError(err.response.data.message)
        }
        setLoading(false)
    }

    const requestInitialization = async e => {
        setLoading(true)
        try {
            const res = await axios.post(`${API_URL}/staffs/addstaff/${decode.id}`)
            navigate('/timetable')
        } catch (err) {
            const { message } = err.response.data

            if (message == 'Profile Is already Intiated')
                navigate('/timetable')
            else navigate('/login')
        }
    }

    useEffect(() => {
        requestVerification()
    }, [])
    

  return (
    <>
    <div className="initiater">
            <Navbar />
            {loading &&
                <Loading />
            }
            <div className="initiater__panel">
                {!loading && decode && <h1 className="initiater__title">
                    Logged in as <span className="initiater__name">Prof. {decode.fname} {decode.lname}</span> 
                </h1>}
                {!loading && !decode?.initiated && 
                <>
                    <h3 className="initiater__subtitle">
                        Let's get you Started. Initialize your profile to set a timetable.
                    </h3>
                    <button className="initiater__button gradient-btn" onClick={requestInitialization}>INITIATE PROFILE</button>
                </>
                }
                {!loading && decode?.initiated && <button className="initiater__button gradient-btn" onClick={() => navigate('/profile')}>GO TO PROFILE</button>}
            </div>
        </div>
    </>
  )
}

export default Initiater