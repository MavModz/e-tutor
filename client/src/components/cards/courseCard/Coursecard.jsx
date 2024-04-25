import React from 'react';
import Image from 'next/image';
import '../card.css';

const categoryStyles = {
    'Design': { backgroundColor: '#FFEEE8', textColor: '#993D20' },
    'Development': { backgroundColor: '#EBEBFF', textColor: '#342F98' },
    'Business': { backgroundColor: '#E1F7E3', textColor: '#15711F' },
    'Marketing': { backgroundColor: '#EBEBFF', textColor: '#342F98' },
    'IT & Software': { backgroundColor: '#FFF0F0', textColor: '#882929' },
    'Music': { backgroundColor: '#FFF2E5', textColor: '#65390C' },
    'Health & Fitness': { backgroundColor: '#E1F7E3', textColor: '#15711F' },
    'Office Productivity': { backgroundColor: '#F5F7FA', textColor: '#1D2026' },
    'Personal Development': { backgroundColor: '#FFEEE8', textColor: '#E34444' },
    'Finance & Accounting': { backgroundColor: '#E1F7E3', textColor: '#15711F' },
    'Photography & Video': { backgroundColor: '#E7ECF2', textColor: '#1D2026' },
    'Lifestyle': { backgroundColor: '#E1F7E3', textColor: '#15711F' },
  };

function courseCard({ courseThumbnail, courseName, coursePrice, rating, courseCategory }) {
    const { backgroundColor, textColor } = categoryStyles[courseCategory] || { backgroundColor: '#FFEEE8', textColor: '#993D20' };

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
                        <div className="card-course-detail flex justify-between items-center">
                            <span className='category-ribbon' style={{ backgroundColor, color: textColor }}>{courseCategory}</span>
                            <h5 className='card-course-price'>
                                Rs. {coursePrice}/-
                            </h5>
                        </div>
                        <div className="course-card-title flex justify-between">
                            <h4 title={courseName}>{courseName}</h4>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default courseCard