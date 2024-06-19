'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { admincoursefunction } from '@/app/lib/Services/api';
import Header from '@/components/admin/header/header';
import Card from '@/components/cards/Card';
import './courses.css';
import './courses-responsive.css';
import Auth from '../../(auth)/middleware/auth';
import Loader from '@/components/loader/Loader';
import Sidebar from '@/components/admin/sidebar/Sidebar';

function MyCourses() {
    const { isLoading } = Auth();
    const [showLoader, setShowLoader] = useState(true);
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('All');
    const [sortQuery, setSortQuery] = useState('');
    const courseType = [
        { text: "All" },
        { text: "Popular" },
        { text: "Latest" }
    ]

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
            const userId = sessionStorage.getItem("adminId");
            if (!userId) {
                throw new Error("No adminId found in sessionStorage");
            }
            const response = await admincoursefunction(userId);
            setCourses(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        setCourseName(e.target.value);
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filterCourses = () => {
        let filteredCourses = [...courses];

        // Apply search query filter
        if (searchQuery) {
            filteredCourses = filteredCourses.filter(course =>
                course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply type filter
        if (sortBy === 'Popular') {
            // Example: Filter courses where more than 5 users have purchased (not implemented here)
            filteredCourses = filteredCourses.filter(course => course.popularityCriteria); // Replace with actual popularity criteria
        } else if (sortBy === 'Latest') {
            // Filter courses created within the last 30 days
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            filteredCourses = filteredCourses.filter(course => new Date(course.createdAt) >= thirtyDaysAgo);
        }

        return filteredCourses;
    };

    const handleSortBy = (selectedType) => {
        setSortBy(selectedType);
    };

    if (showLoader) {
        return <div><Loader /></div>;
    }

    const filteredCourses = filterCourses();

    return (
        <div className='bg-[#f4f7fe] w-full min-h-full'>
            <Sidebar />
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
                        <input
                            type="text"
                            id='my-course-search'
                            name='my-course-search'
                            value={courseName}
                            onChange={handleSearch}
                            placeholder='Search in your courses... '
                            autoComplete='off'
                        />
                        <div className="course-type-dropdown">
                            <input
                                type="text"
                                id='my-course-type'
                                name='my-course-type'
                                value={sortBy}
                                onChange={handleSortBy}
                                placeholder='Latest '
                                autoComplete='off'
                                disabled
                            />
                            <div className="dropdown-course-list-container">
                                <ul className='dropdown-course-list-area'>
                                    {courseType.map((item, index) => (
                                        <li className='dropdown-course-list-items' key={index}>
                                            <p onClick={() => handleSortBy(item.text)}>{item.text}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="course-list-card-wrapper">
                    <div className="course-list-cards">
                        {filteredCourses.map(course => (
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