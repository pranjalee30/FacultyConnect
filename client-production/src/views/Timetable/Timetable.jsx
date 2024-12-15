import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../App';
import Navbar from '../../components/Navbar/Navbar';
import './Timetable.sass'
import { useNavigate } from 'react-router-dom';

const Timetable = () => {

    const navigate = useNavigate()

    const [decode, setDecode] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timetable, setTimetable] = useState(null);

    const [openDayState, setOpenDayState] = useState('');
    const [openTimeslotState, setOpenTimeslotState] = useState('');

    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    const requestVerification = async () => {
       // setLoading(true)
        try {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            const res = await axios.get(`${API_URL}/auth/verify`)

            setDecode(res.data.decode)
        } catch (err) {
            navigate('/login')
        }
        setLoading(false)
    }

    const fetchTimetable = async () => {
        try {
            const res = await axios.get(`${API_URL}/staffs/getstaff/${decode.id}`)
            console.log(res);
            setTimetable(res.data.timetable)
        } catch (err) {
            setError(err.response.data.message)
        }
    }

    const requestAddLocation = async (e, timetableID, dayID, timeSlotID) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_URL}/staffs/addlocation/${timetableID}/${dayID}/${timeSlotID}`, {
                location
            })
        } catch (err) {
            setError('An Error Occured. Please try again later')
        }
    }

    const requestAddStatus = async (e, timetableID, dayID, timeSlotID) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_URL}/staffs/addstatus/${timetableID}/${dayID}/${timeSlotID}`, {
                status
            })
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const requestMarkAbsent = async (e, staffID, dayID) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/staffs/absent/${staffID}/${dayID}`);
            console.log(dayID);
        } catch (err) {
            console.log(err);
        }
    }

    const invertOpenState = id => {
        if (!openDayState) setOpenDayState(id)
        else setOpenDayState('')
    }

    const invertTimeSlotState = id => {
        if (!openTimeslotState) setOpenTimeslotState(id)
        else if (openTimeslotState == id) setOpenTimeslotState('')
        else setOpenTimeslotState(id)
    }

    useEffect(() => {
        requestVerification()
    }, [])

    useEffect(() => {
        fetchTimetable()
    }, [decode, timetable])

  return (
    <>
        {loading &&
            <div className="timetable__loading-container">
                <h1 className="timetable__loading">Loading...</h1>
            </div>
        }
        {!loading && 
            <div className="timetable">
                <Navbar />
                <h1 className="timetable__title">
                    Edit/Create Timetable
                </h1>

                {!error && 
                    <div className="timetable__panel">
                        {timetable && timetable.days.map(day =>
                        <React.Fragment key={day._id}>
                            <h1 className='timetable__day' onClick={() => invertOpenState(day._id)}>
                                &gt; {day.dayName}
                            </h1>
                            
                            {day.absent && <span className='absent__warn'>Absent</span>}

                            {openDayState === day._id && 
                                <>
                                    <button className="timetable__absent-btn gradient-btn" onClick={e => requestMarkAbsent(e, timetable._id, day._id)}>MARK {day.absent ? 'UNABSENT' : 'ABSENT'}</button>
                                    {day.timeSlots.map(timeSlot => 
                                    <>
                                        <h3 className="timetable__timeslot" onClick={() => invertTimeSlotState(timeSlot._id)} key={timeSlot._id}>&gt; {timeSlot.timeSlotName}</h3>
                                        {openTimeslotState === timeSlot._id &&
                                            <>
                                                <h3 className="timetable__location">Current Location: {timeSlot.location}</h3>  
                                                <input type="text" className="timetable__location-input grey-inputs" placeholder='Enter Location' onChange={e => setLocation(e.target.value)}/>
                                                <button className="timetable__location-btn gradient-btn" onClick={e => requestAddLocation(e, timetable._id, day._id, timeSlot._id)} >ADD LOCATION</button>

                                                <h3 className="timetable__location">Default Status: {timeSlot.status}</h3>  
                                                <input type="text" className="timetable__location-input grey-inputs" placeholder='Enter Status' onChange={e => setStatus(e.target.value)} />
                                                <button className="timetable__location-btn gradient-btn" onClick={e => requestAddStatus(e, timetable._id, day._id, timeSlot._id)}>ADD STATUS</button>
                                            </>
                                        }
                                    </>
                                    )}
                                </>
                            }
                        </React.Fragment> 
                        )}
                        <br />
                        <button className="timetable__btn gradient-btn" onClick={() => navigate('/profile')}>SAVE AND GO TO PROFILE</button>
                    </div>
                }
                {error &&
                    <>
                        <h3 className="timetable__error">{error}</h3>
                        <button className="timetable__initiate-btn gradient-btn" onClick={() => navigate('/initiate')}>INITIATE PROFILE</button>
                    </>
                }
            </div>
        }
    </>
  )
}

export default Timetable