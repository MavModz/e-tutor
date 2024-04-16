import React from 'react';

function Overview(course) {
  const courseTopic = course && course.courseTopics ? course.courseTopics : [];
  const courseAudience = course && course.targetAudience ? course.targetAudience : [];
  const courseRequirement = course && course.courseRequirements ? course.courseRequirements : [];
  return (
    <>
      <h4>Description</h4>
      <div dangerouslySetInnerHTML={{ __html: course.courseDescription }} />
      <div className="course-points-list">
        <h4>What you will learn in this course</h4>
        <ul className="course-topic-list flex justify-between gap-6">
          {courseTopic.map((topic, index) => (
            <li key={index} className='topics-list flex gap-2'>
              <img src="/CheckCircle.svg" width={24} height={24} alt="checkmark" />
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="course-audience-list flex flex-col gap-5">
        <h4>Who this course is for:</h4>
        <ul className='target-audience flex flex-col gap-3'>
          {courseAudience.map((audience, index) => (
            <li key={index} className='flex gap-2'>
              <img src="/ArrowRight.svg" width={24} height={24} alt="right arrow" />
              <span>{audience}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="course-requirement-list flex flex-col gap-5">
          <h4>Course requirements</h4>
          <ul className='target-audience flex flex-col gap-3'>
            {courseRequirement.map((requirement, index) => (
              <li key={index} className='flex gap-2'>
                <img src="/ListCircle.svg" width={8} height={8} alt="circle list svg" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
      </div>
    </>
  )
}

export default Overview