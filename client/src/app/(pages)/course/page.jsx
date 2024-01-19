// 'use client'

// import React, {useState, useEffect} from 'react';
// import { allcoursesfunction } from '@/app/lib/Services/api';
// import Header from '@/components/admin/header/header';
// import Card from '@/components/cards/Card';
// import './courses.css';

// function Course() {
//     const [courses, setCourses] = useState([]);
//     useEffect(() => {
//         fetchAllCourses();
//     }, [])

//     const fetchAllCourses = async () => {
//         try {
//             const response = await allcoursesfunction();
//             setCourses(response);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className='bg-[#f4f7fe] w-full min-h-full'>
//             <Header />
//             <div className="course-card-container">
//                 <h4>My Courses</h4>
//                 <div className="course-list-card-wrapper">
//                     <div className="course-list-cards">
//                         {courses.map(course => (
//                             <Card
//                                 key={course._id}
//                                 courseName={course.courseName}
//                                 courseCode={course.courseCode}
//                                 teacherName={course.teacherName}
//                                 coursePrice={course.coursePrice}
//                                 rating={course.rating}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Course

import Header from '@/components/admin/header/header'
import React from 'react'

function Course() {
  return (
    <div>
        <Header />
        Course</div>
  )
}

export default Course