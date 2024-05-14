"use client"

import React, { useState, useEffect } from 'react';
import Auth from '../../(auth)/middleware/auth';
import Header from '@/components/admin/header/header';
import Loader from '@/components/loader/Loader';
import Graph from '@/components/admin/graph/Graph';
import Piechart from '@/components/admin/piechart/Piechart';
import Ratinggraph from '@/components/admin/graph/ratinggraph/Ratinggraph';
import Image from 'next/image';
import './dashboard.css'

function Dashboard() {
  const { isLoading } = Auth();
  const [showLoader, setShowLoader] = useState(true);
  const [storageData, setStorageData] = useState([]);
  const [ratingData, setRatingData] = useState([]);

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
    setTimeout(() => {
      setStorageData([
        {
          "id": "Images",
          "label": "Images",
          "value": 207,
          "color": "hsl(233, 70%, 50%)"
        },
        {
          "id": "Videos",
          "label": "Videos",
          "value": 120,
          "color": "hsl(235, 70%, 50%)"
        },
        {
          "id": "Files",
          "label": "Files",
          "value": 162,
          "color": "hsl(314, 70%, 50%)"
        },
        {
          "id": "Free Space",
          "label": "Free Space",
          "value": 499,
          "color": "hsl(89, 70%, 50%)"
        }
      ]);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRatingData([
        {
          id: "test",
          data: [
            { x: "week1", y: 20 },
            { x: "week2", y: 22 },
            { x: "week3", y: 18 },
            { x: "week4", y: 21 },
            { x: "week5", y: 13 }
          ]
        }
      ]);
    }, 1000);
  }, []);

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
  console.log(month)

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
                  <h5>4.6</h5>
                  <div className="rating-visual flex flex-col items-center gap-2">
                    <Image src='/course-rating.svg' width={70} height={20} alt='course rating svg' />
                    <p>Overall Rating</p>
                  </div>
                </div>
                <Ratinggraph data={ratingData} />
              </div>
              <hr />
            </div>
            <div className='profile-clicks-container w-1/3'>
              <div className="profile-clicks-heading flex justify-between px-5 py-4">
                <h6>Profile View</h6>
                <p>For Month: <span>{month}</span></p>
              </div>
              <hr />
            </div>
            <div className='space-stats-container w-[32%]'>
              <div className="space-stats-heading flex justify-between px-5 py-4">
                <h6>Storage Analytics</h6>
                <p>Total Storage: <span>30GB</span></p>
              </div>
              <hr />
              <Piechart data={storageData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard