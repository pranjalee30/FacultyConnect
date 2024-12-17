import { React} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import './Home.sass'

const Home = () => {

    const navigate = useNavigate()

  return (
    <>
        <div className="home">
            <div className="home__text-panel">
                <h1 className="home__title">Faculty Connect</h1>

                <div className="home__subtitle">
                    <h3 className="home__subtitle-text">Teachers, Professors, Faculty.<br />All at One Place.</h3>
                </div>

                <div className="home__notice">
                    <p className="home__notice-text">*Exclusive to staff and students of NIT Agartala.</p>
                </div>
            </div>

            <div className="home__options">
                <button className="home__start btn" onClick={() => navigate('/proffinder')}>START USING FACULTY CONNECT</button>
                <button className="home__login btn" onClick={() => navigate('/login')}>STAFF LOGIN <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
                <button className="home__login btn" onClick={() => navigate('/signup')}>STAFF SIGN UP <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
                <h3 className="home__about" onClick={() => navigate('/about')}>About Faculty Connect <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></h3>
            </div>
        </div>
    </>
  )
}

export default Home