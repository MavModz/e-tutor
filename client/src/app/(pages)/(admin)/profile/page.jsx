'use client'

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import './profile.css';
import './responsive.css';
import Sidebar from '@/components/admin/sidebar/Sidebar';
import Header from '@/components/admin/header/header';
import Footer from '@/components/admin/footer/Footer';

const AdminProfile = dynamic(() => import('@/components/admin/settings/AdminProfile'), { ssr: false });
const UserProfile = dynamic(() => import('@/components/settings/UserProfile'), { ssr: false });

function Profile() {

    const [userType, setUserType] = useState('');

    useEffect(() => {
        const auth_token = sessionStorage.getItem('auth_token');
        const userType = auth_token && auth_token.slice(-1);
        setUserType(userType)
    },[]);

    const renderProfile = () => {
        if (userType === '2' || userType === '4') {
            return <AdminProfile />
        }
        else if (UserType === '3') {
            return <UserProfile />
        }
    }

    return (
        <div className='bg-[#f4f7fe] w-full min-h-full relative'>
            <Sidebar />
            <Header />
            {renderProfile()}
            <Footer />
        </div>
    )
}

export default Profile