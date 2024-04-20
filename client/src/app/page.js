'use client'
import React from 'react';
import "./home.css";
import Image from 'next/image';
import Header from '@/components/Static/header/Header';


export default function Home() {
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
      </div>
    </main>
  )
}
