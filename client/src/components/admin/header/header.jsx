"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './header.css';

const navItems = [
  { text: 'Dashboard', icon: <Image src='/Dashboard.svg' alt="Dashboard svg icon" width={100} height={24} className='image-state' />, path: '/dashboard' },
  { text: 'Billing', icon: <Image src='/Billing.svg' alt="Billing svg icon" width={100} height={24} className='image-state' />, path: '/billing' },
  { text: 'Courses', icon: <Image src='/Calendar.svg' alt="Calendar svg icon" width={100} height={24} className='image-state' />, path: '/course' },
  { text: 'Management', icon: <Image src='/Message.svg' alt="Management svg icon" width={100} height={24} className='image-state' />, path: '/management' },
  { text: 'Profile', icon: <Image src='/Profile.svg' alt="Profile svg icon" width={100} height={24} className='image-state' />, path: '/profile' }
];

function Header() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
    console.log(location.pathname)
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActivePath(path);
    router.push(path);
  };

  return (
    <div className='header-container'>
      <div className="header-wrapper">
        <Image src='/astronaut.jpg' width={60} height={60} className="header-logo" alt="main logo img" priority/>
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
              <Image src='/Profile.svg' width={100} height={24} alt="Profile svg icon" />
            </div>
            <div className="nav-button-items">
              <Image src='/Profile.svg' width={100} height={24} alt="Profile svg icon" />
            </div>
            <div className="nav-button-items-active">
              <Image src='/Profile.svg' width={100} height={24} alt="Profile svg icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
