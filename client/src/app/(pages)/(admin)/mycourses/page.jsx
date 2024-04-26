'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { allcoursesfunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';
import Card from '@/components/cards/Card';
import './courses.css';
import Auth from '../../(auth)/middleware/auth';
import Loader from '@/components/loader/Loader';
import Searchbar from '@/components/Searchbar/Searchbar';

function MyCourses() {
    const { isLoading } = Auth();
    const [showLoader, setShowLoader] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isLoading) {
                setShowLoader(false);
            }
        }, 1000);

        if (!isLoading) {
            setShowLoader(false);
        }

        return () => clearTimeout(timer);
    }, [isLoading]);

    useEffect(() => {
        fetchAllCourses();
    }, [])


    const fetchAllCourses = async () => {
        try {
            const response = await allcoursesfunction();
            setCourses(response);
        } catch (error) {
            console.log(error);
        }
    };

    if (showLoader) {
        return <div><Loader /></div>;
    }


    return (
        <div className='bg-[#f4f7fe] w-full min-h-full'>
            <Header />
            <div className="course-card-container">
                <div className="course-top-header flex justify-between mt-8 items-center">
                    <h4>My Courses</h4>
                    <Link href="/add-course">
                        <button className='course-action-btn flex items-center gap-2'>
                            <Image src="/Create-course.svg" alt="add course svg icon" width={20} height={20} />
                            Create Course
                        </button>
                    </Link>
                </div>
                <div className="course-filter-container">
                    <div className="search-container">
                        <Searchbar
                            label='Search:'
                            placeholder='Search in your Courses...'
                        />
                    </div>
                </div>
                <div className="course-list-card-wrapper">
                    <div className="course-list-cards">
                        {courses.map(course => (
                            <Link href={`/course/${course.courseCode}`} key={course.courseCode}>
                                <Card
                                    courseThumbnail={course.courseThumbnail}
                                    courseName={course.courseName}
                                    courseCode={course.courseCode}
                                    teacherName={course.instructors}
                                    coursePrice={course.coursePrice}
                                    rating={course.rating}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MyCourses