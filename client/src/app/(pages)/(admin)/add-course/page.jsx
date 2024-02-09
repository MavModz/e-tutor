'use client'

import React, { useState, useEffect } from 'react';
import './add-course.css';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction, allsubcategoriesfunction } from '@/app/lib/Services/api';


function AddCourse() {

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [subCategoryResults, setSubCategoryResults] = useState([]);
  const [courseLevel, setCourseLevel] = useState([]);


  useEffect(() => {
    fetchCategoryData('');
  }, []);

  const handleCategorySearchFocus = () => {
    setShowCategoryDropdown(true);
  };

  const handleSubCategorySearchFocus = () => {
    setShowSubCategoryDropdown(true);
  };

  const handleCategorySearchBlur = () => {
    setTimeout(() => {
      setShowCategoryDropdown(false);
    }, 100);
  };

  const handleSubCategorySearchBlur = () => {
    setTimeout(() => {
      setShowSubCategoryDropdown(false);
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


  return (
    <div className="bg-[#f4f7fe] w-full min-h-full">
      <div className="addcourse-container">
        <div className="addcourse-top">
          <h2>Basic Details</h2>
        </div>
        <div className="addcourse-middle">
          <form className='addcourse-form'>
            <div className="course-text-field">
              <label htmlFor="courseName">Course Title</label>
              <input
                type="text"
                id="courseName"
                name="courseName"
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
                  placeholder='Prefered Language'
                  autoComplete='off'
                />
              </div>
              <div className="course-text-field">
                <label htmlFor="optionalLanguage">Optional Language</label>
                <input type="text"
                  name="optionalLanguage"
                  id="optionalLanguage"
                  placeholder='optional Language'
                  autoComplete='off'
                />
              </div>
              <div className="course-text-field">
                <Searchbar
                  inputValue={courseLevel}
                  onInputChange={setCourseLevel}
                  label='Course Level'
                  id='courseLevel'
                  name='courseLevel'
                  placeholder='Course Level'
                />
                <Searchlist result={courseLevel} />
              </div>
              <div className="course-text-field">
                <label htmlFor="courseDuration">Course Duration</label>
                <input
                  type="text"
                  id='courseDuration'
                  name='courseDuration'
                  placeholder='Course Duration'
                  autoComplete='off'
                />
              </div>
            </div>
          </form>
        </div>
        <div className="addcourse-bottom flex justify-between">
          <button className='cancel-form-btn'>Cancel</button>
          <button className='next-form-btn'>Save & Next</button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
// 8591185985 ashwani kumar (happy)