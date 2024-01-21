'use client'

import React, {useState} from 'react';
import './add-course.css';

function AddCourse() {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

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
              <div className="custom-dropdown">
                <button className="dropdown-button" onClick={toggleDropdown}>
                  {selectedCategory}
                </button>
                <div className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                  <a onClick={() => selectCategory('Video')}>Video</a>
                  <a onClick={() => selectCategory('Attach File')}>Attach File</a>
                  <a onClick={() => selectCategory('Captions')}>Captions</a>
                  <a onClick={() => selectCategory('Description')}>Description</a>
                  <a onClick={() => selectCategory('Lecture Notes')}>Lecture Notes</a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="addcourse-bottom">
          <button>cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddCourse
// 8591185985 ashwani kumar (happy)


{/* <div className="sub-text-field-left">
                <label htmlFor="courseCategory">Course Category</label>
                <div className="dropdown" name="courseCategory">
                  <div className="select">
                    <span>Select...</span>
                    <div className="caret"></div>
                  </div>
                  <ul className="courseCategory-list">
                    <li>test1</li>
                    <li className='active'>test2</li>
                    <li>test3</li>
                  </ul>
                </div>
              </div>

              <div className="sub-text-field-right">
                <label htmlFor="courseSubcategory">Course Sub Category</label>
                <div className="dropdown" name="courseCategory">
                  <div className="select">
                    <span>Select...</span>
                    <div className="caret"></div>
                  </div>
                  <ul className="courseCategory-list">
                    <li>test1</li>
                    <li className='active'>test2</li>
                    <li>test3</li>
                  </ul>
                </div>
              </div> */}