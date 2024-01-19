import React from 'react'
import successPopup from '../../../assets/images/success.gif'
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
        <div className="modal">
            <div className="modal-content">
                <img src={successPopup} alt="success popup" className='popup-img' />
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