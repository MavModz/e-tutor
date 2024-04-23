'use client'
import React, { useState, useEffect } from 'react';
import "./home.css";
import Image from 'next/image';
import Header from '@/components/Static/header/Header';
import { coursecategorycountfunction } from './lib/Services/api';


export default function Home() {
  const [categoryCounts, setCategoryCounts] = useState({});
  const categories = [
    { text: 'Marketing', icon: <img src="/business.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'IT & Software', icon: <img src="/business.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Business', icon: <img src="/business.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Design', icon: <img src="/business.svg" width={64} height={64} alt="business caregory svg" /> }
  ]

  useEffect(() => {
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
        return newCounts;
      });
    }
    catch (error) {
      console.log('error while getting the course category count', error);
    }
  };

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
                <div className="category-cards" key={index}>
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
          </div>
        </div>
      </div>
    </main>
  )
}
