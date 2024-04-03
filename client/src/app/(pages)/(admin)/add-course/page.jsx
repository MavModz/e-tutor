'use client'

require("dotenv").config();
import React, { useState, useEffect, useRef } from 'react';
import './add-course.css';
import Image from 'next/image';
import { Trash2, Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction, allsubcategoriesfunction, allinstructorsfunction, addcoursefunction } from '@/app/lib/Services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import aws_s3 from '@/app/lib/Services/aws_s3';

async function uploadFileToS3(file, key) {
  const bucket_name = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const bucketName = bucket_name;
  const params = {
    Bucket: bucketName,
    Key: key,
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

function BasicDetails({ onNext }) {
  const router = useRouter();
  const [courseName, setCourseName] = useState('');
  const [courseSubtitle, setCourseSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [courseTopic, setCourseTopic] = useState('');
  const [courseLanguage, setCourseLanguage] = useState('');
  const [optionalLanguage, setOptionalLanguage] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [subCategoryResults, setSubCategoryResults] = useState([]);
  const [showCourseLevelDropdown, setShowCourseLevelDropdown] = useState(false);
  const defaultCourseLevels = [
    { levelName: "Beginner" },
    { levelName: "Intermediate" },
    { levelName: "Expert" }
  ];

  const [courseLevelResults, setCourseLevelResults] = useState(defaultCourseLevels);

  useEffect(() => {
    fetchCategoryData('');
  }, []);


  const handleCategorySearchFocus = () => {
    setShowCategoryDropdown(true);
  };

  const handleSubCategorySearchFocus = () => {
    setShowSubCategoryDropdown(true);
  };

  const handleCourseLevelSearchFocus = () => {
    setShowCourseLevelDropdown(true);
  };

  const handleCategorySearchBlur = () => {
    setTimeout(() => {
      setShowCategoryDropdown(true);
    }, 100);
  };

  const handleSubCategorySearchBlur = () => {
    setTimeout(() => {
      setShowSubCategoryDropdown(true);
    }, 100);
  };

  const handleCourseLevelSearchBlur = () => {
    setTimeout(() => {
      setShowCourseLevelDropdown(true);
    }, 100);
  };

  const fetchCategoryData = async (value = '') => {
    try {
      const response = await allcategoriesfunction(value);
      if (Array.isArray(response)) {
        let filteredResult;
        if (value.trim() === '') {
          filteredResult = response;
        } else {
          filteredResult = response.filter(category =>
            category.categoryName.toLowerCase().includes(value.toLowerCase())
          );
        }
        setCategoryResults(filteredResult);
        console.log("Filtered results length:", filteredResult.length, filteredResult);
      } else {
        console.error('Expected an array, but received:', response);
        setCategoryResults([]);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      setCategoryResults([]);
    }
  };

  const fetchSubCategoryData = async (categoryName) => {
    try {
      const response = await allsubcategoriesfunction(categoryName);
      console.log(response);
      if (Array.isArray(response)) {
        let subCategoryfilterResult;
        if (subCategory.trim() === '') {
          subCategoryfilterResult = response;
        } else {
          subCategoryfilterResult = response.filter(category =>
            category.subCategoryName.toLowerCase().includes(value.toLowerCase())
          );
        }
        setSubCategoryResults(subCategoryfilterResult);
        console.log("Filtered results length:", subCategoryfilterResult.length, subCategoryfilterResult);
      }
      else {
        console.error('Expected an array, but received:', response);
        setSubCategoryResults([]);
      }
    }
    catch (error) {
      console.error("error while fetching sub category", error);
      setSubCategoryResults([]);
    }
  };

  const filterCourseLevels = (inputValue) => {
    if (!inputValue) {
      setCourseLevelResults(defaultCourseLevels);
    } else {
      const filtered = defaultCourseLevels.filter(level =>
        level.levelName.toLowerCase().includes(inputValue.toLowerCase())
      );
      setCourseLevelResults(filtered);
    }
  };


  const handleCategoryResultClick = (result) => {
    console.log('Selected:', result.categoryName)
    setCategory(result.categoryName);
    setShowCategoryDropdown(false);
    fetchSubCategoryData(result.categoryName);
  }

  const handleSubCategoryResultClick = (result) => {
    console.log('Selected Subcategory:', result.subCategoryName);
    setSubCategory(result.subCategoryName);
    setShowSubCategoryDropdown(false);
  }

  const handleCourseLevelInputChange = (value) => {
    setCourseLevel(value);
    filterCourseLevels(value);
  };

  const handleCourseLevelResultClick = (result) => {
    setCourseLevel(result.levelName);
    setShowCourseLevelDropdown(false);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? The data will not be saved.")) {
      router.push("/course")
    }
  }

  const handleBasicDetails = () => {
    const basicDetailsData = {
      courseName,
      courseSubtitle,
      category,
      subCategory,
      courseTopic,
      courseLanguage,
      optionalLanguage,
      courseLevel,
      courseDuration,
    };
    onNext(basicDetailsData);
    console.log(basicDetailsData);
  }

  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><Image src="/Stack.svg" width={24} height={24} alt="Stack png icom" />Basic Details</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <div className="course-text-field">
              <label htmlFor="courseName">Course Title</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Your Course Title"
                autoComplete="off"
                required
              />
            </div>
            <div className="course-text-field">
              <label htmlFor="courseSubtitle">Course Subtitle</label>
              <input
                type="text"
                id='courseSubtitle'
                name='courseSubtitle'
                value={courseSubtitle}
                onChange={(e) => setCourseSubtitle(e.target.value)}
                placeholder='Your Course Subtitle'
                autoComplete='off'
              />
            </div>
            <div className='course-text-field flex gap-6'>
              <div className="course-category-search">
                <Searchbar
                  inputValue={category}
                  onInputChange={setCategory}
                  fetchData={fetchCategoryData}
                  label='Course Category'
                  id='courseCategory'
                  name='courseCategory'
                  placeholder='Type to Search Category'
                  onBlur={handleCategorySearchBlur}
                  onFocus={handleCategorySearchFocus}
                />
                {showCategoryDropdown && (
                  <Searchlist
                    result={categoryResults}
                    inputValue={category}
                    onClick={handleCategoryResultClick}
                    displayProperty="categoryName"
                  />
                )}
              </div>
              <div className="course-sub-category-search">
                <Searchbar
                  inputValue={subCategory}
                  onInputChange={setSubCategory}
                  fetchData={fetchSubCategoryData}
                  label='Course Sub-Category'
                  id='courseSubcategory'
                  name='courseSubcategory'
                  placeholder='Type to Search sub-category'
                  onBlur={handleSubCategorySearchBlur}
                  onFocus={handleSubCategorySearchFocus}
                />
                {showSubCategoryDropdown && (
                  <Searchlist
                    result={subCategoryResults}
                    inputValue={subCategory}
                    onClick={handleSubCategoryResultClick}
                    displayProperty="subCategoryName"
                  />
                )}
              </div>
            </div>
            <div className="course-text-field">
              <label htmlFor="courseTopic">Course Topic</label>
              <input
                type='text'
                id='courseTopic'
                name='courseTopic'
                value={courseTopic}
                onChange={(e) => setCourseTopic(e.target.value)}
                placeholder='What is primary taught in the course?'
                autoComplete='off'
              />
            </div>
            <div className="course-overview-wrapper w-full flex gap-6 justify-between">
              <div className="course-text-field">
                <label htmlFor="courseLanguage">Course Language</label>
                <input
                  type="text"
                  id='courseLanguage'
                  name='courseLanguage'
                  value={courseLanguage}
                  onChange={(e) => setCourseLanguage(e.target.value)}
                  placeholder='Prefered Language'
                  autoComplete='off'
                />
              </div>
              <div className="course-text-field">
                <label htmlFor="optionalLanguage">Optional Language</label>
                <input type="text"
                  name="optionalLanguage"
                  id="optionalLanguage"
                  value={optionalLanguage}
                  onChange={(e) => setOptionalLanguage(e.target.value)}
                  placeholder='optional Language'
                  autoComplete='off'
                />
              </div>
              <div className="course-text-field relative">
                <Searchbar
                  inputValue={courseLevel}
                  onInputChange={handleCourseLevelInputChange}
                  label='Course Level'
                  id='courseLevel'
                  name='courseLevel'
                  placeholder='Beginner, Intermediate'
                  onFocus={handleCourseLevelSearchFocus}
                  onBlur={handleCourseLevelSearchBlur}
                />
                {showCourseLevelDropdown && (
                  <Searchlist
                    result={courseLevelResults}
                    inputValue={courseLevel}
                    onClick={handleCourseLevelResultClick}
                    displayProperty="levelName"
                  />
                )}
              </div>
              <div className="course-text-field">
                <label htmlFor="courseDuration">Course Duration</label>
                <input
                  type="text"
                  id='courseDuration'
                  name='courseDuration'
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  placeholder='Course Duration'
                  autoComplete='off'
                />
              </div>
            </div>
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button className='cancel-form-btn' onClick={handleCancel}>Cancel</button>
          <button className='next-form-btn' onClick={handleBasicDetails}>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

function AdvanceInformation({ onNext, onPrevious }) {

  const fileInputRef = useRef();
  const videoInputRef = useRef();
  const [thumbnailSrc, setThumbnailSrc] = useState('/course-thumbnail.png');
  const [vidThumbnailSrc, setVidThumbnailSrc] = useState('/course-video-thumbnail.png');
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
    if (file) {
      const key = `course-thumbnails/${Date.now()}-${file.name}`;
      try {
        const uploadedFileURL = await uploadFileToS3(file, key);
        setThumbnailSrc(uploadedFileURL);
        sessionStorage.setItem('uploadedThumbnail', uploadedFileURL);
        console.log(uploadedFileURL);
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

  const handleVideoFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setVidThumbnailSrc(URL.createObjectURL(file));
      const key = `video-thumbnail/${Date.now()}-${file.name}`;
      try {
        const uploadedVideoFileURL = await uploadFileToS3(file, key);
        setVidThumbnailSrc(uploadedVideoFileURL);
      }
      catch (error) {
        console.log('error uploading the video to s3', error);
      }
    }
  };

  // CODE START TO HANDLE TOPICS FROM ADMIN

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
      vidThumbnailSrc
    };
    onNext(advanceInformationDetails);
    console.log(advanceInformationDetails);
  };

  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><Image src="/Stack.svg" width={24} height={24} alt="Stack icon" />Advance Information</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <hr />
            <div className="course-thumbnail-wrapper flex gap-12 w-full">
              <div className="thumbnail-img-wrapper flex flex-col flex-1 gap-4">
                <p>Course Thumbnail</p>
                <div className="thumbnail-img-container">
                  <div className="image-container w-56 h-40">
                    <Image src={thumbnailSrc} width={124} height={124} alt="course-thumbnail" />
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
      </div>
    </div>
  );
};

function Curriculum({ onNext, onPrevious }) {
  const [sections, setSections] = useState([{
    name: 'Section 1: Section Name',
    lectures: [{
      name: 'Lecture Name', content: {
        type: '',
        url: '',
        description: '',
      },
    }]
  }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);
  const [editingLectureIndex, setEditingLectureIndex] = useState(null);
  const [currentContentType, setCurrentContentType] = useState(null); // "Video", "Attach File", "Description"
  const [tempName, setTempName] = useState('');
  const [dropdownVisibility, setDropdownVisibility] = useState({});
  const [recordedLectureThumb, setRecordedLectureThumb] = useState('');
  const [recordedLectureFileName, setRecordedFileName] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [lectureDescription, setLectureDescription] = useState('');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(null);
  const recordedLectureRef = useRef(null);

  // Function to toggle dropdown
  const toggleDropdown = (sectionIndex, lectureIndex) => {
    const key = `section-${sectionIndex}-lecture-${lectureIndex}`;

    // Set all dropdowns to false and then toggle the current one.
    setDropdownVisibility(prevVisibility => ({
      ...Object.keys(prevVisibility).reduce((acc, dropdownKey) => {
        acc[dropdownKey] = false; // Set all to false initially
        return acc;
      }, {}),
      [key]: !prevVisibility[key] // Toggle the current one
    }));
  };


  // Function to handle content type selection and open the modal
  const selectContentType = (sectionIndex, lectureIndex, contentType) => {
    setCurrentSectionIndex(sectionIndex);
    setCurrentLectureIndex(lectureIndex);
    setCurrentContentType(contentType);
    openContentModal(sectionIndex, lectureIndex, contentType);
    // Hide dropdown after selection
    setDropdownVisibility(prev => ({
      ...prev,
      [`section-${sectionIndex}-lecture-${lectureIndex}`]: false,
    }));
  };

  const openEditModal = (sectionIndex, lectureIndex = null) => {
    setModalType('editName');
    setEditingSectionIndex(sectionIndex);
    setEditingLectureIndex(lectureIndex);
    const name = lectureIndex !== null
      ? sections[sectionIndex].lectures[lectureIndex].name
      : sections[sectionIndex].name.split(': ')[1];
    setTempName(name);
    setIsModalOpen(true);
  };

  const openContentModal = (sectionIndex, lectureIndex, contentType) => {
    resetContentState();
    setModalType('content');
    setEditingSectionIndex(sectionIndex);
    setEditingLectureIndex(lectureIndex);
    setCurrentContentType(contentType);
    setIsModalOpen(true);
  };

  const resetContentState = () => {
    setRecordedFileName('');
    setAttachedFileName('');
    setLectureDescription('');
  };

  const saveName = () => {
    const newSections = [...sections];
    if (editingLectureIndex !== null) {
      newSections[editingSectionIndex].lectures[editingLectureIndex].name = tempName;
    } else {
      newSections[editingSectionIndex].name = `Section ${editingSectionIndex + 1}: ${tempName}`;
    }
    setSections(newSections);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSectionIndex(null);
    setEditingLectureIndex(null);
    setTempName('');
    setCurrentContentType(null);
  };

  // const addVideoToLecture = (sectionIndex, lectureIndex, video) => {
  //   setSections(prevSections => {
  //     return prevSections.map((section, idx) => {
  //       if (idx === sectionIndex) {
  //         return {
  //           ...section,
  //           lectures: section.lectures.map((lecture, lIdx) => {
  //             if (lIdx === lectureIndex) {
  //               // Check if the content object exists, if not create it
  //               let updatedContent = lecture.content || {};
  //               // Check if the videos array exists, if not create it
  //               let updatedVideos = updatedContent.videos || [];
  //               // Add the new video
  //               updatedVideos.push(video);
  //               // Return the updated lecture with the new video
  //               return {
  //                 ...lecture,
  //                 content: {
  //                   ...updatedContent,
  //                   videos: updatedVideos
  //                 }
  //               };
  //             }
  //             return lecture;
  //           })
  //         };
  //       }
  //       return section;
  //     });
  //   });
  // };

  // const addVideoToLecture = (sectionIndex, lectureIndex, video) => {
  //   setSections(prevSections => {
  //     return prevSections.map((section, idx) => {
  //       if (idx === sectionIndex) {
  //         return {
  //           ...section,
  //           lectures: section.lectures.map((lecture, lIdx) => {
  //             if (lIdx === lectureIndex) {
  //               // Update the content object to reflect the video type, url, and an empty description
  //               const updatedContent = {
  //                 type: 'Video', // Set the type to Video
  //                 url: video.url, // Set the URL from the video object passed to the function
  //                 description: '' // Description is empty
  //               };

  //               // Return the updated lecture with the new content
  //               return {
  //                 ...lecture,
  //                 content: updatedContent
  //               };
  //             }
  //             return lecture;
  //           })
  //         };
  //       }
  //       return section;
  //     });
  //   });
  // };

  const addVideoToLecture = (sectionIndex, lectureIndex, video) => {
    setSections(prevSections => {
      return prevSections.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          return {
            ...section,
            lectures: section.lectures.map((lecture, lIndex) => {
              if (lIndex === lectureIndex) {
                // Ensuring that the content object is initialized correctly
                const updatedContent = lecture.content || {};
                updatedContent.type = 'Video';
                updatedContent.url = video.url;
                updatedContent.description = updatedContent.description || '';

                return {
                  ...lecture,
                  content: updatedContent
                };
              }
              return lecture;
            })
          };
        }
        return section;
      });
    });
  };



  // UPLOAD RECORDED LECTURE BUTTON
  useEffect(() => {
    const handleRecordedButtonClick = () => {
      document.getElementById('video-upload').click();
    };
  }, []);


  const handleRecodedLecture = async (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      // const videoURL = URL.createObjectURL(file);
      const videoName = `videos/${Date.now()}-${file.name}`;
      try {
        const uploadedVideoURL = await uploadFileToS3(file, videoName);
        const video = {
          url: uploadedVideoURL,
          name: file.name,
        };
        addVideoToLecture(currentSectionIndex, currentLectureIndex, video);
      }
      catch (error) {
        console.log('error uploading recorded lecture', error);
      }
    }
  };


  // ATTATCH FILE HANDLE
  const handleAttachFileChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      setAttachedFileName(file.name);
      const fileObject = {
        name: file.name,
        size: file.size,
        type: file.type,
        // You may not create an object URL for non-media files unless you need to display them
      };

      // Call a function to add this file to the lecture
      addFileToLecture(currentSectionIndex, currentLectureIndex, fileObject);
    }
  };

  //
  const addFileToLecture = (sectionIndex, lectureIndex, fileObject) => {
    setSections(prevSections => {
      const updatedSections = [...prevSections];
      const targetSection = updatedSections[sectionIndex];
      if (!targetSection) {
        console.error(`Section not found at index: ${sectionIndex}`);
        return;
      }
      const targetLecture = targetSection.lectures[lectureIndex];
      if (!targetLecture) {
        console.error(`Lecture not found at index: ${lectureIndex} in section: ${sectionIndex}`);
        return;
      }
      if (!targetLecture.content) {
        targetLecture.content = { videos: [], attachedFiles: [], description: '' };
      }
      if (!Array.isArray(targetLecture.content.attachedFiles)) {
        targetLecture.content.attachedFiles = [];
      }
      targetLecture.content.attachedFiles.push(fileObject);
      console.log(`File added to lecture at index ${lectureIndex} in section ${sectionIndex}`, fileObject);

      return updatedSections;
    });
  };



  // DESCRIPTION HANDLE
  const handleDescriptionChange = (event) => {
    setLectureDescription(event.target.value);
  };

  const addDescriptionToLecture = (sectionIndex, lectureIndex, descriptionText) => {
    setSections(prevSections => {
      const updatedSections = [...prevSections];
      const targetSection = updatedSections[sectionIndex];
      const targetLecture = targetSection.lectures[lectureIndex];

      // Ensure the content object and descriptions array exist
      if (!targetLecture.content) {
        targetLecture.content = { descriptions: [] };
      }
      if (!Array.isArray(targetLecture.content.descriptions)) {
        targetLecture.content.descriptions = [];
      }

      // Add the description text to the descriptions array
      targetLecture.content.descriptions.push(descriptionText);

      console.log(`Description added to section ${sectionIndex} lecture ${lectureIndex}:`, descriptionText);

      return updatedSections;
    });
  };


  const saveDescription = () => {
    addDescriptionToLecture(currentSectionIndex, currentLectureIndex, lectureDescription);
    console.log(`Description for section ${currentSectionIndex} lecture ${currentLectureIndex}:`, lectureDescription);

    // Clear the input after saving
    setLectureDescription('');

    // Close the modal
    closeModal();
  };


  const renderModalContent = () => {
    if (modalType === 'editName') {
      return (
        <div className="modal-content">
          <div className='pop-modal-topbar px-5'>
            <h4>Edit {editingLectureIndex !== null ? 'Lecture' : 'Section'} Name</h4>
            <button className="close-button" onClick={closeModal}><X size={20} strokeWidth={1.5} /></button>
          </div>
          <div className="course-text-field px-6">
            <label htmlFor='pop-modal'>{editingLectureIndex !== null ? 'Lecture' : 'Section'}</label>
            <input type="text" id='pop-modal' value={tempName} onChange={(e) => setTempName(e.target.value)} />
          </div>
          <div className='flex justify-between px-6'>
            <button onClick={closeModal} className='cancel-form-btn'>Cancel</button>
            <button onClick={saveName} className='next-form-btn'>Save Changes</button>
          </div>
        </div>
      );
    } else if (modalType === 'content' && currentContentType === 'Video') {
      return (
        <div className="modal-content">
          <div className='pop-modal-topbar px-5'>
            <h4>Lecture Video</h4>
            <button className="close-button" onClick={closeModal}><X size={20} strokeWidth={1.5} /></button>
          </div>
          <div className="course-text-field flex gap-6 px-6">
            {!recordedLectureFileName && (
              <label htmlFor='video-upload'>Video File</label>
            )}
            <label htmlFor='video-upload' style={{ display: 'none' }}>Video File</label>
            <input
              type="file"
              id='video-upload'
              ref={recordedLectureRef}
              style={{ display: 'none' }}
              onChange={handleRecodedLecture}
              accept="video/*"
            />
            {recordedLectureFileName && (
              <div className="uploaded-file-info-container flex gap-2">
                <div className="recordedthumb-container">
                  <Image src="/recorded-thumb.png" width={124} height={124} alt="recorded lecture thumbnail" />
                </div>
                <div className="uploaded-file-info-wrapper">
                  <p className='file-uploaded'>FILE UPLOADED</p>
                  <p className="uploaded-file-name">{recordedLectureFileName}</p>
                </div>
              </div>

            )}
          </div>
          <div className="upload-instruction px-6">
            <p className="file-note">Note: All files should be at least 720p and less than 4.0 GB.</p>
          </div>
          <div className='flex justify-between px-6'>
            <button onClick={closeModal} className='cancel-form-btn'>Cancel</button>
            <button type='button' onClick={handleRecordedButtonClick} className='next-form-btn'>Upload Video</button>
          </div>
        </div>
      );
    } else if (modalType === 'content' && currentContentType === 'Attach File') {
      return (
        <div className="modal-content">
          <div className='pop-modal-topbar px-5'>
            <h4>Attach File</h4>
            <button className="close-button" onClick={closeModal}><X size={20} strokeWidth={1.5} /></button>
          </div>
          <div className='mx-6'>
            <div className="upload-thumbnail flex gap-6 px-6">
              <label htmlFor="fileInput" className="upload-label">
                <input type="file"
                  id="courseThumbnail"
                  className="course-thumbnail px-6"
                  onChange={handleAttachFileChange}
                />
                <span>Attach File</span>
                <span className="upload-text">{attachedFileName ? `${attachedFileName}` : 'Drag and drop a file or browse file'}</span>
              </label>
            </div>
          </div>
          <div className='flex justify-between px-6'>
            <button onClick={closeModal} className='cancel-form-btn'>Cancel</button>
            <button type='button' onClick={handleRecordedButtonClick} className='next-form-btn'>Upload Video</button>
          </div>
        </div>
      );
    } else if (modalType === 'content' && currentContentType === 'Description') {
      return (
        <div className="modal-content">
          <div className='pop-modal-topbar px-5'>
            <h4>Add Lecture Description</h4>
            <button className="close-button" onClick={closeModal}><X size={20} strokeWidth={1.5} /></button>
          </div>
          <div className="course-text-field flex flex-col gap-2 px-6">
            <label htmlFor="lecture-description">Description</label>
            <textarea
              id="lecture-description"
              name="lecture-description"
              placeholder="Write your lecture description here..."
              value={lectureDescription}
              onChange={handleDescriptionChange}
            />
            <button className='next-form-btn' onClick={(e) => saveDescription(e)}>Save Description</button>
          </div>
          <div className='flex justify-between px-6'>
            <button onClick={closeModal} className='cancel-form-btn'>Cancel</button>
            <button onClick={saveName} className='next-form-btn'>Upload Video</button>
          </div>
        </div>
      );
    }
    return null;
  };

  const addSection = () => {
    setSections(prevSections => {
      const newSectionNumber = prevSections.length + 1;
      const newSection = {
        name: `Section ${newSectionNumber}: Section Name`,
        lectures: [{ name: 'Lecture 1', content: { type: '', url: '', description: '' } }]
      };
      return [...prevSections, newSection];
    });
  };

  const deleteSection = (sectionIndex) => {
    if (sections.length > 1) {
      // Filter out the section to delete
      const newSections = sections.filter((_, index) => index !== sectionIndex)
        .map((section, index) => {
          // Update the section name with the correct number after deletion
          return {
            ...section,
            name: `Section ${index + 1}: ${section.name.split(': ')[1]}`
          };
        });
      setSections(newSections);
    } else {
      alert("You cannot delete the last section.");
    }
  };

  // const addLecture = (sectionIndex) => {
  //   const newSections = [...sections];
  //   newSections[sectionIndex].lectures.push({
  //     name: `Lecture ${newSections[sectionIndex].lectures.length + 1}`,
  //     content: { type: '', url: '', description: '' }
  //   });
  //   setSections(newSections);
  // };

  // const addLecture = (sectionIndex) => {
  //   setSections(prevSections => {
  //     const newSections = [...prevSections];
  //     newSections[sectionIndex].lectures.push({
  //       name: `Lecture ${newSections[sectionIndex].lectures.length + 1}`,
  //       content: { type: '', url: '', description: '' },
  //     });
  //     return newSections;
  //   });
  // };

  const addLecture = (sectionIndex) => {
    setSections(prevSections => {
      // Create a deep copy to prevent direct mutations
      const newSections = JSON.parse(JSON.stringify(prevSections));

      // Determine the new lecture's name
      const newLectureName = `Lecture ${newSections[sectionIndex].lectures.length + 1}`;

      // Check if this lecture name already exists to avoid duplicate names
      const doesLectureExist = newSections[sectionIndex].lectures.some(lecture => lecture.name === newLectureName);

      if (!doesLectureExist) {
        // Push the new lecture only if it doesn't exist
        newSections[sectionIndex].lectures.push({
          name: newLectureName,
          content: { type: '', url: '', description: '' },
        });
      }

      return newSections;
    });
  };

  const deleteLecture = (sectionIndex, lectureIndex) => {
    setSections(prevSections => {
      return prevSections.map((section, sIndex) => {
        if (sIndex === sectionIndex) {
          // Check if there's more than one lecture to allow deletion
          if (section.lectures.length <= 1) {
            alert("You cannot delete the last lecture in a section.");
            return section;
          }

          const updatedLectures = section.lectures
            .filter((_, lIndex) => lIndex !== lectureIndex)
            .map((lecture, index) => {
              // Preserve custom names, but adjust the numbering for default named lectures
              const defaultLectureName = `Lecture ${index + 1}`;
              if (lecture.name.startsWith("Lecture ")) {
                return {
                  ...lecture,
                  name: defaultLectureName,
                };
              }
              return lecture;
            });

          return {
            ...section,
            lectures: updatedLectures,
          };
        }
        return section;
      });
    });
  };



  const handleCurriculum = () => {
    // Preparing the sections data to be passed to the parent component
    const curriculamDetails = {
      sections: sections.map(section => ({
        name: section.name,
        lectures: section.lectures.map(lecture => ({
          name: lecture.name,
          content: lecture.content || { type: '', url: '', description: '' }, // Ensure content is initialized
        }))
      })),
    };

    // Calling the onNext prop with the new sections data
    onNext(curriculamDetails);
    console.log('this is consoled data of sections', sections);
  };


  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><Image src="/Stack.svg" width={24} height={24} alt="Stack png icom" />Curriculam</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form course-curriculam-container'>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="course-curriculam-wrapper">
                <div className="course-curriculam-topbar flex justify-between">
                  <div className='flex gap-2 items-center h-6'>
                    <Image src="/Menu.svg" width={20} height={20} alt="menu-image" />
                    {/* <p className='static-curriculam'>Section {sectionIndex + 1}:</p> */}
                    <p className='dynamic-curriculam'>{section.name || 'Section Name'}</p>
                  </div>
                  <div className='flex gap-4'>
                    <button type="button" onClick={() => addLecture(sectionIndex)}>
                      <Image src="/Plus.svg" width={24} height={24} alt="plus-svg-icon" className='action-btn' />
                    </button>
                    <button type="button" onClick={() => openEditModal(sectionIndex)}><Image src="/PencilLine.svg" width={24} height={24} alt="Pencil-svg-icon" className='action-btn' /></button>
                    <button type="button" onClick={() => deleteSection(sectionIndex)}><Image src="/Trash.svg" width={24} height={24} alt="Trash-svg-icon" className='action-btn' /></button>
                  </div>
                </div>
                <div className="curriculam-list-wrapper flex flex-col gap-4">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="curriculam-list flex justify-between items-center">
                      <div className='flex gap-2 items-center h-6'>
                        <Image src="/Menu.svg" alt="menu-image" />
                        <p className='dynamic-curriculam'>{lecture.name || 'Lecture Name'}</p>
                      </div>
                      <div className='flex gap-4'>
                        <button type="button" className='curriculam-content-btn' onClick={() => toggleDropdown(sectionIndex, lectureIndex)}>Content</button>
                        {/* Dropdown menu for content selection */}
                        {dropdownVisibility[`section-${sectionIndex}-lecture-${lectureIndex}`] && (
                          <div className="dropdown-menu">
                            <div onClick={() => selectContentType(sectionIndex, lectureIndex, 'Video')}>Video</div>
                            <div onClick={() => selectContentType(sectionIndex, lectureIndex, 'Attach File')}>Attach File</div>
                            <div onClick={() => selectContentType(sectionIndex, lectureIndex, 'Description')}>Description</div>
                          </div>
                        )}
                        <button type="button" onClick={() => openEditModal(sectionIndex, lectureIndex)}><Image src="/PencilLine.svg" width={24} height={24} alt="Pencil-svg-icon" className='action-btn' /></button>
                        <button type="button" onClick={() => deleteLecture(sectionIndex, lectureIndex)}><Image src="/Trash.svg" width={24} height={24} alt="Trash-svg-icon" className='action-btn' /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {isModalOpen && (
              <div className="modal">
                {renderModalContent()}
              </div>
            )}
            <button type='button' className='curriculam-content-btn' onClick={addSection}>Add Section</button>
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          {/* <button type="button" className='cancel-form-btn'>Cancel</button> */}
          <button type="button" className='cancel-form-btn' onClick={onPrevious}>Previous</button>
          <button type="button" className='next-form-btn' onClick={handleCurriculum}>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

function PublishCourse({ onPrevious, onSubmit }) {


  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [congratulationsMessage, setCongratulationsMessage] = useState('');
  const [showInstructorDropdown, setShowIstructorDropdown] = useState(false);
  const [instructorName, setInstructorName] = useState('');
  const [instructorResults, setInstructorResults] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState([]);

  const fetchInstructorData = async (value = '') => {
    try {
      const response = await allinstructorsfunction(value);
      if (Array.isArray(response)) {
        let filteredResult;
        if (value.trim() === '') {
          filteredResult = response;
        } else {
          filteredResult = response.filter(instructor =>
            instructor.name.toLowerCase().includes(value.toLowerCase())
          );
        }
        setInstructorResults(filteredResult);
        console.log("Filtered results length:", filteredResult.length, filteredResult);
      } else {
        console.error('Expected an array, but received:', response);
        setInstructorResults([]);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      setInstructorResults([]);
    }
  };

  const handleInstructorSearchBlur = () => {
    setTimeout(() => {
      setShowIstructorDropdown(true);
    }, 100);
  };

  const handleInstructorSearchFocus = () => {
    setShowIstructorDropdown(true);
  };

  // const handleInstructorResultClick = (result) => {
  //   console.log('Selected:', result.name)
  //   setInstructorName(result.name);
  //   setShowIstructorDropdown(false);
  // }

  const handleInstructorResultClick = (instructor) => {
    if (!selectedInstructors.some(selected => selected.name === instructor.name)) {
      setSelectedInstructors(prev => [...prev, instructor]);
      setShowIstructorDropdown(false);
      setInstructorName('');
      console.log(instructor);
    }
  };

  const handleRemoveInstructor = (instructorName) => {
    setSelectedInstructors(prev => prev.filter(instructor => instructor.name !== instructorName));
  };

  const handlePublishClick = (e) => {
    e.preventDefault();
    const publishCourseDetails = {
      welcomeMessage,
      congratulationsMessage,
      selectedInstructors: selectedInstructors.map(instructor => instructor.name)
    };

    onSubmit(publishCourseDetails);
  };


  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><Image src="/Stack.svg" width={24} height={24} alt="Stack png icom" />Publish Course</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <div className="message-wrapper flex flex-col gap-6">
              <p>Message</p>
              <div className="message-container flex gap-6">
                <div className="welcome-message w-full">
                  <label htmlFor="welcomeMessage">Welcome Message</label>
                  <textarea
                    name="welcomeMessage"
                    id="welcomeMessage"
                    placeholder='Enter course starting message here...'
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>
                <div className="welcome-message w-full">
                  <label htmlFor="congratsMessage">Congratulations Message</label>
                  <textarea
                    name="congratsMessage"
                    id="congratsMessage"
                    placeholder='Enter course completed message here...'
                    value={congratulationsMessage}
                    onChange={(e) => setCongratulationsMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="intructor-wrapper flex flex-col gap-6">
              <div className="course-text-field course-category-search">
                <Searchbar
                  inputValue={instructorName}
                  onInputChange={setInstructorName}
                  fetchData={fetchInstructorData}
                  label='Add Instructor'
                  id='instructors'
                  name='instructors'
                  placeholder='Search by name'
                  onBlur={handleInstructorSearchBlur}
                  onFocus={handleInstructorSearchFocus}
                />
                {showInstructorDropdown && (
                  <Searchlist
                    result={instructorResults}
                    inputValue={instructorName}
                    onClick={(instructor) => handleInstructorResultClick(instructor)}
                    displayProperty="name"
                  />
                )}
              </div>
              <div className='flex gap-6'>
                {selectedInstructors.map((instructor, index) => (
                  <div className='instructor-list-container' key={index}>
                    <Image src="/user-2.jpg" alt="user-profile-image" width={48} height={48} className='rounded-full' />
                    <span className='w-48'>{instructor.name}</span>
                    <button onClick={() => handleRemoveInstructor(instructor.name)}><X strokeWidth={1.5} /></button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button type="button" className='cancel-form-btn' onClick={onPrevious}>Previous</button>
          <button type="button" className='next-form-btn' onClick={handlePublishClick}>Submit Course</button>
        </div>
      </div>
    </div>
  )
}

function AddCourse() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ BasicDetails: {}, AdvanceInformation: {}, Curriculum: {}, PublishCourse: {} });

  // Inside AddCourse component
  const nextStep = (stepData) => {
    let key = '';
    switch (currentStep) {
      case 1:
        key = 'BasicDetails';
        break;
      case 2:
        key = 'AdvanceInformation';
        break;
      case 3:
        key = 'Curriculum';
        break;
      case 4:
        key = 'PublishCourse';
        break;
      default:
        console.warn('Unknown step');
        return;
    }

    setFormData(prevFormData => {
      const updatedStepData = { ...prevFormData[key], ...stepData };
      const newFormData = { ...prevFormData, [key]: updatedStepData };
      console.log(`Data after ${key}:`, newFormData);
      return newFormData;
    });

    const previousStep = () => {
      setCurrentStep(prevStep => prevStep - 1);
    };

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final Form Data:', formData);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (publishCourseDetails) => {
    // Format the formData to match the backend schema
    setFormData(prevFormData => ({
      ...prevFormData,
      PublishCourse: publishCourseDetails
    }));
    const formattedData = {
      courseName: formData.BasicDetails.courseName || "",
      courseSubtitle: formData.BasicDetails.courseSubtitle || "",
      courseCategory: formData.BasicDetails.category || "",
      courseSubcategory: formData.BasicDetails.subCategory || "",
      courseTopic: formData.BasicDetails.courseTopic || "",
      courseLanguage: formData.BasicDetails.courseLanguage || "",
      courseLevel: formData.BasicDetails.courseLevel || "",
      courseDuration: formData.BasicDetails.courseDuration || "",
      courseThumbnail: formData.AdvanceInformation.thumbnailSrc || "",
      videoThumbnail: formData.AdvanceInformation.vidThumbnailSrc || "",
      courseDescription: formData.AdvanceInformation.richEditor || "",
      courseTopics: formData.AdvanceInformation.courseTopics || [],
      targetAudience: formData.AdvanceInformation.targetAudience || [],
      courseRequirements: formData.AdvanceInformation.courseRequirements || [],
      sections: formData.Curriculum.sections || [],
      welcomeMessage: publishCourseDetails.welcomeMessage || "",
      congratulationsMessage: publishCourseDetails.congratulationsMessage || "",
      instructors: publishCourseDetails.selectedInstructors || [],
    };
    const hasAllRequiredData = Object.values(formattedData).every(value => value !== undefined && value !== null);
    console.log('before if')
    if (hasAllRequiredData) {
      console.log("Some required fields are missing:", formattedData);
      return;
    }
    try {
      const response = await addcoursefunction(formattedData);
      console.log("Course submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetails onNext={nextStep} />;
      case 2:
        return <AdvanceInformation onNext={nextStep} onPrevious={previousStep} />;
      case 3:
        return <Curriculum onNext={nextStep} onPrevious={previousStep} formData={formData.Curriculum} />;
      case 4:
        return <PublishCourse onNext={nextStep} formData={formData.PublishCourse} onPrevious={previousStep} onSubmit={handleSubmit} />;
      default:
        return <div>Unknow step</div>
    }
  }

  return (
    <div>{renderStep()}</div>
  )
}

export default AddCourse
// 8591185985 ashwani kumar (happy)