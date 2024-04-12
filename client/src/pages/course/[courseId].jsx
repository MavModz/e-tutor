import React from 'react';
import { allcoursesfunction, coursedetailsfunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';

function CourseDetails({ course }) {
    return (
        <div className='bg-[#f4f7fe] w-full min-h-full'>
            <Header />
            <div className="coursedata-container">
                <div className="coursedetails-container flex gap-6 px-[150px] py-[80px]">
                    <div className="coursedetails-wrapper-left w-full">
                        <div className="top-details-wrapper flex flex-col gap-3">
                            <h1>{course.courseName}</h1>
                            <h3>{course.courseSubtitle}</h3>
                            <div className="course-ratings-wrapper flex justify-between">
                                <div className="course-instructor-wrapper">
                                    <p>Created By:</p>
                                    <h4>{course.instructors}</h4>
                                </div>
                                <div className="course-details-ratings flex gap-2 items-center">
                                    <img src="/Star.svg" width={20} height={20} alt="course ratings" />
                                    <h4>{course.rating}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="course-video-thumb-container">
                            {course.videoThumbnail && (
                                <video width="100%" controls>
                                    <source src={course.videoThumbnail} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                    <div className="couresedetails-wrapper-right w-2/5">
                        <div className="course-price-info-container flex flex-col gap-3 mb-3">
                            <div className="price-container flex justify-between items-center h-8">
                                <div className="course-price-wrapper">
                                    <h2>Rs. {course.coursePrice}/-</h2>
                                </div>
                                <div className="discount-ribbon flex items-center">
                                    <p>56% OFF</p>
                                </div>
                            </div>
                            <div className="alarm-wrapper">
                                <p className='flex gap-2'><img src="/Alarm.svg" width={20} height={20} alt="alarm-svg" /> 2 days left at this price</p>
                            </div>
                        </div>
                        <hr />
                        <div className="course-basic-info-container flex flex-col gap-4 my-3">
                            <div className="course-duration-wrapper flex justify-between items-center">
                                <h6 className='flex gap-2'><img src="/Clock.svg" width={24} height={24} alt="clock svg" />Course Duration</h6>
                                <p>{course.courseDuration}</p>
                            </div>
                            <div className="course-level-wrapper flex justify-between items-center">
                                <h6 className='flex gap-2'><img src="/bar-chart.svg" width={24} height={24} alt="bar-chart svg" />Course Level</h6>
                                <p>{course.courseLevel}</p>
                            </div>
                            <div className="student-enrolled-wrapper flex justify-between items-center">
                                <h6 className='flex gap-2'><img src="/Users.svg" width={24} height={24} alt="users svg" />Students Enrolled</h6>
                                <p>69,419,618</p>
                            </div>
                            <div className="language-wrapper flex justify-between items-center">
                                <h6 className='flex gap-2'><img src="/Notebook.svg" width={24} height={24} alt="notebook svg" />Language</h6>
                                <p>{course.courseLanguage}</p>
                            </div>
                            <div className="subtitle-language-wrapper flex justify-between items-center">
                                <h6 className='flex gap-2'><img src="/Notepad.svg" width={24} height={24} alt="notepad svg" />Subtitle Language</h6>
                                <p>{course.optionalLanguage}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="purchase-button flex flex-col gap-3 my-3">
                            <button className='add-to-cart-btn'>Add To Cart</button>
                            <button className='buy-now-btn'>Buy Now</button>
                            <div className="wishlist-container flex justify-between gap-3">
                                <button className='whishlist-btn'>Add To Whishlist</button>
                                <button className='whishlist-btn'>Gift Course</button>
                            </div>
                            <p>Note: <span>all course have 30-days money-back guarantee</span></p>
                        </div>
                        <hr />
                        <div className="course-include-container flex flex-col gap-4 my-3">
                            <h6>This course includes:</h6>
                            <div className="course-include-list flex flex-col gap-3">
                                <p className='flex gap-3'><img src="/Clock-color.svg" width={24} height={24} alt="clock svg" />Lifetime access</p>
                                <p className='flex gap-3'><img src="/CurrencyDollarSimple.svg" width={24} height={24} alt="CurrencyDollarSimplesvg" />30-days money-back guarantee</p>
                                <p className='flex gap-3'><img src="/Notebook-color.svg" width={24} height={24} alt="Notebook-color svg" />Free exercises file & downloadable resources</p>
                                <p className='flex gap-3'><img src="/Trophy.svg" width={24} height={24} alt="Trophy svg" />Shareable certificate of completion</p>
                                <p className='flex gap-3'><img src="/Monitor.svg" width={24} height={24} alt="Monitor svg" />Access on mobile , tablet and TV</p>
                                <p className='flex gap-3'><img src="/Notepad-color.svg" width={24} height={24} alt="Notepad-color svg" />English subtitles</p>
                                <p className='flex gap-3'><img src="/Stack-color.svg" width={24} height={24} alt="Stack svg" />100% online course</p>
                            </div>
                        </div>
                        <hr />
                        <div className="share-btn-container flex flex-col gap-3 my-3">
                            <h6>Share this course:</h6>
                            <div className="share-btn-wrapper h-12 gap-2">
                                <div className="copy-btn">
                                    <button className='flex gap-3'><img src="/Copy.svg" width={24} height={24} alt="Copy svg" />Copy link</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const courses = await allcoursesfunction();
    if (!courses) {
        return { paths: [], fallback: 'blocking' };
    }
    const paths = courses.filter(course => course.courseCode).map(course => ({
        params: { courseId: course.courseCode.toString() },
    }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    try {
        const course = await coursedetailsfunction(params.courseId);
        if (!course) {
            return { notFound: true };
        }
        return { props: { course }, revalidate: 10 };
    } catch (error) {
        return { notFound: true };
    }
}

export default CourseDetails