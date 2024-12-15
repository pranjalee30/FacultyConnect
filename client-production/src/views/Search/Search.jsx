import React, { useEffect, useState } from 'react'
import './Search.sass'
import axios from 'axios';
import { API_URL } from '../../App';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(null);

    const [profileID, setprofileID] = useState('');
    const [dayName, setDayName] = useState('');
    const [timeSlotName, settimeSlotName] = useState('')

    const [results, setResults] = useState(null);

    const fetchAllData = async () => {
        try {
            const res = await axios.get(`${API_URL}/staffs/all`)
            setData(res.data)
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    const requestQueryExecution = async e => {
        e.preventDefault()
        try {
            const res = await axios.post(`${API_URL}/staffs/search`, {
                profileID,
                dayName,
                timeSlotName
            })
            setResults(res.data.result)
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [])

  return (
    <>
        <Navbar />
        <div className="search">
            <div className="search__header">
                <h1 className="search__title" onClick={() => navigate('/')}>CampusLocator</h1>
                <div className="search__subtitle">
                    <p className="search__subtitle-text">Select from below to fetch data</p>
                </div>
            </div>
            <div className="search__inputs">
                <select className='search__dropdown d-1' onChange={e => setprofileID(e.target.value)}>
                    <option className='search__option' value="">Select Staff</option>
                    {data && data?.profiles.map(profile => 
                        <option className='search__option' key={profile._id} value={profile._id}>Prof. {profile.fName} {profile.lName}</option>
                    )}
                </select>
                <select className="search__dropdown d-2" onChange={e => setDayName(e.target.value)}>
                    <option className='search__option' value="">Select Day</option>
                    {data && data?.timetables[0].days.map(day => 
                        <option className='search__option' key={day._id} value={day.dayName}>{day.dayName}</option>
                    )}
                </select>
                <select className="search__dropdown d-3" onChange={e => settimeSlotName(e.target.value)}>
                    <option className='search__option' value="">Select Time Slot</option>
                    {data && data?.timetables[0].days[0].timeSlots.map(timeSlot => 
                        <option className='search__option' key={timeSlot._id} value={timeSlot.timeSlotName}>{timeSlot.timeSlotName}</option>
                    )}
                </select>
            </div>
            <div className="search__btn gradient-btn" onClick={requestQueryExecution}>SEARCH</div>
            {results &&
                <div className="result">
                    <h3 className="result__title">Query Results</h3><hr />
                    <h1 className="result__name">{results.name}</h1>
                    <h3 className="result__dayname">{results.dayName}</h3>
                    <h3 className='result__timeslot'>{results.timeSlotName}</h3>
                    <div className="result__main">
                        <h3 className="result__location">Location: {results.location}</h3>
                        {!results.absent && <h3 className="result__status">Current Status: {results.status}</h3>}
                        {results.absent && <h3 className="result__absent">ABSENT</h3>}
                    </div>
                </div>
            }
        </div>
    </>
  )
}

export default Search