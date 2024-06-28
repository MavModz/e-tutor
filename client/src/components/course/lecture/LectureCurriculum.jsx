import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';

function LectureCurriculum({ sections, onLectureClick }) {
  const [openSections, setOpenSections] = useState({ 0: true });

  const toggleSection = (index) => {
    setOpenSections(prevOpenSections => ({
      ...Object.keys(prevOpenSections).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {}),
      [index]: !prevOpenSections[index],
    }));
  };

  const handleLectureClick = (lecture) => {
    if (lecture.content && lecture.content.url) {
      onLectureClick(lecture.content.url);
    }
  };

  return (
    <>
      <div className="curriculum-wrapper flex justify-between">
        <div className="curriculum-title">
          <h4>Curriculum</h4>
        </div>
        <div className="curriculum-stats flex gap-4">
          <div className="section-count flex gap-1.5 items-center">
            <Image src="/FolderNotchOpen.svg" width={20} height={20} alt="Folder svg icon" />
            <span>{sections.length} Sections</span>
          </div>
          <div className="lecture-count flex gap-1.5 items-center">
            <Image src="/PlayCircle.svg" width={20} height={20} alt="Lecture svg icon" />
            <span>{sections.reduce((total, section) => total + (section.lectures ? section.lectures.length : 0), 0)} Lectures</span>
          </div>
        </div>
      </div>
      <div className="course-data">
        {sections.map((section, index) => (
          <div key={section.name} className="section">
            <div className={`section-title-wrapper flex justify-between ${openSections[index] ? 'active' : ''}`} style={{ backgroundColor: openSections[index] ? '#F5F7FA' : 'transparent' }}>
              <button onClick={() => toggleSection(index)} className={`section-title ${openSections[index] ? 'active' : ''}`}>
                {openSections[index] ? <ChevronUp color="#FF6636" strokeWidth={1.5} /> : <ChevronDown color="#6E7485" strokeWidth={1.5} />}
                {section.name}
              </button>
              <button className="unique-section-count flex gap-1.5">
                <Image src="/PlayCircle.svg" width={20} height={20} alt="Lecture svg icon" />
                {section.lectures ? section.lectures.length : 0} Lectures
              </button>
            </div>
            {openSections[index] && (
              <ul className="lectures-list">
                {section.lectures && section.lectures.map((lecture, lectureIndex) => (
                  <li key={lectureIndex} className="lecture" onClick={() => handleLectureClick(lecture)}>
                    <span className="flex gap-2">
                      <Image src="/PlayBlack.svg" width={16} height={16} alt="Play svg" />
                      {lecture.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default LectureCurriculum;
