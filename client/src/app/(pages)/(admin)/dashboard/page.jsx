"use client"

import React, { useState, useEffect } from 'react';
import Auth from '../../(auth)/middleware/auth';
import Header from '@/components/admin/header/header';
import Loader from '@/components/loader/Loader';
import Graph from '@/components/admin/graph/Graph';
import Image from 'next/image';
import './dashboard.css'

function Dashboard() {
  const { isLoading } = Auth();
  const [showLoader, setShowLoader] = useState(true);

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

  if (showLoader) {
    return <div><Loader /></div>;
  }

  const recent_logs = [
    { icon: <Image src='/comment.svg' width={32} height={32} alt='comment svg' />, text: 'Kevin <span>comments on your lecture</span> “What is ux” in “2021 ui/ux design with figma"', time: '5 min ago' },
    { icon: <Image src='/rating.svg' width={32} height={32} alt='rating svg' />, text: 'John <span>give a 5 star rating on your course</span> “2021 ui/ux design with figma', time: '5 min ago' },
    { icon: <Image src='/course-purchase.svg' width={32} height={32} alt='course purchase svg' />, text: 'Sraboni <span>purchase your course</span> “2021 ui/ux design with figma', time: '5 min ago' },
    { icon: <Image src='/course-purchase.svg' width={32} height={32} alt='course purchase svg' />, text: 'Arif <span>purchase your course</span> “2021 ui/ux design with figma', time: '5 min ago' }
  ]

  return (
    <div className='bg-[#f4f7fe] w-full min-h-full'>
      <Header />
      <div className="dashboard-conatiner">
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
            <div className="schedule w-2/3 px-5">
              <div className="schedule-heading mt-4">
                <h1 className='schedule-heading text-2xl'>schedule data</h1>
              </div>
              <div className="schedule-graph">
                <Graph />
              </div>
            </div>
          </div>
          <div className="profile-view-stats flex gap-6">
            <div className='course-rating-container w-4/12 px-5 py-4'>
              <h1>tet</h1>
            </div>
            <div className='profile-clicks-container w-5/12 px-5 py-4'>
              <h1>tet1</h1>
            </div>
            <div className='space-stats-container w-4/12 px-5 py-4'>
              <h1>tet2</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard