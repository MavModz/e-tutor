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

function courseCard({ courseThumbnail, courseName, coursePrice, rating, courseCategory, instructors, courseLevel, courseDuration, courseTopics }) {
    const { backgroundColor, textColor } = categoryStyles[courseCategory] || { backgroundColor: '#FFEEE8', textColor: '#993D20' };

    return (
        <div className='full-course-card-wrapper'>
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
            <div className="course-hover-details min-h-[570px] min-w-[433px]">
                <div className="course-hover-area">
                    <div className="card-course-detail flex flex-col gap-2.5">
                        <div>
                            <span className='category-ribbon' style={{ backgroundColor, color: textColor }}>{courseCategory}</span>
                        </div>
                        <div className="course-card-title flex justify-between">
                            <h4 title={courseName}>{courseName}</h4>
                        </div>
                    </div>
                </div>
                <div className="hover-ratings flex justify-between items-center">
                    <div className="instructor-name flex gap-3">
                        <Image src='/Photo.svg' width={48} height={48} alt='Teacher Profile svg' />
                        <div className='instructor-name-details'>
                            <span>Course By</span>
                            <p>Kevin Name</p>
                        </div>
                    </div>
                    <div className="hover-course-rating">
                        <Image src='/Star.svg' width={20} height={20} alt="course rating" />
                        <p>{rating} <span>(357,941)</span></p>
                    </div>
                </div>
                <div className="featured-course-level flex justify-between items-center">
                    <div className="featured-total-students flex items-center gap-2">
                        <Image src='/User.svg' width={20} height={20} alt='user svg' />
                        <span className='featured-total-students-data flex gap-2'>265.7K <p>students</p></span>
                    </div>
                    <div className="featured-course-level-info flex gap-2">
                        <Image src='/bar-chart-color.svg' width={20} height={20} alt='course level svg' />
                        <span>{courseLevel}</span>
                    </div>
                    <div className="featured-course-duration flex gap-2">
                        <Image src='/Clock-color.svg' width={20} height={20} alt='course duration svg' />
                        <span>{courseDuration}</span>
                    </div>
                </div>
                <div className="hover-price-container flex justify-between">
                    <div className="hover-price-area flex items-center gap-2.5">
                        <div className="hover-price-wrapper flex items-center gap-1.5">
                            <h5>Rs. {coursePrice}</h5>
                            <span><strike>$26.00</strike></span>
                        </div>
                        <div className="discount-ribbon">
                            <p>56% OFF</p>
                        </div>
                    </div>
                    <button className="whishlist-container">
                        <Image src='/Heart.svg' width={24} height={24} alt='whishlist svg' />
                    </button>
                </div>
                <hr />
                <div className="topics-point-list flex flex-col gap-2">
                    <h6>What you'll learn</h6>
                    {courseTopics && courseTopics.length > 0 && (
                        <ul className="hover-course-topic-list flex flex-col gap-2">
                            {courseTopics.slice(0, 3).map((topic, index) => (
                                <li key={index} className='hover-topics-list flex gap-2'>
                                    <Image src="/Check.svg" width={24} height={24} alt="check svg" />
                                    <span>{topic}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <hr />
                <div className="course-btn-container flex flex-col gap-3">
                    <div className="add-cart-btn-area">
                        <button className='add-to-cart-btn hover-btn-effect'><Image src='/ShoppingCartSimple.svg' width={24} height={24} />Add To Cart</button>
                    </div>
                    <div className="course-details-btn-area">
                        <button className='buy-now-btn hover-btn-effect'>Course Details</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default courseCard