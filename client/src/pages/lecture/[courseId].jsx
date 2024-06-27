import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/lecture/courseLecture.css'
import Overview from '@/components/course/courseOverview/Overview';
import Curriculum from '@/components/course/courseCurriculum/Curriculum';
import Review from '@/components/course/courseReview/Review';
import { allcoursesfunction, coursedetailsfunction } from '@/app/lib/Services/api';
import ProgressBar from '@/components/courseProgress/ProgressBar';
import Footer from '@/components/Static/footer/Footer';

function CourseLecture({ course }) {

    const videoRef = useRef(null);
    const [showPlayButton, setShowPlayButton] = useState(true);
    const [activeTab, setActiveTab] = useState('Overview');
    const navItems = [
        { text: 'Overview', component: <Overview courseDescription={course.courseDescription} courseTopics={course.courseTopics} targetAudience={course.targetAudience} courseRequirements={course.courseRequirements} /> },
        { text: 'Curriculum', component: <Curriculum sections={course.sections} /> },
        { text: 'Review', component: <Review course={course} /> },
    ];
    const activeComponent = navItems.find(item => item.text === activeTab)?.component;

    const handlePlayVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setShowPlayButton(false);
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            const handlePause = () => {
                setShowPlayButton(true);
                video.controls = false;
            };
            const handlePlay = () => {
                setShowPlayButton(false);
                video.controls = true;
            };

            video.addEventListener('pause', handlePause);
            video.addEventListener('play', handlePlay);

            return () => {
                video.removeEventListener('pause', handlePause);
                video.removeEventListener('play', handlePlay);
            };
        }
    }, []);

    const sections = course.sections;
    const sectionCount = sections.length;
    const lecturesCount = sections.reduce((total, section) => {
        return total + (section.lectures ? section.lectures.length : 0);
    }, 0);

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
                        <h2>{course.courseTopic}</h2>
                        <div className="lecture-stats flex gap-4">
                            <div className="section-count"> <Image src='/FolderNotchOpen.svg' width={20} height={10} alt='Folder svg' /> <span>{sectionCount} Sections</span></div>
                            <div className="lecture-count"> <Image src='/PlayCircle.svg' width={20} height={10} alt='Lecture svg' /> <span>{lecturesCount} Lectures</span></div>
                            <div className="lecture-duration"> <Image src='/Clock-color.svg' width={20} height={10} alt='clock svg' /> <span>{course.courseDuration}</span></div>
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
                    <div className="lecture-wrapper-left w-full flex flex-col gap-6">
                        <div className="course-video-thumb-container">
                            {course.videoThumbnail && (
                                <div className="video-wrapper">
                                    <video ref={videoRef} width="100%" height="auto" preload="metadata">
                                        <source src={course.videoThumbnail} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    {showPlayButton && (
                                        <button className="play-button" onClick={handlePlayVideo}></button>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="current-lecture-data flex flex-col gap-5">
                            <div className="lecture-name">
                                <h3>2. Sign Up in webflow</h3>
                            </div>
                            <div className="current-lecture-stats flex justify-between">
                                <div className="current-lecture-stats-left flex gap-3 items-center">
                                    <div className="student-image-group flex items-center relative">
                                        <Image src='/user-2.jpg' width={32} height={32} alt='user-image' className='rounded-full' />
                                        <Image src='/user-2.jpg' width={32} height={32} alt='user-image' className='rounded-full' />
                                        <Image src='/user-2.jpg' width={32} height={32} alt='user-image' className='rounded-full' />
                                        <Image src='/user-2.jpg' width={32} height={32} alt='user-image' className='rounded-full' />
                                    </div>
                                    <div className="students-watching-data">
                                        <span>512</span>
                                        <p>Students Watching</p>
                                    </div>
                                </div>
                                <div className="current-lecture-stats-right flex gap-6">
                                    <div className="lecture-update-time flex">
                                        <p>Last Update: </p>
                                        <span>Oct 26, 2023</span>
                                    </div>
                                    <div className="comments-count flex">
                                        <p>Comments: </p>
                                        <span>154</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lecture-overview-nav h-14 flex border-y">
                            {navItems.map((item, index) => (
                                <button
                                    key={index}
                                    className={`lecture-nav-btn ${activeTab === item.text ? 'active' : ''}`}
                                    onClick={() => setActiveTab(item.text)}
                                >
                                    {item.text}
                                </button>
                            ))}
                        </div>
                        <div className="course-overview-container flex flex-col gap-10">
                            {activeComponent}
                        </div>
                    </div>
                    <div className="lecture-wrapper-right w-2/5 flex flex-col gap-6">
                        <div className="course-content-area-top">
                            <ProgressBar courseId={'123'} />
                        </div>
                        <div className="course-content-area-bottom">
                            <Curriculum sections={course.sections} />
                        </div>
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