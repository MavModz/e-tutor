'use client'

require("dotenv").config();
import React, { useState, useEffect } from 'react';
import './add-course.css';
import Auth from '../../(auth)/middleware/auth';
import Loader from '@/components/loader/Loader';
import { addcoursefunction } from '@/app/lib/Services/api';

import dynamic from 'next/dynamic';

const Success = dynamic(() => import('@/components/Modals/Success/Success'), { ssr: false });
const Error = dynamic(() => import('@/components/Modals/Error/Error'), { ssr: false });
const BasicDetails = dynamic(() => import('@/components/admin/addcourseform/BasicDetails/BasicDetails'), { ssr: false });
const AdvanceInformation = dynamic(() => import('@/components/admin/addcourseform/AdvanceInformation/AdvanceInformation'), { ssr: false });
const Curriculum = dynamic(() => import('@/components/admin/addcourseform/Curriculum/Curriculum'), { ssr: false });
const PublishCourse = dynamic(() => import('@/components/admin/addcourseform/PublishCourse/PublishCourse'), { ssr: false });

function AddCourse() {

  const { isLoading } = Auth();
  const [showLoader, setShowLoader] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ BasicDetails: {}, AdvanceInformation: {}, Curriculum: {}, PublishCourse: {} });
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);
  const [isSubmissionUnSuccessful, setIsSubmissionUnSuccessful] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) {
        setShowLoader(false);
      }
    }, 1000);

    if (!isLoading) {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (showLoader) {
    return <div><Loader /></div>;
  }

  // Inside AddCourse component
  const nextStep = (stepData) => {
    let key = '';
    switch (currentStep) {
      case 1:
        key = 'BasicDetails';
        break;
      case 2:
        key = 'AdvanceInformation';
        break;
      case 3:
        key = 'Curriculum';
        break;
      case 4:
        key = 'PublishCourse';
        break;
      default:
        console.warn('Unknown step');
        return;
    }

    setFormData(prevFormData => {
      const updatedStepData = { ...prevFormData[key], ...stepData };
      const newFormData = { ...prevFormData, [key]: updatedStepData };
      console.log(`Data after ${key}:`, newFormData);
      return newFormData;
    });

    const previousStep = () => {
      setCurrentStep(prevStep => prevStep - 1);
    };

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final Form Data:', formData);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (publishCourseDetails) => {

    // Format the formData to match the backend schema
    setFormData(prevFormData => ({
      ...prevFormData,
      PublishCourse: publishCourseDetails
    }));

    const formattedData = {
      courseName: formData.BasicDetails.courseName || "",
      courseSubtitle: formData.BasicDetails.courseSubtitle || "",
      courseCategory: formData.BasicDetails.category || "",
      courseSubcategory: formData.BasicDetails.subCategory || "",
      courseTopic: formData.BasicDetails.courseTopic || "",
      courseLanguage: formData.BasicDetails.courseLanguage || "",
      courseLevel: formData.BasicDetails.courseLevel || "",
      courseDuration: formData.BasicDetails.courseDuration || "",
      courseThumbnail: formData.AdvanceInformation.thumbnailSrc || "",
      videoThumbnail: formData.AdvanceInformation.videoSrcLink || "",
      courseDescription: formData.AdvanceInformation.richEditor || "",
      courseTopics: formData.AdvanceInformation.courseTopics || [],
      targetAudience: formData.AdvanceInformation.targetAudience || [],
      courseRequirements: formData.AdvanceInformation.courseRequirements || [],
      sections: formData.Curriculum.sections || [],
      welcomeMessage: publishCourseDetails.welcomeMessage || "",
      congratsMessage: publishCourseDetails.congratulationsMessage || "",
      instructors: publishCourseDetails.selectedInstructors || [],
    };

    const hasAllRequiredData = Object.values(formattedData).every(value => value !== undefined && value !== null && value !== "");
    console.log(hasAllRequiredData);
    if (hasAllRequiredData) {
      console.log("Some required fields are missing:", formattedData);
      setIsSubmissionUnSuccessful(true);
      return;
    }
    else {
      try {
        const response = await addcoursefunction(formattedData);
        console.log("Course submitted successfully:", response);
        sessionStorage.removeItem("video-thumbnail");
        sessionStorage.removeItem("uploadedThumbnail");
        setIsSubmissionSuccessful(true);
      } catch (error) {
        console.error("Error submitting course:", error);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDetails onNext={nextStep} />;
      case 2:
        return <AdvanceInformation onNext={nextStep} onPrevious={previousStep} />;
      case 3:
        return <Curriculum onNext={nextStep} onPrevious={previousStep} formData={formData.Curriculum} />;
      case 4:
        return <PublishCourse onNext={nextStep} onPrevious={previousStep} onSubmit={handleSubmit} />;
      default:
        return <div>Unknow step</div>
    }
  }

  return (
    <div>
      {renderStep()}
      <Success
        show={isSubmissionSuccessful}
        onClose={() => setIsSubmissionSuccessful(false)}
        message="addCourse"
      />
      <Error
        show={isSubmissionUnSuccessful}
        onClose={() => setIsSubmissionUnSuccessful(false)}
        message="addCourse"
      />
    </div>
  )
}

export default AddCourse
// 8591185985 ashwani kumar (happy)