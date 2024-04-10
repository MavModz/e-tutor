import React from 'react';
import { allcoursesfunction, coursedetailsfunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';

function CourseDetails({ course }) {
    return (
        <div className='bg-[#f4f7fe] w-full min-h-full'>
            <Header />
            <div className="coursedata-container">
                <div className="coursedetails-container flex gap-6 px-[150px] py-[80px]">
                    <div className="coursedetails-wrapper-left w-2/3 w-full">
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
                                    <h6>{course.rating}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="couresedetails-wrapper-right w-1/3">
                        <div className="courseinfo-container flex flex-col gap-3 mb-3">
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