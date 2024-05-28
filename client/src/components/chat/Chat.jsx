import React, { useEffect, useId, useState } from 'react';
import './chat.css';
import io from 'socket.io-client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { enrolleduserlistfunction, sendmessagefunction, receivemessagefunction } from '@/app/lib/Services/api';

function Chat() {

    const [currentChat, setCurrentChat] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const fetchuserlist = async () => {
            try {
                const response = await enrolleduserlistfunction();
                setChatList(response.user);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchuserlist();
    }, [enrolleduserlistfunction]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000' || 'https://e-tutor-backend.vercel.app/');
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('receiveMessage', message => {
                if (message.sender === currentChat.id) {
                    setMessages(prevMessages => [...prevMessages, message]);
                }
            });
        }
    }, [socket, currentChat]);

    const getCurrentUserId = () => {
        return sessionStorage.getItem('adminId') || sessionStorage.getItem('userId');
    };

    const sendMessage = async () => {
        const auth_token = sessionStorage.getItem('auth_token');
        const Id = auth_token.slice(-1);
        let userId, senderModel, receiverModel;
        if (Id === '2' || Id === '4') {
            userId = sessionStorage.getItem('adminId');
            senderModel = Id === '2' ? 'admin' : 'institute admin';
            receiverModel = 'user';
        } else {
            userId = sessionStorage.getItem('userId');
            senderModel = 'user';
            receiverModel = 'admin';
        }

        const trimmedInput = input.trim();
        if (!trimmedInput) {
            alert("Cannot send empty message.");
            return;
        }

        const messageToSend = {
            senderId: userId,
            receiverId: currentChat._id,
            senderModel: senderModel,
            receiverModel: receiverModel,
            message: input
        };

        try {
            const sentMessage = await sendmessagefunction(messageToSend);
            setMessages(prevMessages => [...prevMessages, sentMessage]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };


    const selectChat = async (user) => {
        setCurrentChat(user);
        setCurrentUser(user);
        try {
            const authToken = sessionStorage.getItem("auth_token");
            const auth = authToken.slice(-1);
            const receiverId = user._id;
            let senderId;
            if (auth == '2' || auth == '4') {
                senderId = sessionStorage.getItem('adminId');
            }
            else {
                senderId = sessionStorage.getItem('userId');
            }
            const response = await receivemessagefunction(senderId, receiverId)
            setMessages(Array.isArray(response) ? response : [response]);
        }
        catch (error) {
            console.log('Failed to fetch messages:', error);
        }
    };


    return (
        <div className='chatbox-area flex gap-6'>
            <div className="chatlist-container">
                <div className="chat-list-top flex flex-col gap-4 px-6 py-4">
                    <div className="chatlist-heading flex items-center justify-between">
                        <h6>Chat</h6>
                        <button className='compose-btn hover-btn-effect'><Image src='/Plus.svg' width={16} height={16} />Compose</button>
                    </div>
                    <div className="chatlist-search">
                        <div className="search-input-wrapper">
                            <Search color="#737784" strokeWidth={1.5} id='search-icon' />
                            <input
                                type='text'
                                placeholder='Search'
                                id='contact-search'
                                name='contact-search'
                            />
                        </div>
                    </div>
                </div>
                <div className="chatlist-area">
                    <ul>
                        {chatList.map((item, index) => (
                            <div className="chatlist-wrapper" key={index} onClick={() => selectChat(item)}>
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
                <div className="message-top-area flex justify-between items-center px-6 py-3">
                    <div className="messenger-information flex items-center gap-4">
                        <Image src='/user-2.jpg' width={50} height={50} alt='user-image.jpg' />
                        <div className="messenger-details flex flex-col">
                            <h6>{currentUser ? currentUser.name : 'select user'}</h6>
                            <span>Active Now</span>
                        </div>
                    </div>
                    <button className='messenger-action-btn'>
                        <Image src='/DotsThree.svg' width={24} height={24} alt='action-btn svg' />
                    </button>
                </div>
                <hr />
                <div className="messenger-message-area">
                    {messages.slice().reverse().map((msg, index) => {
                        const isSender = msg.sender.id === getCurrentUserId();
                        return (
                            <div key={index} className={`message ${isSender ? 'sent' : 'received'}`}>
                                <p>{msg?.message}</p>
                                <span>{msg?.time && new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        );
                    })}
                </div>
                <hr />
                <div className="send-message-area flex gap-5 justify-between items-center">
                    <input
                        type="text"
                        value={input}
                        name="message"
                        id="message"
                        placeholder='Type your message'
                        className='message-text-area'
                        autoComplete='off'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className='message-send-btn hover-btn-effect'
                        onClick={sendMessage}
                    >
                        Send <Image src='/PaperPlaneRight.svg' width={24} height={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat