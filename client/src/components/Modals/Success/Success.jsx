import React from 'react';
import Image from 'next/image';
import './sucess.css';

function Success({ show, onClose, message }) {
    if (!show) {
        return null;
    }

    let defaultMessage = 'Your action was successful.';
    if (message === 'addCourse') {
        defaultMessage = 'Course added successfully.';
    } else if (message === 'deleteCourse') {
        defaultMessage = 'Course deleted successfully.';
    }
    

    return (
        <div className="submission-modal">
            <div className="submission-modal-content">
                <Image src= "/success.gif" width={180} height={180} unoptimized alt="success popup" />
                <h2 className='popup-title-success'>Success!</h2>
                <p className='popup-message'>{defaultMessage}</p>
                <button
                    onClick={onClose}
                    className="popup__button">
                    OK
                </button>
            </div>
        </div>
    )
}

export default Success