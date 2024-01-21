'use client'

import React from 'react';
import './add-course.css';

function AddCourse() {
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
              <div className="sub-text-field-left">
                <label htmlFor="courseCategory">Course Category</label>
                <select name="courseCategory" id="courseCategory">
                  <option>test</option>
                  <option>test2</option>
                </select>
              </div>

              <div className="sub-text-field-right">
                <label htmlFor="courseSubcategory">Course Sub Category</label>
                <select name="courseSubcategory" id="courseSubcategory">
                  <option>sub cat1</option>
                  <option>sub cat2</option>
                </select>
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