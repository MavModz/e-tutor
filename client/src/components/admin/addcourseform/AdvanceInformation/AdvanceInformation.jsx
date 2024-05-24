require("dotenv").config();
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import aws_s3 from '@/app/lib/Services/aws_s3';
import { Trash2, Upload } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Header from '../../header/header';
import { updateusedspacefunction } from '@/app/lib/Services/api';

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

const updateUsedSpace = async (adminId, fileSize) => {
  const response = await updateusedspacefunction(adminId, fileSize);
  console.log('update successfull', response);
}

function captureVideoThumbnail(videoUrl, callback) {
  const video = document.createElement('video');
  video.src = videoUrl;
  video.crossOrigin = "anonymous"; // This is important for CORS if the video is hosted on another domain

  video.addEventListener('loadeddata', function () {
    // Set the current time to some value, you might want to make this dynamic
    video.currentTime = 1;

    video.addEventListener('seeked', function () {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUri = canvas.toDataURL('image/jpeg'); // Can also use 'image/png'
      callback(dataUri);
    });
  });
}


function AdvanceInformation({ onNext, onPrevious }) {

  const fileInputRef = useRef();
  const videoInputRef = useRef();
  const [thumbnailSrc, setThumbnailSrc] = useState('/course-thumbnail.png');
  const [vidThumbnailSrc, setVidThumbnailSrc] = useState('/course-video-thumbnail.png');
  const [videoSrcLink, setVideoSrcLink] = useState('');
  const [courseTopics, setCourseTopics] = useState(['', '']);
  const [targetAudience, setTargetAudience] = useState(['', '']);
  const [courseRequirements, setCourseRequirements] = useState(['', '']);
  const [richEditor, setRichEditor] = useState('');
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }]
  ];

  const quillmodule = {
    toolbar: toolbarOptions,
  }

  useEffect(() => {
    // Get the uploaded file URL from local storage
    const savedThumbnailURL = sessionStorage.getItem('uploadedThumbnail');
    if (savedThumbnailURL) {
      setThumbnailSrc(savedThumbnailURL);
    }
    const storedThumbnail = sessionStorage.getItem('video-thumbnail');
    if (storedThumbnail) {
      setVidThumbnailSrc(storedThumbnail);
    }
  }, []);

  const handleImgButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when button is clicked
  };

  const handleVideoButtonClick = () => {
    videoInputRef.current.click(); // Trigger the file input when button is clicked
  };

  const handleFileSelect = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const adminId = sessionStorage.getItem('adminId');
    if (file) {
      const folderPath = `${adminId}`
      const key = `images/${Date.now()}-${file.name}`;
      try {
        const uploadedFileURL = await uploadFileToS3(file, folderPath, key);
        setThumbnailSrc(uploadedFileURL);
        sessionStorage.setItem('uploadedThumbnail', uploadedFileURL);
        console.log(uploadedFileURL);
        await updateUsedSpace(adminId, file.size);
      }
      catch (error) {
        console.log("error uploading the file to S3", error);
      }
      // const reader = new FileReader();
      // reader.onload = (e) => {
      //   setThumbnailSrc(e.target.result);
      // };
      // reader.readAsDataURL(file);
    }
  };

  // const handleVideoFileSelect = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setVidThumbnailSrc(URL.createObjectURL(file));
  //     const key = `video-thumbnail/${Date.now()}-${file.name}`;
  //     try {
  //       const uploadedVideoFileURL = await (file, key);
  //       setVidThumbnailSrc(uploadedVideoFileURL);
  //     }
  //     catch (error) {
  //       console.log('error uploading the video to s3', error);
  //     }
  //   }
  // };

  // CODE START TO HANDLE TOPICS FROM ADMIN


  const handleVideoFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const localVideoSrc = URL.createObjectURL(file);
      const adminId = sessionStorage.getItem('adminId');
      const folderPath = `${adminId}`;
      const key = `videos/${Date.now()}-${file.name}`;

      try {
        const uploadedVideoFileURL = await uploadFileToS3(file, folderPath, key);
        console.log(uploadedVideoFileURL);
        setVideoSrcLink(uploadedVideoFileURL);
        captureVideoThumbnail(localVideoSrc, (thumbnailDataUri) => {
          setVidThumbnailSrc(thumbnailDataUri);
          sessionStorage.setItem('video-thumbnail', thumbnailDataUri);
        });
        URL.revokeObjectURL(file);
      } catch (error) {
        console.log('error uploading the video to s3', error);
      }
    }
  };


  const handleTopicChange = (index, value) => {
    const newTopics = courseTopics.map((topic, i) => (i === index ? value : topic));
    setCourseTopics(newTopics);
  };

  const addNewTopic = () => {
    if (courseTopics.length < 8) {
      setCourseTopics([...courseTopics, '']);
    } else {
      console.log("Maximum of 8 topics can be added.");
    }
  };

  const removeTopic = (index) => {
    setCourseTopics(courseTopics.filter((_, i) => i !== index));
  };

  // CODE END TO HANDLE TOPICS FROM ADMIN

  // CODE START TO HANDLE AUDIENCE

  const handleAudienceChange = (index, value) => {
    const newAudience = targetAudience.map((audience, i) => (i === index ? value : audience));
    setTargetAudience(newAudience);
  };

  const addNewAudience = () => {
    if (targetAudience.length < 8) {
      setTargetAudience([...targetAudience, '']);
    } else {
      console.log("Maximum of 8 target audiences can be added.");
    }
  };

  const removeAudience = (index) => {
    setTargetAudience(targetAudience.filter((_, i) => i !== index));
  };

  // CODE END TO HANDLE AUDIENCE

  // CODE START TO HANDLE COURSE REQUIREMENTS

  const handleRequirementChange = (index, value) => {
    const newRequirements = courseRequirements.map((requirement, i) => (i === index ? value : requirement));
    setCourseRequirements(newRequirements);
  };

  const addNewRequirement = () => {
    if (courseRequirements.length < 8) {
      setCourseRequirements([...courseRequirements, '']);
    } else {
      console.log("Maximum of 8 course requirements can be added.");
    }
  };

  const removeRequirement = (index) => {
    setCourseRequirements(courseRequirements.filter((_, i) => i !== index));
  };

  // CODE END TO HANDLE COURSE REQUIREMENTS

  const handleAdvanceInformation = () => {
    const advanceInformationDetails = {
      courseTopics,
      targetAudience,
      courseRequirements,
      richEditor,
      thumbnailSrc,
      videoSrcLink
    };
    onNext(advanceInformationDetails);
    console.log(advanceInformationDetails);
  };

  return (
    <>
      <div className="addcourse-middle">
        <form className='addcourse-form'>
          <hr />
          <div className="course-thumbnail-wrapper flex gap-12 w-full">
            <div className="thumbnail-img-wrapper flex flex-col flex-1 gap-4">
              <p>Course Thumbnail</p>
              <div className="thumbnail-img-container">
                <div className="image-container w-56 h-40">
                  <img src={thumbnailSrc} width={124} height={124} alt="course-thumbnail" />
                </div>
                <div className="thumbnail-image-info">
                  <p>
                    Upload your course Thumbnail here. <span>Important guidelines:</span> 1200x800 pixels or 12:8 Ratio.
                    Supported format: <span>.jpg, .jpeg, or .png</span>
                  </p>
                  <div className="upload-button-container">
                    <input
                      type="file"
                      ref={fileInputRef}
                      id='courseThumbnail'
                      name='courseThumbnail'
                      style={{ display: 'none' }}
                      onChange={handleFileSelect}
                      accept=".jpg, .jpeg, .png"
                    />
                    <button onClick={handleImgButtonClick} className='next-form-btn'>
                      Upload Image
                      <Upload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="thumbnail-video-wrapper flex flex-col flex-1 gap-4">
              <p>Course Trailer</p>
              <div className="thumbnail-img-container">
                <div className="image-container w-56 h-40">
                  <Image src={vidThumbnailSrc} width={124} height={124} alt="course-thumbnail" />
                </div>
                <div className="thumbnail-image-info">
                  <p>
                    Students who watch <span> a well-made promo videos</span> can increase
                    <span>course enrollment</span> by up to 10X.
                  </p>
                  <div className="upload-button-container">
                    <input
                      type="file"
                      ref={videoInputRef}
                      id='videoThumbnail'
                      name='videoThumbnail'
                      style={{ display: 'none' }}
                      onChange={handleVideoFileSelect}
                      accept="video/*"
                    />
                    <button onClick={handleVideoButtonClick} className='next-form-btn'>
                      Upload Video
                      <Upload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="course-description-wrapper flex flex-col gap-4">
            <p>Course Description</p>
            <ReactQuill
              theme='snow'
              value={richEditor}
              onChange={setRichEditor}
              modules={quillmodule}
              id='courseDescription'
              name='courseDescription'
            />
          </div>
          <hr />
          <div className="course-topics-wrapper flex justify-between">
            <p>What you will teach in this course</p>
            <button type="button" onClick={addNewTopic} disabled={courseTopics.length >= 8}>+ Add new</button>
          </div>
          {courseTopics.map((topic, index) => (
            <div key={index} className="course-text-field">
              <label htmlFor={`courseTopics-${index}`}>Topic {index + 1}</label>
              <input
                type="text"
                id={`courseTopics-${index}`}
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                placeholder="What you will teach in this course"
                autoComplete="off"
                required
              />
              {courseTopics.length > 2 && (
                <button className='remove-btn' type="button" onClick={() => removeTopic(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button>
              )}
            </div>
          ))}
          <hr />
          <div className="course-topics-wrapper flex justify-between">
            <p>Target Audience</p>
            <button type="button" onClick={addNewAudience} disabled={targetAudience.length >= 8}>+ Add new</button>
          </div>
          {targetAudience.map((audience, index) => (
            <div key={index} className="course-text-field">
              <label htmlFor={`targetAudience-${index}`}>Audience {index + 1}</label>
              <input
                type="text"
                id={`targetAudience-${index}`}
                value={audience}
                onChange={(e) => handleAudienceChange(index, e.target.value)}
                placeholder="Describe your target audience"
                autoComplete="off"
                required
              />
              {targetAudience.length > 2 && (
                <button className='remove-btn' type="button" onClick={() => removeAudience(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button> // Adjust styling as needed
              )}
            </div>
          ))}
          <hr />
          <div className="course-topics-wrapper flex justify-between">
            <p>Course Requirements</p>
            <button type="button" onClick={addNewRequirement} disabled={courseRequirements.length >= 8}>+ Add new</button>
          </div>
          {courseRequirements.map((requirement, index) => (
            <div key={index} className="course-text-field">
              <label htmlFor={`courseRequirements-${index}`}>Requirement {index + 1}</label>
              <input
                type="text"
                id={`courseRequirements-${index}`}
                value={requirement}
                onChange={(e) => handleRequirementChange(index, e.target.value)}
                placeholder="Enter a requirement"
                autoComplete="off"
                required
              />
              {courseRequirements.length > 2 && (
                <button className='remove-btn' type="button" onClick={() => removeRequirement(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button>
              )}
            </div>
          ))}
        </form>
      </div>
      <div className="addcourse-bottom flex justify-between">
        <button type="button" className='cancel-form-btn' onClick={onPrevious}>Previous</button>
        <button className='next-form-btn' type="button" onClick={handleAdvanceInformation}>Save & Next</button>
      </div>
    </>
  );
};

export default AdvanceInformation