'use client'

import React from 'react';
import './message.css';
import Header from '@/components/admin/header/header';
import Chat from '@/components/chat/Chat';

function page() {
    return (
        <div className='bg-[#f4f7fe] w-full min-h-screen'>
            <Header />
            <div className="message-container">
                <Chat />
            </div>
        </div>
    )
}

export default page