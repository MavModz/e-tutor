"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import './header.css';
import { toast, ToastContainer } from 'react-toastify';
import { adminprofiledetailfunction, userprofiledetailfunction } from '@/app/lib/Services/api';

function Header() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.pathname);
  const [settingOpen, setSettingOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const navItems = [
    { text: 'Dashboard', icon: <Image src='/Dashboard.svg' alt="Dashboard svg icon" width={100} height={24} className='image-state' />, path: '/dashboard' },
    { text: 'Create Course', icon: <Image src="/Create-course.svg" alt="add course svg icon" width={100} height={24} className='image-state' />, path: '/add-course' },
    { text: 'My Courses', icon: <Image src='/Course.svg' alt="Course svg icon" width={100} height={24} className='image-state' />, path: '/mycourses' },
    { text: 'Message', icon: <Image src='/Message.svg' alt="Message svg icon" width={100} height={24} className='image-state' />, path: '/message' },
    { text: 'Profile', icon: <Image src='/Profile.svg' alt="Profile svg icon" width={100} height={24} className='image-state' />, path: '/profile' }
  ];
  
  const dropdownList = [
    { text: 'Profile', icon: <Image src='/Profile.svg' alt="Profile svg icon" width={20} height={20} /> },
    { text: 'Logout', icon: <Image src='/Logout.svg' alt='Logout svg icon' width={20} height={20} /> }
  ]

  useEffect(() => {
    setActivePath(location.pathname);
    profilePic();
  }, []);

  const handleItemClick = (path) => {
    setActivePath(path);
    router.push(path);
  };

  const logout = async () => {
    sessionStorage.clear();
    toast.success('Logout Successful');
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  }

  const OpenSettingDrawer = () => {
    setSettingOpen(!settingOpen);
    console.log(settingOpen);
  }
  const listclick = async (text) => {
    if (text === 'Profile') {
      router.push('/profile');
    }
    else if (text === 'Logout') {
      logout();
    }
  }

  const profilePic = async () => {
    const auth_token = sessionStorage.getItem('auth_token');
    const token = auth_token.slice(-1);
    let userId;
    let response;
    try {
      if (!auth_token) {
        alert(' Auth token not present')
        return;
      }
      if (token === '2' || token === '4') {
        userId = sessionStorage.getItem('adminId');
        response = await adminprofiledetailfunction(userId);
        let image = response.profile;
        console.log('this is Response image', image);
        setProfileImage(image);
      }
  
      else if (token === '3') {
        userId = sessionStorage.getItem('userId');
        response = await userprofiledetailfunction(userId);
        let image = response.profile;
        setProfileImage(image);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='header-container relative'>
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
            <Image src='/Bell.svg' width={24} height={24} alt="bell svg icon" />
            <div className="action-dropdown flex">
              <button type="button" onClick={OpenSettingDrawer}>
                <Image src={profileImage || '/user-2.jpg'} width={48} height={48} alt='user-profile-image' className='header-user-profile' />
              </button>
              <div className={`dropdown-list-container ${settingOpen ? 'setting-drawer' : ''}`} >
                <ul className='dropdown-list-area'>
                  {dropdownList.map((item, index) => (
                    <li className='dropdown-list' key={index} onClick={() => listclick(item.text)}>
                      {item.icon}
                      <p>{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
