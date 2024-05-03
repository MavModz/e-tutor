import React from 'react';
import Image from 'next/image';
import './card.css';
function Card({ courseThumbnail, courseName, courseCode, teacherName, coursePrice, rating }) {
    const teacherNames = Array.isArray(teacherName) ? teacherName.join(', ') : teacherName;
    return (
        <>
            <div className="card-container">
                <div className="card-wrapper">
                    <div className="card-image">
                        <Image src={courseThumbnail} width={312} height={178}
                            alt="courses thumbnail"
                            className='card-thumbnail'
                            priority={false}
                            quality={80}
                            onError={(e) => e.target.src = '/course-img.png'}
                        />
                    </div>
                    <div className="card-data">
                        <div className="card-course-title flex justify-between">
                            <h4 title={courseName}>{courseName}</h4>
                            <p>{courseCode}</p>
                        </div>
                        <hr />
                        <div className="course-card-info">
                            <div className="course-rating">
                                <Image src='/Star.svg' width={20} height={20} alt="course rating" />
                                <span>{rating}</span>
                            </div>
                            <div className="total-students">
                                <Image src='/User.svg' width={20} height={20} alt='user svg' />
                                <span className='total-students-data'>265.7K <p>students</p></span>
                            </div>
                        </div>
                        <hr />
                        <div className="card-course-details flex justify-between items-end">
                            <h5 className='card-course-instructor flex flex-col'>
                                <span>Instructor</span>
                                {teacherNames}
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