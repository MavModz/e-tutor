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
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

function MyCourses() {
    const { isLoading } = Auth();
    const [showLoader, setShowLoader] = useState(true);
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('All');
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
    const courseType = [
        { text: "All" },
        { text: "Popular" },
        { text: "Latest" }
    ]
    const [category, setCategory] = useState('All Category');
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [rating, setRating] = useState('All Rating');
    const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);

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

    const openTypeDrawer = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    }

    const handleSortBy = (selectedType) => {
        setSortBy(selectedType);
        setSortDropdownOpen(false);
    };

    const openCategoryDrawer = () => {
        setCategoryDropdownOpen(!categoryDropdownOpen);
    }

    const handleCategory = (selectedCategory) => {
        setCategory(selectedCategory);
        setCategoryDropdownOpen(false);
    }

    const openRatingDrawer = () => {
        setRatingDropdownOpen(!ratingDropdownOpen);
    }

    const handleRating = (selectedRating) => {
        setRating(selectedRating);
        setRatingDropdownOpen(false);
    }

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
                <div className="course-filter-container flex gap-6">
                    <div className="search-container">
                        <label htmlFor="my-course-search">Search:</label>
                        <input
                            type="text"
                            id='my-course-search'
                            name='my-course-search'
                            value={courseName}
                            onChange={handleSearch}
                            placeholder='Search in your courses... '
                            autoComplete='off'
                        />
                        <Search color="#737784" />
                    </div>
                    <div className="course-type-dropdown">
                        <label htmlFor="my-course-type">Sort by:</label>
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
                        <div className='type-dropdown-btn-container' onClick={openTypeDrawer}>
                            <div className="type-dropdown-btn">
                                {sortDropdownOpen ? <ChevronUp color="#737784" onClick={openTypeDrawer} /> : <ChevronDown color="#737784" onClick={openTypeDrawer} />}
                            </div>
                        </div>
                        <div className={`course-type-dropdown-container ${sortDropdownOpen ? 'select-type' : ''}`}>
                            <ul className='course-type-dropdown-area'>
                                {courseType.map((item, index) => (
                                    <li className='course-type-dropdown-items' key={index}>
                                        <p onClick={() => handleSortBy(item.text)}>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="course-category-filter">
                        <label htmlFor="course-category-filter">Category:</label>
                        <input
                            type="text"
                            id='course-category-filter'
                            name='course-category-filter'
                            value={category}
                            onChange={handleCategory}
                            placeholder='Latest '
                            autoComplete='off'
                            disabled
                        />
                        <div className='category-dropdown-btn-container' onClick={openCategoryDrawer}>
                            <div className="category-dropdown-btn">
                                {categoryDropdownOpen ? <ChevronUp color="#737784" onClick={openCategoryDrawer} /> : <ChevronDown color="#737784" onClick={openCategoryDrawer} />}
                            </div>
                        </div>
                        <div className={`course-category-dropdown-container ${categoryDropdownOpen ? 'select-category' : ''}`}>
                            <ul className='course-category-dropdown-area'>
                                {courseType.map((item, index) => (
                                    <li className='course-category-dropdown-items' key={index}>
                                        <p onClick={() => handleSortBy(item.text)}>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="course-rating-filter">
                        <label htmlFor="course-rating-filter">Rating:</label>
                        <input
                            type="text"
                            id='course-rating-filter'
                            name='course-rating-filter'
                            value={rating}
                            onChange={handleRating}
                            placeholder='Latest '
                            autoComplete='off'
                            disabled
                        />
                        <div className='rating-dropdown-btn-container' onClick={openRatingDrawer}>
                            <div className="rating-dropdown-btn">
                                {ratingDropdownOpen ? <ChevronUp color="#737784" onClick={openRatingDrawer} /> : <ChevronDown color="#737784" onClick={openRatingDrawer} />}
                            </div>
                        </div>
                        <div className={`course-rating-dropdown-container ${ratingDropdownOpen ? 'select-rating' : ''}`}>
                            <ul className='course-rating-dropdown-area'>
                                {courseType.map((item, index) => (
                                    <li className='course-rating-dropdown-items' key={index}>
                                        <p onClick={() => handleSortBy(item.text)}>{item.text}</p>
                                    </li>
                                ))}
                            </ul>
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