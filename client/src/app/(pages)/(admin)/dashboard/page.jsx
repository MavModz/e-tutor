"use client"

import React, { useState, useEffect } from 'react';
import Auth from '../../(auth)/middleware/auth';
import Header from '@/components/admin/header/header';
import Loader from '@/components/loader/Loader';
import Graph from '@/components/admin/graph/Graph';
import Piechart from '@/components/admin/piechart/Piechart';
import Ratinggraph from '@/components/admin/graph/ratinggraph/Ratinggraph';
import Image from 'next/image';
import './dashboard.css';
import './responsive.css';
import Courserating from '@/components/admin/courserating/Courserating';
import Barchart from '@/components/admin/graph/barchart/Barchart';
import { cloudstoragefunction, overallcourseratingfunction } from '@/app/lib/Services/api';
import Footer from '@/components/admin/footer/Footer';

function Dashboard() {
  const { isLoading } = Auth();
  const [showLoader, setShowLoader] = useState(true);
  const [storageData, setStorageData] = useState([]);
  const [allocatedSpace, setAllocatedSpace] = useState('');
  const [overallCourseRatings, setOverallCourseRatings] = useState('');

  const fetchStorageData = async () => {
    try {
      const userId = sessionStorage.getItem("adminId");
      if (!userId) {
        throw new Error("No adminId found in sessionStorage");
      }
      const response = await cloudstoragefunction(userId);
      setStorageData(response.usage);
      setAllocatedSpace(response.allocatedSpace);
    } catch (error) {
      console.error("Error fetching storage data:", error);
    }
  };

  const fetchoverallcourserating = async () => {
    try {
      const userId = sessionStorage.getItem('adminId');
      if (!userId) {
        throw new Error("No adminId found in sessionStorage");
      }
      const response = await overallcourseratingfunction(userId);
      const averageRatings = response.averageRating.toFixed(1);
      setOverallCourseRatings(averageRatings);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchStorageData();
    fetchoverallcourserating();
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

  if (showLoader) {
    return <div><Loader /></div>;
  }



  const recent_logs = [
    { icon: <Image src='/comment.svg' width={32} height={32} alt='comment svg' />, text: 'Kevin <span>comments on your lecture</span> “What is ux” in “2021 ui/ux design with figma"', time: 'just now' },
    { icon: <Image src='/rating.svg' width={32} height={32} alt='rating svg' />, text: 'John <span>give a 5 star rating on your course</span> “2021 ui/ux design with figma', time: '2 min ago' },
    { icon: <Image src='/course-purchase.svg' width={32} height={32} alt='course purchase svg' />, text: 'Sraboni <span>purchase your course</span> “2021 ui/ux design with figma', time: '5 min ago' },
    { icon: <Image src='/course-purchase.svg' width={32} height={32} alt='course purchase svg' />, text: 'Arif <span>purchase your course</span> “2021 ui/ux design with figma', time: '10 min ago' }
  ]

  const year = new Date().getFullYear();
  const month = new Date().toLocaleString('en-US', { month: 'long' });

  return (
    <div className='bg-[#f4f7fe] w-full min-h-full'>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-wrapper flex flex-col gap-6">
          <div className="banner-container h-80 rounded-2xl flex justify-around items-center">
            <div className="top-banner">
              <h1 className='banner-text text-5xl mb-4'>Welcome to your Dashboard</h1>
              <p className='text-xl'>You’ve learned <span className='banner-span'><strong>70% of your goal</strong></span> this week! <br />
                Keep it up and improve your results!
              </p>
            </div>
            <div className='banner-svg'>
              <Image src='/study.png' alt="student studying on the table" width={393} height={288} />
            </div>
          </div>
          <div className="stats-wrapper flex gap-8 justify-around mt-5  max-h-[424px]">
            <div className="course-progress w-1/3">
              <div className="recent-activity-heading px-5 py-4">
                <h6>Recent Activity</h6>
              </div>
              <hr />
              <div className="recent-activity-logs-container">
                {recent_logs.map((item, index) => (
                  <div className="recent-activity-logs flex gap-4 px-5 py-3" key={index}>
                    {item.icon}
                    <div className="recent-logs-data flex flex-col gap-1.5">
                      <p dangerouslySetInnerHTML={{ __html: item.text }}></p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="course-overview-container w-2/3">
              <div className="course-overview-heading flex justify-between px-5 py-4">
                <h6>Course Overview</h6>
                <p>Financial Year: <span>{year}</span></p>
              </div>
              <hr />
              <div className="course-overview-graph h-[87%] px-5 py-4">
                <Graph />
              </div>
            </div>
          </div>
          <div className="profile-stats flex gap-6">
            <div className='course-rating-container w-1/3'>
              <div className="course-rating-heading flex justify-between  px-5 py-4">
                <h6>Overall Course Rating</h6>
                <p>For Month: <span>{month}</span></p>
              </div>
              <hr />
              <div className="course-rating-center flex gap-3 px-5 py-[22px]">
                <div className="rating-area flex flex-col items-center gap-4">
                  <h5>{overallCourseRatings}</h5>
                  <div className="rating-visual flex flex-col items-center gap-2">
                    <Image src='/course-rating.svg' width={70} height={20} alt='course rating svg' />
                    <p>Overall Rating</p>
                  </div>
                </div>
                <Ratinggraph />
              </div>
              <hr />
              <div className="course-rating-bottom min-h-[205px] px-5 py-4">
                <div className="course-rating-wrapper">
                  <Courserating />
                </div>
              </div>
              <hr />
            </div>
            <div className='profile-clicks-container w-1/3'>
              <div className="profile-clicks-heading flex justify-between px-5 py-4">
                <h6>Profile View</h6>
                <p>For Month: <span>{month}</span></p>
              </div>
              <hr />
              <Barchart />
              <hr />
            </div>
            <div className='space-stats-container w-[32%]'>
              <div className="space-stats-heading flex justify-between px-5 py-4">
                <h6>Storage Analytics</h6>
                <p>Total Storage: <span>{allocatedSpace}GB</span></p>
              </div>
              <hr />
              <Piechart storageData={storageData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard