import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.sass'
import Home from './views/Home/Home'
import SignUp from './views/SignUp/SignUp'
import Login from './views/Login/Login'
import Initiater from './views/Initiater/Initiater'
import Timetable from './views/Timetable/Timetable'
import Profile from './views/Profile/Profile'
import Search from './views/Search/Search'
import About from './views/About/About'
import Contact from './views/Contact/Contact'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/initiate' element={<Initiater />} />
        <Route path='/timetable' element={<Timetable />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/proffinder' element={<Search />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
export const API_URL = import.meta.env.VITE_API_URL
