'use client'
import React, { useState, useEffect } from 'react';
import "./home.css";
import Image from 'next/image';
import Card from '@/components/cards/Card';
import Link from 'next/link';
import Header from '@/components/Static/header/Header';
import { coursecategorycountfunction, allcoursesfunction } from './lib/Services/api';


export default function Home() {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [bestSellingCourses, setBestSellingCourse] = useState([]);

  const categories = [
    { text: 'K-12', color: '#EBEBFF', icon: <img src="/Label.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Business', color: '#E1F7E3', icon: <img src="/business.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Finance & Accounting', color: '#FFF2E5', icon: <img src="/Finance.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'IT & Software', color: '#FFF0F0', icon: <img src="/IT-Software.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Office Productivity', color: '#F5F7FA', icon: <img src="/Office-Productivity.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Marketing', color: '#EBEBFF', icon: <img src="/Marketing.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Personal Development', color: '#FFEEE8', icon: <img src="/Personal-Development.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Photography & Video', color: '#F5F7FA', icon: <img src="/Photography.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Lifestyle', color: '#FFF2E5', icon: <img src="/Lifestyle.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Design', color: '#FFEEE8', icon: <img src="/Design.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Health & Fitness', color: '#E1F7E3', icon: <img src="/Health.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Music', color: '#FFF2E5', icon: <img src="/Music.svg" width={64} height={64} alt="business caregory svg" /> },
  ]

  useEffect(() => {
    fetchBestSellerCourses();
    categories.forEach((category) => {
      fetchCourseCategoryCount(category.text);
    });
  }, []);

  const fetchCourseCategoryCount = async (courseCategory) => {
    try {
      const response = await coursecategorycountfunction(courseCategory);
      setCategoryCounts(prevCounts => {
        const newCounts = {
          ...prevCounts,
          [courseCategory]: response
        };
        console.log(newCounts)
        return newCounts;
      });
    }
    catch (error) {
      console.log('error while getting the course category count', error);
    }
  };

  const fetchBestSellerCourses = async () => {
    try {
      const response = await allcoursesfunction();
      const bestCourses = response.slice(-8);
      setBestSellingCourse(bestCourses);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen">
      <div className='main-wrapper w-full min-h-full'>
        <Header />
        <div className='section-cover bg-[#f6f7fe] w-full min-h-full'>
          <div className='hero-area'>
            <div className='hero-section flex gap-3'>
              <div className='hero-left-content w-1/2 flex flex-col justify-center'>
                <div className='section-title mb-6'>
                  <h2>Learn with expert <br />
                    anytime anywhere
                  </h2>
                </div>
                <p>Our mision is to help people to find the best course <br /> online and learn with expert anytime, anywhere.</p>
                <form className='hero-form'>
                  <button className='hero-btn'>SEARCH</button>
                  <div className='hero-input'>
                    <input
                      type="text"
                      id='hero-search'
                      name='hero-search'
                      className='hero-input'
                      // value={courseSubtitle}
                      // onChange={(e) => setCourseSubtitle(e.target.value)}
                      placeholder='What Do you Want To Learn ?'
                      autoComplete='off'
                    />
                  </div>
                </form>
              </div>
              <div className='hero-right-content flex justify-center w-1/2'>
                <Image src="/hero-image.svg" width={494} height={494} alt='hero-section' />
              </div>
            </div>
          </div>
        </div>
        <div className="course-category-container">
          <div className="course-category-area">
            <h2>Browse Top Category</h2>
            <div className="course-category-cards">
              {categories.map((item, index) => (
                <div className="category-cards" key={index} style={{ backgroundColor: item.color }}>
                  {item.icon}
                  <div className="category-sub-info flex flex-col gap-2">
                    <h2>
                      {item.text}
                    </h2>
                    <span>
                      {categoryCounts[item.text]} Courses
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="browse-category-cta flex gap-3  items-center">
              <p>We have more category & subcategory.</p>
              <Link href='/categories' passHref>
                <button className='flex gap-2  items-center'>Browse All <img src="/ArrowRight.svg" width={24} height={24} alt="Right arrow" /></button>
              </Link>
            </div>
          </div>
        </div>
        <div className="best-selling-container">
          <div className="best-selling-area">
            <h2>Best selling courses</h2>
            <div className="best-selling-wrapper">
              {bestSellingCourses.map(course => (
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
    </main>
  )
}
