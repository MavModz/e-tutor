import React from 'react';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function AdminProfile() {

    const customStyle = {
        color: '#FF6636', // Default color
        '&.Mui-checked': {
            color: '#FF6636', // Color when checked
        },
        '& .MuiSvgIcon-root': { // Targeting the icon within the checkbox
            fontSize: 18, // Sets the size of the checkbox icon
        }
    };

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
                            <p>Image size should be under 1MB and image ratio needs to be 1:1</p>
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
                    <div className="save-button-wrapper">
                        <button className='basic-info-save-btn hover-btn-effect'>Save Changes</button>
                    </div>
                </div>
            </div>
            <div className="profile-middle-area">
                <div className="social-profile-container flex flex-col gap-4">
                    <div className="social-profile-area">
                        <div className="social-links-area">
                            <h4>Social Profile</h4>
                            <div className="social-links-wrapper flex flex-col gap-4">
                                <div className="website-link-area">
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="website">Personal Website</label>
                                        <input
                                            type="text"
                                            id='website'
                                            name='website'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Personal website or protfolio url...'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Globe.svg' width={20} height={20} alt='website icon' />
                                        </div>
                                    </div>
                                </div>
                                <div className="social-profile-links">
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="facebook">Facebook</label>
                                        <input
                                            type="text"
                                            id='facebook'
                                            name='facebook'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Username'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Facebook-dark.svg' width={20} height={20} alt='facebook icon' />
                                        </div>
                                    </div>
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="instagram">Instagram</label>
                                        <input
                                            type="text"
                                            id='instagram'
                                            name='instagram'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Username'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Instagram-dark.svg' width={20} height={20} alt='instagram icon' />
                                        </div>
                                    </div>
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="linkedin">LinkedIn</label>
                                        <input
                                            type="text"
                                            id='linkedin'
                                            name='linkedin'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Username'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/LinkedIn-dark.svg' width={20} height={20} alt='linkedin icon' />
                                        </div>
                                    </div>
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="twitter">Twitter</label>
                                        <input
                                            type="text"
                                            id='twitter'
                                            name='twitter'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Username'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Twitter-dark.svg' width={20} height={20} alt='twitter icon' />
                                        </div>
                                    </div>
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="whatsapp">WhatsApp</label>
                                        <input
                                            type="text"
                                            id='whatsapp'
                                            name='whatsapp'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Whatsapp Number'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Whatsapp-dark.svg' width={20} height={20} alt='whatsapp icon' />
                                        </div>
                                    </div>
                                    <div className="profile-input-field social-link-icon-container">
                                        <label htmlFor="youtube">YouTube</label>
                                        <input
                                            type="text"
                                            id='youtube'
                                            name='youtube'
                                            // value={rating}
                                            // onChange={handleRating}
                                            placeholder='Username'
                                            maxLength={10}
                                            autoComplete='off'
                                        />
                                        <div className="social-link-icon">
                                            <Image src='/Youtube-dark.svg' width={20} height={20} alt='youtube icon' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="save-button-wrapper">
                        <button className='basic-info-save-btn hover-btn-effect'>Save Changes</button>
                    </div>
                </div>
            </div>
            <div className="profile-bottom-area">
                <div className="notification-container flex flex-col gap-4">
                    <div className="notification-list-wrapper flex flex-col gap-6">
                        <h4>Notifications</h4>
                        <div className="notification-input-field">
                            <FormControlLabel
                                control={<Checkbox defaultChecked sx={customStyle} />}
                                label="I want to know who buy my course."
                            />
                            <FormControlLabel
                                control={<Checkbox sx={customStyle} />}
                                label="I want to know who write a review on my course."
                            />
                            <FormControlLabel
                                control={<Checkbox sx={customStyle} />}
                                label="I want to know who commented on my lecture."
                            />
                            <FormControlLabel
                                control={<Checkbox sx={customStyle} />}
                                label="I want to know who download my lecture notes."
                            />
                            <FormControlLabel
                                control={<Checkbox sx={customStyle} />}
                                label="I want to know who replied on my comment."
                            />
                        </div>
                    </div>
                    <div className="save-button-wrapper">
                        <button className='basic-info-save-btn hover-btn-effect'>Save Changes</button>
                    </div>
                </div>
                <div className="password-container">
                    <div className="change-password-wrapper  flex flex-col gap-4">
                        <div className="change-password-area  flex flex-col gap-6">
                            <div className="change-password-container">
                                <h4>Change Password</h4>
                            </div>
                            <div className="password-input-fields">
                                <div className="profile-input-field">
                                    <label htmlFor="current-password">Current Password</label>
                                    <input
                                        type="password"
                                        id='current-password'
                                        name='current-password'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Password'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="profile-input-field">
                                    <label htmlFor="new-password">New Password</label>
                                    <input
                                        type="password"
                                        id='new-password'
                                        name='new-password'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Password'
                                        autoComplete='off'
                                    />
                                </div>
                                <div className="profile-input-field">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input
                                        type="password"
                                        id='confirm-password'
                                        name='confirm-password'
                                        // value={rating}
                                        // onChange={handleRating}
                                        placeholder='Password'
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="save-button-wrapper">
                            <button className='basic-info-save-btn hover-btn-effect'>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminProfile