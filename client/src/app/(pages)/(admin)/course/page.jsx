'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { allcoursesfunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';
import Card from '@/components/cards/Card';
import './courses.css';
import Searchbar from '@/components/Searchbar/Searchbar';

function Course() {
    const [courses, setCourses] = useState([]);
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

    return (
        <div className='bg-[#f4f7fe] w-full min-h-full'>
            <Header />
            <div className="course-card-container">
                <Searchbar />
                <div className="course-top-header flex justify-between mt-8 items-center">
                    <h4>My Courses</h4>
                    <Link href= "/add-course">
                        <button className='course-action-btn flex items-center gap-2'>
                            <Image src="/Create-course.svg" alt="add course svg icon" width={20} height={20} />
                            Create Course
                        </button>
                    </Link>
                </div>
                <div className="course-list-card-wrapper">
                    <div className="course-list-cards">
                        {courses.map(course => (
                            <Card
                                key={course._id}
                                courseName={course.courseName}
                                courseCode={course.courseCode}
                                teacherName={course.teacherName}
                                coursePrice={course.coursePrice}
                                rating={course.rating}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course