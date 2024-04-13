import React from 'react';

function Overview(course) {
  return (
    <>
      <h4>Description</h4>
      <div dangerouslySetInnerHTML={{ __html: course.courseDescription }} />
      <div className="course-points-list">
        <h4>What you will learn in this course</h4>
      </div>
    </>
  )
}

export default Overview