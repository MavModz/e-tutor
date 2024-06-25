import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/lecture/courseLecture.css'
import Overview from '@/components/course/courseOverview/Overview';
import Curriculum from '@/components/course/courseCurriculum/Curriculum';
import Instructor from '@/components/course/courseInstructor/Instructor';
import Review from '@/components/course/courseReview/Review';
import { allcoursesfunction, coursedetailsfunction } from '@/app/lib/Services/api';
import Footer from '@/components/Static/footer/Footer';

function CourseLecture({ course }) {

    const [activeTab, setActiveTab] = useState('Overview');
    const navItems = [
        { text: 'Overview', component: <Overview courseDescription={course.courseDescription} courseTopics={course.courseTopics} targetAudience={course.targetAudience} courseRequirements={course.courseRequirements} /> },
        { text: 'Curriculum', component: <Curriculum sections={course.sections} /> },
        { text: 'Instructor', component: <Instructor course={course} /> },
        { text: 'Review', component: <Review course={course} /> },
    ];
    const activeComponent = navItems.find(item => item.text === activeTab)?.component;

    const handlePlayVideo = () => {
        const video = document.getElementById('courseVideo');
        video.play();
        video.setAttribute('controls', '');
        video.style.display = 'block';
        const playButton = document.querySelector('.course-video-thumb-container .play-button');
        playButton.style.display = 'none';
    };

    return (
        <div className='w-full'>
            <div className="lecture-header-container">
                <div className="lecture-header-wrapper">
                    <div className="logo-container">
                        <Link href='/' passHref>
                            <Image src='/LOGO.svg' width={120} height={54} alt='Logo svg' />
                        </Link>
                    </div>
                    <div className="nav-btn-wrapper">
                        <Image src='/Bell.svg' width={24} height={24} alt='Notification bell' />
                        <div className="dashboard-action flex">
                            <button>
                                <Image src='/user-2.jpg' width={48} height={48} alt='user image' className='rounded-full' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lecture-title-container">
                <div className="lecture-title">
                    <div className="lecture-title-info flex flex-col gap-3">
                        <h2>Complete Website Responsive Design: from Figma to Webflow to Website Design</h2>
                        <div className="lecture-stats flex gap-4">
                            <div className="section-count"> <Image src='/FolderNotchOpen.svg' width={20} height={10} alt='Folder svg' /> <span>6 Sections</span></div>
                            <div className="lecture-count"> <Image src='/PlayCircle.svg' width={20} height={10} alt='Lecture svg' /> <span>202 Lectures</span></div>
                            <div className="lecture-duration"> <Image src='/Clock-color.svg' width={20} height={10} alt='clock svg' /> <span>19h 37m</span></div>
                        </div>
                    </div>
                    <div className="lecture-nav-btn flex gap-3">
                        <button className='review-btn hover-btn-effect'>Write A Review</button>
                        <button className='next-lecture-btn hover-btn-effect'>Next Lecture</button>
                    </div>
                </div>
            </div>
            <div className="lecture-container w-full h-full mt-8">
                <div className="lecture-area">
                    <div className="lecture-wrapper-left w-full">
                        <div className="course-video-thumb-container">
                            {course.videoThumbnail && (
                                <div className="video-wrapper">
                                    <video id="courseVideo" width="100%" height="auto" preload="metadata">
                                        <source src={course.videoThumbnail} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="play-button" onClick={handlePlayVideo}></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="lecture-wrapper-right w-2/5">
                        <span>Right side</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export async function getStaticPaths() {
    const courses = await allcoursesfunction();
    if (!courses) {
        return { paths: [], fallback: 'blocking' };
    }
    const paths = courses.map(course => ({
        params: { courseId: `${course.courseName.replace(/\s+/g, '-').toLowerCase()}-${course._id}` },
    }));
    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    try {
        const courseId = params.courseId.split('-').pop();
        if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
            return { notFound: true };
        }

        const course = await coursedetailsfunction(courseId);
        if (!course) {
            return { notFound: true };
        }
        return { props: { course }, revalidate: 10 };
    } catch (error) {
        console.error('Failed to get static props:', error);
        return { notFound: true };
    }
}

export default CourseLecture