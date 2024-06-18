import React, { useEffect, useState } from 'react';
import './sidebar.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut, CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';

function Sidebar() {

    const router = useRouter()
    const [activePath, setActivePath] = useState(router.pathname);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setActivePath(location.pathname);
    }, []);

    const sidebarLink = (path) => {
        setActivePath(path);
        router.push(path);
    }

    const closeDrawer = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const logout = async () => {
        sessionStorage.clear();
        toast.success('Logout Successful');
        setTimeout(() => {
            router.push('/login');
        }, 1000);
    }

    const sidebar_links = [
        { text: 'Dashboard', icon: <Image src='/Dashboard.svg' alt="Dashboard svg icon" width={100} height={24} className='sidebar-image-state' />, path: '/dashboard' },
        { text: 'Create Course', icon: <Image src="/Create-course.svg" alt="add course svg icon" width={100} height={24} className='sidebar-image-state' />, path: '/add-course' },
        { text: 'My Courses', icon: <Image src='/Course.svg' alt="Course svg icon" width={100} height={24} className='sidebar-image-state' />, path: '/mycourses' },
        { text: 'Message', icon: <Image src='/Message.svg' alt="Message svg icon" width={100} height={24} className='sidebar-image-state' />, path: '/message' },
        { text: 'Profile', icon: <Image src='/Profile.svg' alt="Profile svg icon" width={100} height={24} className='sidebar-image-state' />, path: '/profile' }
    ]

    return (

        <div className={`sidebar-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <ToastContainer />
            <aside className='relative'>
                <div className="sidebar-menu-btn" onClick={closeDrawer}>
                    {sidebarOpen ? <CircleChevronLeft size={28} strokeWidth={1.5} /> : <CircleChevronRight size={28} strokeWidth={1.5} />}
                </div>
                <div className="sidebar-top">
                    <Image src='/LOGO.svg' width={120} height={54} alt='Logo svg' />
                </div>
                <hr />
                <div className="sidebar-wrapper">
                    <ul className='sidebar-list'>
                        {sidebar_links.map((item, index) => (
                            <li
                                key={index}
                                className={`sidebar-menu-items ${item.path === activePath ? 'active' : ''}`}
                                onClick={() => sidebarLink(item.path)}
                            >
                                <div className="sidebar-item-links">
                                    {item.icon}
                                    <h3>{item.text}</h3>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='sidebar-menu-items sign-out-btn' onClick={logout}>
                        <LogOut size={20} color="#6b6b6b" />
                        <h3>Sign-Out</h3>
                    </div>
                </div>
            </aside>
        </div>
    )
}

export default Sidebar