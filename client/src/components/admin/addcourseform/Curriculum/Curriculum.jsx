require("dotenv").config();
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import aws_s3 from '@/app/lib/Services/aws_s3';
import Header from '../../header/header';

async function uploadFileToS3(file, key) {
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
  const handleRecordedButtonClick = () => {
    document.getElementById('video-upload').click();
  };

  const handleRecodedLecture = async (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      // const videoURL = URL.createObjectURL(file);
      const adminId = sessionStorage.getItem('adminId');
      const folderPath = `${adminId}`
      console.log(folderPath);
      const videoName = `videos/${Date.now()}-${file.name}`;
      try {
        const uploadedVideoURL = await uploadFileToS3(file, folderPath, videoName);
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
            <button type='button' onClick={handleRecordedButtonClick} className='next-form-btn'>Upload</button>
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
            <button type='button' onClick={handleRecordedButtonClick} className='next-form-btn'>Upload</button>
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
            <button className='next-form-btn' onClick={(e) => saveDescription(e)}>Save</button>
          </div>
          <div className='flex justify-between px-6'>
            <button onClick={closeModal} className='cancel-form-btn'>Cancel</button>
            <button onClick={saveName} className='next-form-btn'>Upload</button>
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
          content: { ...lecture.content }, // Ensure content is initialized
        }))
      })),
    };

    // Calling the onNext prop with the new sections data
    onNext(curriculamDetails);
    console.log('this is consoled data of sections', sections);
  };


  return (
    <>
      <div className="addcourse-middle">
        <div className="addcourse-curriculum-area flex flex-col gap-6 px-10">
          <h4 className='addcourse-form-heading'>Course Curriculum</h4>
          <hr />
          <form className='addcourse-form course-curriculam-container'>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="course-curriculam-wrapper">
                <div className="course-curriculam-topbar flex justify-between">
                  <div className='flex gap-2 items-center h-6'>
                    <Image src="/Menu.svg" width={20} height={20} alt="menu-image" />
                    {/* <p className='static-curriculam'>Section {sectionIndex + 1}:</p> */}
                    <p className='dynamic-curriculam'>{section.name || 'Section Name'}</p>
                  </div>
                  <div className='course-curriculam-topbar-action-btn flex gap-4'>
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
                        <Image src="/Menu.svg" width={20} height={20} alt="menu-image" />
                        <p className='dynamic-curriculam'>{lecture.name || 'Lecture Name'}</p>
                      </div>
                      <div className='course-curriculam-topbar-action-btn flex gap-4'>
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
      </div>
      <div className="addcourse-bottom flex justify-between">
        {/* <button type="button" className='cancel-form-btn'>Cancel</button> */}
        <button type="button" className='cancel-form-btn' onClick={onPrevious}>Previous</button>
        <button type="button" className='next-form-btn' onClick={handleCurriculum}>Save & Next</button>
      </div>
    </>
  )
}

export default Curriculum