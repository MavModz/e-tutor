import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Courserating from '@/components/admin/courserating/Courserating';
import { coursecommentfunction } from '@/app/lib/Services/api';
import { formatDistanceToNow } from 'date-fns';

function Review() {
  const router = useRouter();
  const { courseId } = router.query;
  const [studentFeedback, setStudentFeedback] = useState([]);

  const fetchstudentfeedback = async () => {
    if (!courseId) return;
    try {
      const response = await coursecommentfunction(courseId);
      if (response.ratings) {
        const enrichedRatings = response.ratings.map(rating => ({
          ...rating,
          timeAgo: formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })
        }));
        setStudentFeedback(enrichedRatings);
      }
      else {
        studentFeedback([]);
      }
    }
    catch (error) {
      console.log("Error while fetching the student feedback", error);
    }
  }
  useEffect(() => {
    if (router.isReady) {
      fetchstudentfeedback();
    }
  }, [router.isReady, courseId])
  return (
    <div className="course-rating-wrapper flex flex-col gap-10">
      <div className="overall-course-rating-container flex flex-col gap-5">
        <div className="overall-course-rating-heading">
          <h4>Course Rating</h4>
        </div>
        <div className="overall-course-rating-area flex gap-6">
          <div className="average-course-rating">
            <h4>4.8</h4>
            <div className="rating-visual flex flex-col items-center gap-2">
              <Image src='/course-rating.svg' width={108} height={20} alt='course rating svg' />
              <p>Course Rating</p>
            </div>
          </div>
          <div className="overall-course-rating-progress-bar w-full">
            <Courserating />
          </div>
        </div>
      </div>
      <div className="student-feedback-container">
        <div className="student-feedback-heading">
          <h4>Students Feedback</h4>
        </div>
        <div className="student-feedback-area">
          {studentFeedback.length > 0 ? (studentFeedback.map((item, index) => (
            <div className="feedback-list-container">
              <div className="student-feedback-list flex flex-col gap-3 py-5" key={index}>
                <div className="feedback-heading-container flex flex-col gap-2">
                  <div className="feedback-heading flex gap-2">
                    <h6>{item.name}</h6>
                    <span>.</span>
                    <p>{item.timeAgo}</p>
                  </div>
                  <Image src={`/${item.rating}stars.svg`} alt={`${item.rating} star rating`} width={80} height={16} />
                </div>
                <div className="comment-container">
                  <p>{item.comment}</p>
                </div>
              </div>
              <hr />
            </div>
          ))
          ) : (
            <div className="student-feedback-list">
              <p>No Comments yet!</p>
            </div>
          )
          }
        </div>
      </div>
    </div>
  )
}

export default Review