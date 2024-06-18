'use client'
import React, { useState, useEffect } from 'react';
import "./home.css";
import Image from 'next/image';
import Coursecard from '@/components/cards/courseCard/Coursecard';
import Card from '@/components/cards/Card';
import FeaturedCourse from '@/components/cards/featuredCard/FeaturedCourse';
import Link from 'next/link';
import NavHeader from '@/components/Static/header/NavHeader';
import { coursecategorycountfunction, allcoursesfunction, topinstructorsfunction, filtercoursesfunction } from './lib/Services/api';
import Footer from '../components/Static/footer/Footer';
import DraggableMenu from '@/components/Static/draggableMenu/DraggableMenu';


export default function Home() {
  const [courseName, setCourseName] = useState('');
  const [categoryCounts, setCategoryCounts] = useState({});
  const [bestSellingCourses, setBestSellingCourse] = useState([]);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [recentlyAddedCourses, setrecentlyAddedCourses] = useState([]);
  const [topInstructors, setTopInstructors] = useState([]);

  const categories = [
    { text: 'K-12', color: '#EBEBFF', icon: <Image src="/Label.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Business', color: '#E1F7E3', icon: <Image src="/business.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Finance & Accounting', color: '#FFF2E5', icon: <Image src="/Finance.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'IT & Software', color: '#FFF0F0', icon: <Image src="/IT-Software.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Office Productivity', color: '#F5F7FA', icon: <Image src="/Office-Productivity.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Marketing', color: '#EBEBFF', icon: <Image src="/Marketing.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Personal Development', color: '#FFEEE8', icon: <Image src="/Personal-Development.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Photography & Video', color: '#F5F7FA', icon: <Image src="/Photography.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Lifestyle', color: '#FFF2E5', icon: <Image src="/Lifestyle.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Design', color: '#FFEEE8', icon: <Image src="/Design.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Health & Fitness', color: '#E1F7E3', icon: <Image src="/Health.svg" width={64} height={64} alt="business caregory svg" /> },
    { text: 'Music', color: '#FFF2E5', icon: <Image src="/Music.svg" width={64} height={64} alt="business caregory svg" /> },
  ]

  const instructor_points = [
    { text: 'Apply to beome instructor', icon: <Image src="/Number1.svg" width={52} height={52} alt="number 1" /> },
    { text: 'Build & edit your profile', icon: <Image src="/Number2.svg" width={52} height={52} alt="number 2" /> },
    { text: 'Create your new course', icon: <Image src="/Number3.svg" width={52} height={52} alt="number 3" /> },
    { text: 'Start teaching & earning', icon: <Image src="/Number4.svg" width={52} height={52} alt="number 4" /> }
  ]

  const trusted_companies = [
    { icon: <Image src='/Netflix.svg' width={100} height={27} alt='Netflix logo svg' /> },
    { icon: <Image src='/YouTube.svg' width={100} height={27} alt='YouTube logo svg' /> },
    { icon: <Image src='/Google.svg' width={100} height={27} alt='Google logo svg' /> },
    { icon: <Image src='/Lenovo.svg' width={100} height={27} alt='Lenovo logo svg' /> },
    { icon: <Image src='/Slack.svg' width={100} height={27} alt='Slack logo svg' /> },
    { icon: <Image src='/Vz.svg' width={100} height={27} alt='Vz logo svg' /> },
    { icon: <Image src='/Lexmark.svg' width={100} height={27} alt='Lexmark logo svg' /> },
    { icon: <Image src='/Microsoft.svg' width={100} height={27} alt='Microsoft logo svg' /> }
  ]

  useEffect(() => {
    fetchBestSellerCourses();
    fetchTopInstructors();
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
      const featuredCourses = response.slice(-4);
      const recentCourses = response.slice(-4);
      setBestSellingCourse(bestCourses);
      console.log('these are the best selling coureses', bestCourses)
      //need to make new API for Best Selling courses
      setFeaturedCourses(featuredCourses);
      //need to make new API for Feature courses
      setrecentlyAddedCourses(recentCourses);
      //need to make new API for Recentlt added courses
    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchTopInstructors = async () => {
    try {
      const response = await topinstructorsfunction();
      const topInstructor = response.slice(-5);
      setTopInstructors(topInstructor)
    }
    catch (error) {
      console.log(error);
    }
  }

  const fetchfiltercourse = async () => {
    try {
      const response = await filtercoursesfunction(courseName);
      // setCourseName(response);
      console.log(response);
    }
    catch (error) {
      console.log(error);
      return;
    }
  }

  const search = (e) => {
    e.preventDefault();
    console.log('button clicked');
    fetchfiltercourse();
  }

  return (
    <main className="min-h-screen overflow-hidden" id='main-wrapper'>
      <DraggableMenu />
      <div className='main-wrapper w-full min-h-full'>
        <NavHeader />
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
                  <button className='hero-btn hover-btn-effect' onClick={search}>SEARCH</button>
                  <div className='hero-input'>
                    <input
                      type="text"
                      id='hero-search'
                      name='hero-search'
                      className='hero-input'
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder='What Do you Want To Learn ?'
                      autoComplete='off'
                    />
                  </div>
                </form>
              </div>
              <div className='hero-right-content flex justify-center w-1/2'>
                <Image src="/hero-image.svg" width={494} height={494} priority={false} className='hero-img' alt='hero-section' />
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
                <button className='flex gap-2  items-center'>Browse All <Image src="/ArrowRight.svg" width={24} height={24} alt="Right arrow" /></button>
              </Link>
            </div>
          </div>
        </div>
        <div className="best-selling-container">
          <div className="best-selling-area">
            <h2>Best selling courses</h2>
            <div className="best-selling-wrapper">
              {bestSellingCourses.map(course => (
                <Link href={`/course/${course.courseName.replace(/\s+/g, '-').toLowerCase()}-${course._id}`} key={course._id} passHref>
                  <Coursecard
                    courseThumbnail={course.courseThumbnail}
                    courseCategory={course.courseCategory}
                    courseName={course.courseName}
                    coursePrice={course.coursePrice}
                    rating={course.rating}
                    courseTopics={course.courseTopics}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="featured-course-container">
          <div className="featured-course-area">
            <div className="featured-heading flex justify-between">
              <h2 className='max-w-[380px]'>Our feature courses</h2>
              <p className='max-w-[424px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat adipisci doloribus blanditiis numquam natus?</p>
            </div>
            <div className="featured-course-card-area">
              {featuredCourses.map(course => (
                <Link href={`/course/${course.courseName.replace(/\s+/g, '-').toLowerCase()}-${course._id}`} key={course._id} passHref>
                  <FeaturedCourse
                    courseThumbnail={course.courseThumbnail}
                    courseCategory={course.courseCategory}
                    courseName={course.courseName}
                    coursePrice={course.coursePrice}
                    rating={course.rating}
                    courseLevel={course.courseLevel}
                    courseDuration={course.courseDuration}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="recently-added-container">
          <div className="recently-added-course-area">
            <div className="recently-added-heading flex justify-center">
              <h2>Recently added courses</h2>
            </div>
            <div className="recently-added-course-card-area">
              {recentlyAddedCourses.map(course => (
                <Link href={`/course/${course.courseName.replace(/\s+/g, '-').toLowerCase()}-${course._id}`} key={course._id} passHref>
                  <Coursecard
                    courseThumbnail={course.courseThumbnail}
                    courseCategory={course.courseCategory}
                    coursePrice={course.coursePrice}
                    courseName={course.courseName}
                    rating={course.rating}
                    courseTopics={course.courseTopics}
                    courseLevel={course.courseLevel}
                    courseDuration={course.courseDuration}
                  />
                </Link>
              ))}
            </div>
            <div className="all-course-btn flex justify-center">
              <button className='browse-course-btn hover-btn-effect'>Browse All Course <Image src='/ArrowRight.svg' width={24} height={24} alt='Right arrow svg' /></button>
            </div>
          </div>
        </div>
        <div className="become-instructor-container">
          <div className="become-instructor-area">
            <div className="become-instructor-cta">
              <div className="instructor-txt flex flex-col gap-3">
                <h3>Become an Instructor</h3>
                <p>Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love.</p>
              </div>
              <div className="instructor-btn-container">
                <button className='instructor-cta hover-btn-effect'>Start Teaching <Image src='/ArrowRight.svg' width={24} height={24} alt='Right Arrow svg' /></button>
              </div>
            </div>
            <div className="become-instructor-points">
              <h3>Your teaching & earning steps</h3>
              <div className="instructor-point-list">
                {instructor_points.map((item, index) => (
                  <div className="list-wrapper flex gap-4 items-center" key={index}>
                    <div className="list-icons">
                      {item.icon}
                    </div>
                    <div className="list-text">
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="top-instructor-container">
          <div className="top-instructor-area flex items-center">
            <h2>Top instructor of the month</h2>
            <div className="top-instructor-card flex gap-6">
              {topInstructors.map(instructors => (
                <Link href='#' key={instructors.name} passHref>
                  <Card
                    courseName={instructors.name}
                    coursePrice={instructors.gender}
                    rating={instructors.role}
                  /></Link>
              ))}
            </div>
            <div className="browse-category-cta flex gap-3 items-center">
              <p>Thousands of students waiting for a instructor. Start teaching & earning now!.</p>
              <Link href='#' passHref>
                <button className='flex gap-2  items-center'>Become Instructor <Image src="/ArrowRight.svg" width={24} height={24} alt="Right arrow" /></button>
              </Link>
            </div>
          </div>
        </div>
        <div className="trusted-companies-container">
          <div className="trusted-companies-area">
            <div className="left-text-container">
              <h3>6.3k trusted companies</h3>
              <p>Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra.</p>
            </div>
            <div className="right-companies-logo-container w-[896px] grid grid-cols-4 gap-6 items-center">
              {trusted_companies.map((item, index) => (
                <div className="trusted-companies-wrapper" key={index}>
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}