import React from 'react';
import Image from 'next/image';
import './card.css';
function Card({ courseName, courseCode, teacherName, coursePrice, rating }) {
    return (
        <>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-image">
                        <Image src='/course-img.png' width={335} height={191} alt="courses thumbnail" className='card-thumbnail' />
                    </div>
                    <div className="card-data">
                        <div className="card-course-title flex justify-between">
                            <h4>{courseName}</h4>
                            <p>{courseCode}</p>
                        </div>
                        <hr />
                        <div className="course-card-info">
                            <Image src='/Star.svg' width={20} height={20} alt="course rating" />
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