'use client'

import React, { useState, useEffect, useRef } from 'react';
import './add-course.css';
import { Dice1, Trash2, Upload, X } from 'lucide-react';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction, allsubcategoriesfunction, allinstructorsfunction } from '@/app/lib/Services/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function BasicDetails({ onNext }) {
  const [courseName, setCourseName] = useState('');
  const [courseSubtitle, setCourseSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [courseTopic, setCourseTopic] = useState('');
  const [courseLanguage, setCourseLanguage] = useState('');
  const [optionalLanguage, setOptionalLanguage] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [subCategoryResults, setSubCategoryResults] = useState([]);
  const [courseLevel, setCourseLevel] = useState('');
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
          <h2 className='form-wizard-heading'><img src="/Stack.svg" alt="Stack png icom" />Basic Details</h2>
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
                  id='categorySearch'
                  name='categorySearch'
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
                  id='subCategorySearch'
                  name='subCategorySearch'
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
                  id='courseLevelSearch'
                  name='courseLevelSearch'
                  placeholder='Beginner, Intermediate, Expert'
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
          <button className='cancel-form-btn'>Cancel</button>
          <button className='next-form-btn' onClick={handleBasicDetails}>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

function AdvanceInformation({ onNext }) {

  const fileInputRef = useRef();
  const videoInputRef = useRef();
  const [thumbnailSrc, setThumbnailSrc] = useState('/course-thumbnail.png');
  const [vidThumbnailSrc, setVidThumbnailSrc] = useState('/course-video-thumbnail.png');
  const [richEditor, setRichEditor] = useState('');
  const [formData, setFormData] = useState({ courseTopics: ['', ''], targetAudience: ['', ''], courseRequirements: ['', ''], richEditor: '', thumbnailSrc: '', vidThumbnailSrc: '' });
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }]
  ];

  const module = {
    toolbar: toolbarOptions,
  }

  const handleImgButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when button is clicked
  };

  const handleVideoButtonClick = () => {
    videoInputRef.current.click(); // Trigger the file input when button is clicked
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailSrc(e.target.result); // Update the image source with the selected file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVidThumbnailSrc(URL.createObjectURL(file)); // Set the source for the video thumbnail
    }
  };

  // CODE START TO HANDLE TOPICS FROM ADMIN

  const handleTopicChange = (index, value) => {
    const newTopics = formData.courseTopics.map((topic, i) => {
      if (i === index) return value;
      return topic;
    });
    setFormData({ ...formData, courseTopics: newTopics });
  };

  const addNewTopic = () => {
    if (formData.courseTopics.length < 8) {
      setFormData({
        ...formData,
        courseTopics: [...formData.courseTopics, ''],
      });
    } else {
      // Optionally, you can alert the user or disable the add button instead.
      console.log("Maximum of 8 topics can be added.");
    }
  };


  const removeTopic = (index) => {
    const newTopics = formData.courseTopics.filter((_, i) => i !== index);
    setFormData({ ...formData, courseTopics: newTopics });
  };

  // CODE END TO HANDLE TOPICS FROM ADMIN

  // CODE START TO HANDLE AUDIENCE

  const handleAudienceChange = (index, value) => {
    const newAudience = formData.targetAudience.map((audience, i) => {
      if (i === index) return value;
      return audience;
    });
    setFormData({ ...formData, targetAudience: newAudience });
  };

  const addNewAudience = () => {
    if (formData.targetAudience.length < 8) {
      setFormData({
        ...formData,
        targetAudience: [...formData.targetAudience, ''],
      });
    }
  };

  const removeAudience = (index) => {
    const newAudience = formData.targetAudience.filter((_, i) => i !== index);
    setFormData({ ...formData, targetAudience: newAudience });
  };

  // CODE END TO HANDLE AUDIENCE

  // CODE START TO HANDLE COURSE REQUIREMENTS

  const handleRequirementChange = (index, value) => {
    const newRequirements = formData.courseRequirements.map((requirement, i) => {
      if (i === index) return value;
      return requirement;
    });
    setFormData({ ...formData, courseRequirements: newRequirements });
  };

  const addNewRequirement = () => {
    if (formData.courseRequirements.length < 8) {
      setFormData({
        ...formData,
        courseRequirements: [...formData.courseRequirements, ''],
      });
    }
  };

  const removeRequirement = (index) => {
    const newRequirements = formData.courseRequirements.filter((_, i) => i !== index);
    setFormData({ ...formData, courseRequirements: newRequirements });
  };

  // CODE END TO HANDLE COURSE REQUIREMENTS

  const handleAdvanceInformation = () => {
    const advanceInformationDetails = {
      ...formData,
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
          <h2 className='form-wizard-heading'><img src="/Stack.svg" alt="Stack icon" />Advance Information</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <hr />
            <div className="course-thumbnail-wrapper flex gap-12 w-full">
              <div className="thumbnail-img-wrapper flex flex-col flex-1 gap-4">
                <p>Course Thumbnail</p>
                <div className="thumbnail-img-container">
                  <div className="image-container w-56 h-40">
                    <img src={thumbnailSrc} alt="course-thumbnail" />
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
                    <img src={vidThumbnailSrc} alt="course-thumbnail" />
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
                modules={module}
              />
            </div>
            <hr />
            <div className="course-topics-wrapper flex justify-between">
              <p>What you will teach in this course</p>
              <button type="button" onClick={addNewTopic} disabled={formData.courseTopics.length >= 8}>+ Add new</button>
            </div>
            {formData.courseTopics.map((topic, index) => (
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
                {formData.courseTopics.length > 2 && (
                  <button className='remove-btn' type="button" onClick={() => removeTopic(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button>
                )}
              </div>
            ))}
            <hr />
            <div className="course-topics-wrapper flex justify-between">
              <p>Target Audience</p>
              <button type="button" onClick={addNewAudience} disabled={formData.targetAudience.length >= 8}>+ Add new</button>
            </div>
            {formData.targetAudience.map((audience, index) => (
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
                {formData.targetAudience.length > 2 && (
                  <button className='remove-btn' type="button" onClick={() => removeAudience(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button> // Adjust styling as needed
                )}
              </div>
            ))}
            <hr />
            <div className="course-topics-wrapper flex justify-between">
              <p>Course Requirements</p>
              <button type="button" onClick={addNewRequirement} disabled={formData.courseRequirements.length >= 8}>+ Add new</button>
            </div>
            {formData.courseRequirements.map((requirement, index) => (
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
                {formData.courseRequirements.length > 2 && (
                  <button className='remove-btn' type="button" onClick={() => removeRequirement(index)}><Trash2 color="#FF635F" strokeWidth={1.5} /></button>
                )}
              </div>
            ))}
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button className='cancel-form-btn' type="button">Cancel</button>
          <button className='next-form-btn' type="button" onClick={handleAdvanceInformation}>Save & Next</button>
        </div>
      </div>
    </div>
  );
};

function Curriculum({ onNext }) {
  const [sections, setSections] = useState([{ name: 'Section 1: Section Name', lectures: [{ name: 'Lecture Name', content: { videos: [], attachedfile: [], description: [] } }] }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "editName" or "content"
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
  const toolbarOptions = [['clean']];
  const module = {
    toolbar: toolbarOptions,
  }
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

  const addVideoToLecture = (sectionIndex, lectureIndex, video) => {
    setSections(prevSections => {
      const updatedSections = [...prevSections];
      const targetSection = updatedSections[sectionIndex];
      if (!targetSection) {
        console.error(`Section at index ${sectionIndex} not found.`);
        return prevSections;
      }

      const targetLecture = targetSection.lectures[lectureIndex];
      if (!targetLecture) {
        console.error(`Lecture at index ${lectureIndex} not found in section ${sectionIndex}.`);
        return prevSections;
      }

      if (!targetLecture.content) {
        targetLecture.content = {
          videos: [],
        };
      }

      targetLecture.content.videos.push(video);
      console.log(`Video added to section ${sectionIndex} lecture ${lectureIndex}:`, video);

      return updatedSections;
    });
  };



  // UPLOAD RECORDED LECTURE BUTTON
  const handleRecordedButtonClick = () => {
    document.getElementById('video-upload').click();
  };

  const handleRecodedLecture = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const videoURL = URL.createObjectURL(file);
      const videoName = file.name;

      // Set the video name in state
      setRecordedFileName(videoName);
      const video = {
        url: videoURL,
        name: videoName,
      };

      // Now add this video object to the lecture
      addVideoToLecture(currentSectionIndex, currentLectureIndex, video);
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
                  <img src="/recorded-thumb.png" alt="recorded lecture thumbnail" />
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
    const newSectionNumber = sections.length + 1;
    const newSections = [
      ...sections,
      { name: `Section ${newSectionNumber}: Section Name`, lectures: [{ name: 'Lecture Name' }] }
    ];
    setSections(newSections);
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

  const addLecture = (sectionIndex) => {
    const newSections = sections.map((section, index) => {
      if (index === sectionIndex) {
        return {
          ...section,
          lectures: [...section.lectures, { name: 'Lecture Name' }]
        };
      }
      return section;
    });
    setSections(newSections);
  };


  const handleCurriculum = () => {
    onNext(sections);
    console.log(sections);
  };

  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><img src="/Stack.svg" alt="Stack png icom" />Curriculam</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form course-curriculam-container'>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="course-curriculam-wrapper">
                <div className="course-curriculam-topbar flex justify-between">
                  <div className='flex gap-2 items-center h-6'>
                    <img src="/Menu.svg" alt="menu-image" />
                    {/* <p className='static-curriculam'>Section {sectionIndex + 1}:</p> */}
                    <p className='dynamic-curriculam'>{section.name || 'Section Name'}</p>
                  </div>
                  <div className='flex gap-4'>
                    <button type="button" onClick={() => addLecture(sectionIndex)}>
                      <img src="/Plus.svg" alt="plus-svg-icon" className='action-btn' />
                    </button>
                    <button type="button" onClick={() => openEditModal(sectionIndex)}><img src="/PencilLine.svg" alt="Pencil-svg-icon" className='action-btn' /></button>
                    <button type="button" onClick={() => deleteSection(sectionIndex)}><img src="/Trash.svg" alt="Trash-svg-icon" className='action-btn' /></button>
                  </div>
                </div>
                <div className="curriculam-list-wrapper flex flex-col gap-4">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="curriculam-list flex justify-between items-center">
                      <div className='flex gap-2 items-center h-6'>
                        <img src="/Menu.svg" alt="menu-image" />
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
                        <button type="button" onClick={() => openEditModal(sectionIndex, lectureIndex)}><img src="/PencilLine.svg" alt="Pencil-svg-icon" className='action-btn' /></button>
                        <button type="button"><img src="/Trash.svg" alt="Trash-svg-icon" className='action-btn' /></button>
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
          <button type="button" className='cancel-form-btn'>Cancel</button>
          <button type="button" className='next-form-btn' onClick={handleCurriculum}>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

function PublishCourse({ onNext }) {


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

  const handlePublishCourse = () => {
    // onNext(handlePublishCourse);
    console.log('publish Course data');
  }

  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top flex gap-6">
          <h2 className='form-wizard-heading'><img src="/Stack.svg" alt="Stack png icom" />Publish Course</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <div className="message-wrapper flex flex-col gap-6">
              <p>Message</p>
              <div className="message-container flex gap-6">
                <div className="welcome-message w-full">
                  <label htmlFor="welcome-message">Welcome Message</label>
                  <textarea
                    name="welcome-message"
                    id="welcome-message"
                    placeholder='Enter course starting message here...'
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                  />
                </div>
                <div className="welcome-message w-full">
                  <label htmlFor="welcome-message">Congratulations Message</label>
                  <textarea
                    name="congrats-message"
                    id="congrats-message"
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
                  id='instructorSearch'
                  name='instructorSearch'
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
                      <img src="/user-2.jpg" alt="user-profile-image" width={48} height={48} className='rounded-full' />
                      <span className='w-48'>{instructor.name}</span>
                    <button onClick={() => handleRemoveInstructor(instructor.name)}><X strokeWidth={1.5} /></button>
                  </div>
                ))}
              </div>

            </div>
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button type="button" className='cancel-form-btn'>Cancel</button>
          <button type="button" className='next-form-btn' onClick={handlePublishCourse}>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

function AddCourse() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ BasicDetails: {}, AdvanceInformation: { courseTopics: [] }, Curriculum: {}, PublishCourse: {} });

  // const nextStep = (stepData) => {
  //   let key;
  //   switch (currentStep) {
  //     case 1:
  //       key = 'BasicDetails';
  //       break;
  //     case 2:
  //       key = 'AdvanceInformation';
  //       break;
  //     case 3:
  //       key = 'Curriculam';
  //       break;
  //   }
  //   setFormData(prevFormData => ({ ...prevFormData, [key]: { ...prevFormData[key], ...stepData } }));
  //   setCurrentStep(currentStep + 1);
  //   console.log(`Data after ${key}:`, newFormData); // This will log the updated formData to the console
  //   return newFormData;
  // };

  // Inside AddCourse component
  const nextStep = (stepData) => {
    let key;
    switch (currentStep) {
      case 1:
        key = 'BasicDetails';
        break;
      case 2:
        key = 'AdvanceInformation';
        break;
      case 3:
        key = 'Curriculam';
        break;
      case 4:
        Key = 'PublishCourse'
      default:
        key = '';
        break;
    }

    setFormData(prevFormData => {
      const newFormData = { ...prevFormData, [key]: { ...prevFormData[key], ...stepData } };
      console.log(`Data after ${key}:`, newFormData); // This will log the updated formData to the console
      return newFormData;
    });

    if (currentStep < 4) { // If there are more steps, go to the next one
      setCurrentStep(currentStep + 1);
    } else {
      // Handle the final step (submission to backend here)
      console.log('Final Form Data:', formData); // This should log the complete form data
      // submitCourseData(formData); // This is where you would submit all the collected data to the backend
    }
  };


  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetails onNext={nextStep} formData={formData.BasicDetails} />;
      case 2:
        return <AdvanceInformation onNext={nextStep} formData={formData.AdvanceInformation} setFormData={setFormData} />;
      case 3:
        return <Curriculum onNext={nextStep} formData={formData.Curriculum} />;
      case 4:
        return <PublishCourse onNext={nextStep} />;
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