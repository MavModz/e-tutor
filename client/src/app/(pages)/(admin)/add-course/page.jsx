'use client'

import React, { useState, useEffect } from 'react';
import './add-course.css';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction } from '@/app/lib/Services/api';


function AddCourse() {

  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [categoryResults, setCategoryResults] = useState([]);
  const [subCategoryResults, setSubCategoryResults] = useState([]);


  useEffect(() => {
    fetchCategoryData('');
  }, []);

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowDropdown(true);
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
        console.log("Filtered results length:", filteredResult.length);
      } else {
        console.error('Expected an array, but received:', response);
        setCategoryResults([]);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
      setCategoryResults([]);
    }
  };


  const handleResultClick = (result) => {
    console.log('Selected:', result.categoryName)
    setCategory(result.categoryName);
    setShowDropdown(false);
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
                  onBlur={handleSearchBlur}
                  onFocus={handleSearchFocus}
                />
                {showDropdown && (
                  <Searchlist
                    result={categoryResults}
                    inputValue={category}
                    onClick={handleResultClick}
                  />
                )}
              </div>
              <div className="course-sub-category-search">
                <Searchbar
                  inputValue={subCategory}
                  onInputChange={setSubCategory}
                  label='Course Sub-Category'
                  id='subCategorySearch'
                  name='subCategorySearch'
                  placeholder='Type to Search sub-category'
                />
                <Searchlist result={subCategoryResults} />
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