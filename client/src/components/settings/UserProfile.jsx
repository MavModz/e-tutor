import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Eye, EyeOff } from 'lucide-react';

function UserProfile() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPassword = (e) => {
    e.preventDefault();
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPassword = (e) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
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
      <div className="profile-bottom-area">
        <div className="password-container">
          <div className="change-password-wrapper w-1/2 flex flex-col gap-4">
            <div className="change-password-area flex flex-col gap-6">
              <div className="change-password-container">
                <h4>Change Password</h4>
              </div>
              <div className="password-input-fields">
                <div className="profile-input-field relative">
                  <label htmlFor="current-password">Current Password</label>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    id='current-password'
                    name='current-password'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder='Password'
                    autoComplete='off'
                  />
                  <div className="password-toggle">
                    {showCurrentPassword ? <Eye color="#4E5566" strokeWidth={1.5} onClick={toggleCurrentPassword} /> : <EyeOff color="#4E5566" strokeWidth={1.5} onClick={toggleCurrentPassword} />}
                  </div>
                </div>
                <div className="profile-input-field relative">
                  <label htmlFor="new-password">New Password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id='new-password'
                    name='new-password'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder='Password'
                    autoComplete='off'
                  />
                  <div className="password-toggle">
                    {showNewPassword ? <Eye color="#4E5566" strokeWidth={1.5} onClick={toggleNewPassword} /> : <EyeOff color="#4E5566" strokeWidth={1.5} onClick={toggleNewPassword} />}
                  </div>
                </div>
                <div className="profile-input-field relative">
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirm-password'
                    name='confirm-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Password'
                    autoComplete='off'
                  />
                  <div className="password-toggle">
                    {showConfirmPassword ? <Eye color="#4E5566" strokeWidth={1.5} onClick={toggleConfirmPassword} /> : <EyeOff color="#4E5566" strokeWidth={1.5} onClick={toggleConfirmPassword} />}
                  </div>
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

export default UserProfile