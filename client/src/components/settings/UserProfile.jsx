import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import aws_s3 from '@/app/lib/Services/aws_s3';
import { Upload, Eye, EyeOff } from 'lucide-react';
import { userupdatepasswordfunction, userprofiledetailfunction, updateuserprofile } from '@/app/lib/Services/api';

async function uploadFileToS3(file, folderPath, key) {
  const bucket_name = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const bucketName = bucket_name;
  const params = {
    Bucket: bucketName,
    Key: `${folderPath}/${key}`,
    Body: file,
    ACL: 'public-read'
  };

  try {
    const data = await aws_s3.upload(params).promise();
    console.log("Upload Success", data);
    return data.Location; // The URL to the uploaded file
  } catch (error) {
    console.log("Error in file upload", error);
    throw error;
  }
}

function UserProfile() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    phone: '',
    profile: '',
    title: '',
    biography: '',
  });

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

  const updatePassword = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.log('UserId not present');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Password doesn't match");
      return;
    }
    try {
      const response = await userupdatepasswordfunction(userId, newPassword);
      console.log(response);
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }

  // FETCH PROFILE INFORMATION

  const fetchUserProfile = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('UserId not present');
      return;
    }
    try {
      const response = await userprofiledetailfunction(userId);
      const profileInfo = response
      setUserProfile({
        name: profileInfo.name,
        email: profileInfo.email,
        phone: profileInfo.phone,
        profile: profileInfo.profile,
        title: profileInfo.title,
        biography: profileInfo.biography
      })
      console.log(profileInfo);
    }
    catch (error) {
      console.log(error);
    }
  }

  //  UPDATE PROFILE INFORMATION

  const fileInputRef = useRef();

  // PROFILE IMAGE UPLOAD TO S3 BUCKET

  const handleFileSelect = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const adminId = sessionStorage.getItem('userId');
    if (file) {
      const folderPath = `${adminId}`
      const key = `profile-images/${Date.now()}-${file.name}`;
      try {
        const uploadedFileURL = await uploadFileToS3(file, folderPath, key);
        console.log(uploadedFileURL);
        setUserProfile(prevProfile => ({
          ...prevProfile,
          profile: uploadedFileURL
        }));
      }
      catch (error) {
        console.log("error uploading the file to S3", error);
      }
    }
  };

  const handleImgButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when button is clicked
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('userId');
    try {
      const response = await updateuserprofile(userId, userProfile.name, userProfile.email, userProfile.phone, userProfile.profile, userProfile.title, userProfile.biography);
      console.log(response);
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, [])

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
                    value={userProfile.name}
                    onChange={handleChange}
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
                    value={userProfile.email}
                    onChange={handleChange}
                    placeholder='Your Email'
                    autoComplete='off'
                  />
                </div>
                <div className="profile-input-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    id='phone'
                    name='phone'
                    value={userProfile.phone}
                    onChange={handleChange}
                    placeholder='Your Phone Number'
                    maxLength={10}
                    autoComplete='off'
                  />
                </div>
              </div>
            </div>
            <div className="profile-basic-info-right w-1/4">
              <div className="profile-pic-img">
                <Image src={userProfile.profile} width={200} height={200} alt='default user image' />
              </div>
              <div className="profile-upload-btn">
                <label htmlFor="profile" style={{ display: 'none' }}>Phone Number</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  id='profile'
                  name='profile'
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                  accept=".jpg, .jpeg, .png"
                />
                <button className='upload-profile-btn hover-btn-effect' onClick={handleImgButtonClick}><Upload color="#ffffff" />Upload Photo</button>
              </div>
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
                value={userProfile.title}
                onChange={handleChange}
                placeholder='Your title, profession'
                autoComplete='off'
              />
            </div>
            <div className="profile-input-field">
              <label htmlFor="biography">Biography</label>
              <textarea
                id='biography'
                name='biography'
                value={userProfile.biography}
                onChange={handleChange}
                placeholder='Your small description'
                autoComplete='off'
              />
            </div>
          </div>
          <div className="save-button-wrapper">
            <button className='basic-info-save-btn hover-btn-effect' onClick={updateProfile}>Save Changes</button>
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
              <button className='basic-info-save-btn hover-btn-effect' onClick={updatePassword}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile