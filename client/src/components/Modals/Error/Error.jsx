import React from 'react';
import Image from 'next/image';
import './error.css';

function Error({ show, onClose, message }) {
  if (!show) {
    return null;
  }

  let defaultMessage = 'An error occurred.';
  if (message === 'addCourseError') {
    defaultMessage = 'Failed to add the course.';
  } else if (message === 'deleteCourseError') {
    defaultMessage = 'Failed to delete the course.';
  }

  return (
    <div className="submission-modal">
      <div className="submission-modal-content">
        <Image src= '/error.gif' width={180} height={180} unoptimized alt="error popup" />
        <h2 className='popup-title-error'>Error!</h2>
        <p className='popup-message'>{defaultMessage}</p>
        <button
          onClick={onClose}
          className="popup__button">
          Try Again
        </button>
      </div>
    </div>
  );
}

export default Error;
