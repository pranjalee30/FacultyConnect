import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './About.sass'


const About = () => {
    return (
        <>
            <div className="about">
                <Navbar />
                <h1 className="about__title">About Faculty Connect</h1>

                <div className="about__section">
                    <h2 className="about__subtitle">Our Mission</h2>
                    <p className="about__text">At Faculty Connect, our mission is to simplify the campus experience by providing a reliable and easy-to-use platform where faculty members can share their schedules and locations in real-time. We understand the challenges students face when trying to locate their professors, especially in large campuses. Our goal is to eliminate this hassle and make academic interactions more seamless and efficient.</p>
                </div>

                <div className="about__section">
                    <h2 className="about__subtitle">How It Works</h2>
                    <p className="about__text"><strong>Faculty & Professors:</strong> Faculty members can easily register and create their profiles on Faculty Connect. Once registered, they can set their daily and weekly timetables, specifying where they will be at different times throughout the day. This ensures that their availability and location are always up-to-date and accessible to students.</p>
                    <p className="about__text"><strong>Students:</strong> Students can log in to Faculty Connect to view the real-time locations and schedules of their professors and faculty members. No more wandering around the campus or waiting outside offices—find your professors instantly and plan your visits accordingly.</p>
                </div>

                <div className="about__section">
                    <h2 className="about__subtitle">Inspiration</h2>
                    <p className="about__text">The idea for Faculty Connect was born out of a personal experience. While searching for a professor on a sprawling campus, it became clear that there had to be a better way to find and connect with faculty members. Thus, Faculty Connect was created to address this very need, making it easier for students to reach out to their professors when they need them the most.</p>
                </div>

                <div className="about__section">
                    <h2 className="about__subtitle">Future Goals</h2>
                    <p className="about__text">Currently, Faculty Connect is designed for NIT Agartala, providing our college community with an efficient way to connect. However, we have big plans for the future. Our vision is to expand Faculty Connect to every college, allowing faculty members to register themselves with their respective college names. This will enable students from various institutions to find their professors by selecting their college, making Faculty Connect a universal platform for academic connectivity.</p>
                    <p className="about__text">We are committed to continuously improving and expanding our services to ensure that Faculty Connect becomes an indispensable tool for students and faculty members across all campuses.</p>
                </div>

                <div className="about__cta">
                    <h2 className="about__subtitle">Join Us</h2>
                    <p className="about__text">We invite you to join the Faculty Connect community. Whether you're a professor looking to streamline your schedule or a student aiming to make the most out of your academic interactions, Faculty Connect is here to help. <a href="#" className="about__link">Sign up today</a> and experience the ease of finding and connecting with your faculty like never before.</p>
                </div>
            </div>
        </>
    );
}

export default About;
