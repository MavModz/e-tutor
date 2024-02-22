'use client'

import React, { useState, useEffect, useRef } from 'react';
import './add-course.css';
import { Trash2, Upload } from 'lucide-react';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction, allsubcategoriesfunction } from '@/app/lib/Services/api';

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
  const [thumbnailSrc, setThumbnailSrc] = useState('/course-thumbnail.png');
  const [formData, setFormData] = useState({ courseTopics: ['', ''], targetAudience: ['', ''], courseRequirements: ['', ''], });

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when button is clicked
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

  const handleNext = () => {
    console.log("AdvanceInformation Data:", formData);
    onNext(formData);
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
                    {/* Image will change based on the selected file */}
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
                        accept=".jpg, .jpeg, .png" // It's good practice to specify accepted file types
                      />
                      <button onClick={handleButtonClick} className='next-form-btn'>
                        Upload File
                        <Upload />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="thumbnail-video-wrapper flex-1">
                <p>Course Trailer</p>
              </div>
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
                  <button type="button" onClick={() => removeRequirement(index)}>Remove</button> // Adjust styling as needed
                )}
              </div>
            ))}
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button className='cancel-form-btn' type="button">Cancel</button>
          <button className='next-form-btn' type="button" onClick={handleNext}>Save & Next</button>
        </div>
      </div>
    </div>
  );
};


function AddCourse() {

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ BasicDetails: {}, AdvanceInformation: { courseTopics: [] } });

  const nextStep = (stepData) => {
    let key;
    switch (currentStep) {
      case 1:
        key = 'BasicDetails';
        break;
      case 2:
        key = 'AdvanceInformation';
        break;
    }
    setFormData(prevFormData => ({ ...prevFormData, [key]: { ...prevFormData[key], ...stepData } }));
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetails onNext={nextStep} formData={formData.BasicDetails} />;
      case 2:
        return <AdvanceInformation onNext={nextStep} formData={formData.AdvanceInformation} setFormData={setFormData} />;
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