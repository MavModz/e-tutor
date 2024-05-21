"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './header.css';

const navItems = [
  { text: 'Dashboard', icon: <Image src='/Dashboard.svg' alt="Dashboard svg icon" width={100} height={24} className='image-state' />, path: '/dashboard' },
  { text: 'Create Course', icon: <Image src="/Create-course.svg" alt="add course svg icon" width={100} height={24} className='image-state' />, path: '/add-course' },
  { text: 'My Courses', icon: <Image src='/Course.svg' alt="Course svg icon" width={100} height={24} className='image-state' />, path: '/mycourses' },
  { text: 'Message', icon: <Image src='/Message.svg' alt="Message svg icon" width={100} height={24} className='image-state' />, path: '/message' },
  { text: 'Profile', icon: <Image src='/Profile.svg' alt="Profile svg icon" width={100} height={24} className='image-state' />, path: '/profile' }
];

function Header() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, []);

  const handleItemClick = (path) => {
    setActivePath(path);
    router.push(path);
  };

  return (
    <div className='header-container'>
      <div className="header-wrapper">
        <div className="logo-container">
          <Link href='/' passHref>
            <Image src="/LOGO.svg" width={120} height={54}
              alt="logo svg"
              onError={(e) => e.target.src = '/LOGO.png'}
            />
          </Link>
        </div>
        <div className="nav-menu">
          <ul className='nav-menu-list'>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`nav-menu-items ${item.path === activePath ? 'active' : ''}`}
                onClick={() => handleItemClick(item.path)}
              >
                <div className="nav-item-content">
                  {item.icon}
                  {item.text}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-button-wrapper">
          <div className="nav-button-list">
            <div className="nav-button-items">
              <Image src='/Bell.svg' width={24} height={24} alt="bell svg icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
