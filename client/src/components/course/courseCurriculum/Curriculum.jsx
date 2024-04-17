import React, { useState } from 'react'

function Curriculum(course) {

  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (index) => {
    setOpenSections((prevOpenSections) => ({
      ...Object.keys(prevOpenSections).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [index]: !prevOpenSections[index],
    }));
  };

  const sections = course.sections;
  const sectionCount = sections.length;
  const lecturesCount = sections.reduce((total, section) => {
    return total + (section.lectures ? section.lectures.length : 0);
  }, 0);


  return (
    <>
      <div className="curriculum-wrapper flex justify-between">
        <div className="curriculum-title">
          <h4>Curriculum</h4>
        </div>
        <div className="curriculum-stats flex gap-4">
          <div className="section-count flex gap-1.5 items-center">
            <img src="/FolderNotchOpen.svg" width={20} height={20} alt="Folder svg icon" />
            <span>{sectionCount} Sections</span>
          </div>
          <div className="lecture-count flex gap-1.5 items-center">
            <img src="/PlayCircle.svg" width={20} height={20} alt="Lecture svg icon" />
            <span>{lecturesCount} lectures</span>
          </div>
        </div>
      </div>
      <div className="course-data">
        {sections.map((section, index) => {
          const sectionLecturesCount = section.lectures ? section.lectures.length : 0;
          return (
            <div key={section.name} className='section'>
              <div className='flex justify-between'>
                <button onClick={() => toggleSection(index)} className={`section-title ${openSections[index] ? 'active' : ''}`}>
                  {section.name}
                </button>
                <button className='unique-section-count flex gap-1.5'>
                  <img src="/PlayCircle.svg" width={20} height={20} alt="Lecture svg icon" />
                  {sectionLecturesCount} lectures
                </button>
              </div>
              {openSections[index] && (
                <ul className='lectures-list'>
                  {section.lectures && section.lectures.map((lecture, lectureIndex) => (
                    <li key={lectureIndex} className="lecture">
                      {lecture.content && lecture.content.type === 'Video' ? (
                        // <a href={`/course/video/${lecture.content.url}`}>
                        //   {lecture.name}
                        // </a>
                        <span className='flex gap-2'>
                          <img src="/PlayBlack.svg" width={16} height={16} alt="Play svg" />
                          {lecture.name}
                          </span>
                      ) : (
                        <span className='flex gap-2'>
                          <img src="/File.svg" width={16} height={16} alt="file svg icon" />
                          {lecture.name}
                        </span>
                      )}
                      {/* ... other types like 'Attachment' */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Curriculum