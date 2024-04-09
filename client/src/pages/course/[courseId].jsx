import React from 'react';
import { allcoursesfunction, coursedetailsfunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';

function CourseDetails({ course }) {
    return (
        <div className='w-full min-h-full'>
            <Header />
            <div className="coursedata-container">
                <div className="coursedetails-container">
                    <h1>{course.courseName}</h1>
                </div>
                <div className="courseinfo-container">
                    <h2>price</h2>
                </div>
            </div>
        </div>
    )
}

export async function getStaticPaths() {
    const courses = await allcoursesfunction();
    const paths = courses
    .filter(course => course && course.courseCode)
    .map(course => ({
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