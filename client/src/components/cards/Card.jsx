import React from 'react';
import './card.css';
function Card({ courseName, courseCode, teacherName, coursePrice, rating }) {
    return (
        <>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-image">
                        <img src='/course-img.png' alt="courses thumbnail" className='card-thumbnail' />
                    </div>
                    <div className="card-data">
                        <div className="card-course-title flex justify-between">
                            <h4>{courseName}</h4>
                            <p>{courseCode}</p>
                        </div>
                        <hr />
                        <div className="course-card-info">
                            <img src='/Star.svg' alt="course rating" />
                            <span>{rating}</span>
                        </div>
                        <hr />
                        <div className="card-course-detail flex justify-between items-end">
                            <h5 className='card-course-instructor flex flex-col'>
                                <span>Instructor</span>
                                {teacherName}
                            </h5>
                            <h5 className='card-course-price'>
                                Rs. {coursePrice}/-
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card