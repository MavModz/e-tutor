require("dotenv").config();
import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allinstructorsfunction } from '@/app/lib/Services/api';
;

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

export default PublishCourse