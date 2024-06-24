"use client"

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Eye, EyeOff } from 'lucide-react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import aws_s3 from '@/app/lib/Services/aws_s3';
import { adminupdatepasswordfunction, adminprofiledetailfunction, updateadminprofile, adminsocialprofile, updatesocialprofile } from '@/app/lib/Services/api';

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
        return data.Location;
    } catch (error) {
        console.log("Error in file upload", error);
        throw error;
    }
}

function AdminProfile() {

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
        biography: ''
    });
    const [socialProfile, setSocialProfile] = useState({
        website: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        whatsapp: '',
        youtube: ''
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

    const customStyle = {
        color: '#FF6636', // Default color
        '&.Mui-checked': {
            color: '#FF6636', // Color when checked
        },
        '& .MuiSvgIcon-root': { // Targeting the icon within the checkbox
            fontSize: 18, // Sets the size of the checkbox icon
        }
    };

    const updatePassword = async () => {
        const userId = sessionStorage.getItem('adminId');
        if (!userId) {
            console.log('UserId not present');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }
        try {
            const response = await adminupdatepasswordfunction(userId, newPassword);
            console.log(response);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    // FETCH PROFILE INFORMATION

    const fetchUserProfile = async () => {
        const userId = sessionStorage.getItem('adminId');
        if (!userId) {
            alert('UserId not present');
            return;
        }
        try {
            const response = await adminprofiledetailfunction(userId);
            const profileInfo = response;
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
        const adminId = sessionStorage.getItem('adminId');
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
        const userId = sessionStorage.getItem('adminId');
        try {
            const response = await updateadminprofile(userId, userProfile.name, userProfile.email, userProfile.phone, userProfile.profile, userProfile.title, userProfile.biography);
            console.log(response);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    // FETCH SOCIAL PROFILE

    const fetchsocialprofile = async () => {
        const userId = sessionStorage.getItem('adminId');
        if (!userId) {
            alert('UserId not present');
            return;
        }
        try {
            const response = await adminsocialprofile(userId);
            const socialInfo = response;
            setSocialProfile({
                website: socialInfo.website,
                instagram: socialInfo.instagram,
                linkedin: socialInfo.linkedin,
                twitter: socialInfo.twitter,
                whatsapp: socialInfo.whatsapp,
                youtube: socialInfo.youtube
            })
            console.log(socialInfo);
        }
        catch (error) {
            console.log(error);
        }
    }

    //  UPDATE PROFILE INFORMATION

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocialProfile(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const updateSocialProfile = async (e) => {
        e.preventDefault();
        const userId = sessionStorage.getItem('adminId');
        try {
            const response = await updatesocialprofile(userId, socialProfile.website, socialProfile.instagram, socialProfile.linkedin, socialProfile.twitter, socialProfile.whatsapp, socialProfile.youtube);
            console.log(response);
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
        fetchsocialprofile();
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
                                <Image src={userProfile.profile || '/Profile-Photo.jpg'} width={200} height={200} alt='default user image' />
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
                                            value={socialProfile.website}
                                            onChange={handleSocialChange}
                                            placeholder='Personal website or protfolio url...'
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
                                            value={socialProfile.facebook}
                                            onChange={handleSocialChange}
                                            placeholder='Username'
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
                                            value={socialProfile.instagram}
                                            onChange={handleSocialChange}
                                            placeholder='Username'
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
                                            value={socialProfile.linkedin}
                                            onChange={handleSocialChange}
                                            placeholder='Username'
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
                                            value={socialProfile.twitter}
                                            onChange={handleSocialChange}
                                            placeholder='Username'
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
                                            value={socialProfile.whatsapp}
                                            onChange={handleSocialChange}
                                            placeholder='Whatsapp Number'
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
                                            value={socialProfile.youtube}
                                            onChange={handleSocialChange}
                                            placeholder='Username'
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
                        <button className='basic-info-save-btn hover-btn-effect' onClick={updateSocialProfile}>Save Changes</button>
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
                    <div className="change-password-wrapper flex flex-col gap-4">
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

export default AdminProfile