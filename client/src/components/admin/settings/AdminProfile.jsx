import React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';

function AdminProfile() {
    return (
        <div className='profile-container'>
            <div className="profile-top-area">
                <div className="user-basic-info flex flex-col gap-4">
                    <div className="profile-info-area flex gap-9">
                        <div className="profile-basic-info-left w-3/4 flex flex-col gap-6">
                            <h4>Account Settings</h4>
                            <div className="profile-basic-info-input-area flex flex-col gap-4">
                                <div className="profile-input-field">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id='name'
                                        name='name'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Full Name'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="profile-input-field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id='email'
                                        name='email'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Your Email'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="profile-input-field">
                                    <label htmlFor="number">Phone Number</label>
                                    <input
                                        type="text"
                                        id='number'
                                        name='number'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Your Phone Number'
                                        maxLength={10}
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="profile-basic-info-right w-1/4">
                            <Image src='/user-2.jpg' width={200} height={200} alt='default user image' />
                            <button className='upload-profile-btn'><Upload color="#ffffff" />Upload Photo</button>
                            <p>Image size should be under 1MB and image ration needs to be 1:1</p>
                        </div>
                    </div>
                    <div className="profile-basic-info-input-area flex flex-col gap-4">
                        <div className="profile-input-field">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id='title'
                                name='title'
                                // value={rating}
                                // onChange={handleRating}
                                placeholder='Your title, profession'
                                autoComplete='off'
                            />
                        </div>
                        <div className="profile-input-field">
                            <label htmlFor="biography">Biography</label>
                            <textarea
                                id='biography'
                                name='biography'
                                // value={rating}
                                // onChange={handleRating}
                                placeholder='Your small description'
                                autoComplete='off'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="profile-middle-area">

            </div>
            <div className="profile-bottom-area">

            </div>
        </div>
    )
}

export default AdminProfile