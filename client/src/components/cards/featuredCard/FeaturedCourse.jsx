import React from 'react';
import Image from 'next/image';
import './featuredcourse.css';

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

function FeaturedCourse({ courseThumbnail, courseName, courseCode, teacherName, coursePrice, courseDuration, courseLevel, rating, courseCategory }) {
    const { backgroundColor, textColor } = categoryStyles[courseCategory] || { backgroundColor: '#FFEEE8', textColor: '#993D20' };
    return (
        <div className="featured-card-container">
            <div className="featured-course-img">
                <Image src={courseThumbnail} width={220} height={170}
                    alt="courses thumbnail"
                    className='featured-card-thumbnail'
                    priority={false}
                    quality={80}
                    onError={(e) => e.target.src = '/course-img.png'}
                />
            </div>
            <div className="featured-course-card-data">
                <div className="featured-course-details flex justify-between">
                    <span className='featured-category-ribbon' style={{ backgroundColor, color: textColor }}>{courseCategory}</span>
                    <h5 className='featured-card-course-price'>
                        Rs. {coursePrice}/-
                    </h5>
                </div>
                <div className="course-card-title flex justify-between">
                    <h4 title={courseName}>{courseName}</h4>
                </div>
                <div className="featured-course-card-info">
                    <div className="featured-course-rating flex items-center gap-2">
                        <Image src='/Star.svg' width={20} height={20} alt="course rating" />
                        <span>{rating}</span>
                    </div>
                    <div className="featured-total-students flex items-center gap-2">
                        <Image src='/User.svg' width={20} height={20} alt='user svg' />
                        <span className='featured-total-students-data flex gap-2'>265.7K <p>students</p></span>
                    </div>
                </div>
                <hr />
                <div className="featured-course-level flex justify-between">
                    <div className="featured-total-students flex items-center gap-2">
                        <Image src='/User.svg' width={20} height={20} alt='user svg' />
                        <span className='featured-total-students-data flex gap-2'>265.7K <p>students</p></span>
                    </div>
                    <div className="featured-course-level-info flex gap-2">
                        <Image src='/bar-chart.svg' width={20} height={20} alt='course level svg' />
                        <span>{courseLevel}</span>
                    </div>
                    <div className="featured-course-duration flex gap-2">
                        <Image src='/Clock-color.svg' width={20} height={20} alt='course duration svg' />
                        <span>{courseDuration}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCourse