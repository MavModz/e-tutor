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
  return (
    <div className='bg-[#f4f7fe] w-full min-h-full'>
      <Header />
      <div className="dashboard-conatiner">
        <div className="dashboard-wrapper">
          <div className="banner-container h-80 rounded-2xl flex justify-around items-center">
            <div className="top-banner">
              <h1 className='banner-text text-5xl mb-4'>Welcome to your Dashboard</h1>
              <p className='text-xl'>You’ve learned <span className='banner-span'><strong>70% of your goal</strong></span> this week! <br />
                Keep it up and improve your results!
              </p>
            </div>
            <div className='banner-svg'>
              <Image src='/study.png' alt="student studying on the table" className='h-72' />
            </div>
          </div>
          <div className="stats-wrapper flex gap-8 justify-around mt-5">
            <div className="course-progress w-5/12 px-8">
              <div className="course-heading my-4">
                <h1 className='progress-heading text-2xl'>progress data</h1>
              </div>
              <div className="course-details">
                <div className='course-info flex gap-4'>
                  <div className="course-image flex items-center">
                    <Image src='/user-2.jpg' alt="course thumbnail" className='course-image' />
                  </div>
                  <div className="course-data">
                    <p>Coding</p>
                    <h2>Learn JavaSript</h2>
                    <h3>Learn how to use JavaScript — a powerful and flexible programming language for adding website interactivity.</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="schedule w-7/12 px-8">
              <div className="schedule-heading mt-4">
                <h1 className='schedule-heading text-2xl'>schedule data</h1>
              </div>
              <div className="schedule-graph">
                <Graph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard