import React from 'react';
import './chat.css';
import Image from 'next/image';

function Chat() {
    const chat_list = [
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
        { image: <Image src='/user-2.jpg' width={48} height={48} alt='user-image.jpg' />, name: 'Jane Cooper', text: 'Yeah sure, tell me zafor', time: 'just now' },
    ]
    return (
        <div className='chatbox-area flex gap-6'>
            <div className="chatlist-container">
                <div className="chat-list-top flex flex-col gap-4 px-6 py-4">
                    <div className="chatlist-heading flex items-center justify-between">
                        <h6>Chat</h6>
                        <button className='compose-btn'><Image src='/Plus.svg' width={16} height={16} />Compose</button>
                    </div>
                    <div className="chatlist-search">
                        <p>searchbar</p>
                    </div>
                </div>
                <div className="chatlist-area">
                    <ul>
                        {chat_list.map((item, index) => (
                            <div className="chatlist-wrapper" key={index}>
                                <div className="messenger-id w-full flex items-center gap-4">
                                    <div className="image-wrapper">
                                        {item.image}
                                    </div>
                                    <div className="messenger-info-area grow">
                                        <div className="messenger-info-wrapper">
                                            <h6>{item.name}</h6>
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="messenger-text">
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="messenger-container">
                <div className="message-top-area flex justify-between items-center px-6 py-5">
                    <div className="messenger-information flex items-center gap-4">
                        <Image src='/user-2.jpg' width={68} height={68} alt='user-image.jpg' />
                        <div className="messenger-details">
                            <h6>Jane Cooper</h6>
                            <span>Active Now</span>
                        </div>
                    </div>
                    <button className='messenger-action-btn'>
                        <Image src='/DotsThree.svg' width={24} height={24} alt='action-btn svg' />
                    </button>
                </div>
                <hr />
                <div className="messenger-message-area">
                    <h5>Text</h5>
                </div>
                <hr />
                <div className="send-message-area">
                    <button>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat