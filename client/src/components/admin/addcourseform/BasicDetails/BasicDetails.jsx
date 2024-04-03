import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Searchbar from '@/components/Searchbar/Searchbar';
import Searchlist from '@/components/Searchbar/SearchList/Searchlist';
import { allcategoriesfunction, allsubcategoriesfunction } from '@/app/lib/Services/api';

function BasicDetails({ onNext }) {
    const router = useRouter();
    const [courseName, setCourseName] = useState('');
    const [courseSubtitle, setCourseSubtitle] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [courseTopic, setCourseTopic] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [optionalLanguage, setOptionalLanguage] = useState('');
    const [courseDuration, setCourseDuration] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
    const [categoryResults, setCategoryResults] = useState([]);
    const [subCategoryResults, setSubCategoryResults] = useState([]);
    const [showCourseLevelDropdown, setShowCourseLevelDropdown] = useState(false);
    const defaultCourseLevels = [
        { levelName: "Beginner" },
        { levelName: "Intermediate" },
        { levelName: "Expert" }
    ];

    const [courseLevelResults, setCourseLevelResults] = useState(defaultCourseLevels);

    useEffect(() => {
        fetchCategoryData('');
    }, []);


    const handleCategorySearchFocus = () => {
        setShowCategoryDropdown(true);
    };

    const handleSubCategorySearchFocus = () => {
        setShowSubCategoryDropdown(true);
    };

    const handleCourseLevelSearchFocus = () => {
        setShowCourseLevelDropdown(true);
    };

    const handleCategorySearchBlur = () => {
        setTimeout(() => {
            setShowCategoryDropdown(true);
        }, 100);
    };

    const handleSubCategorySearchBlur = () => {
        setTimeout(() => {
            setShowSubCategoryDropdown(true);
        }, 100);
    };

    const handleCourseLevelSearchBlur = () => {
        setTimeout(() => {
            setShowCourseLevelDropdown(true);
        }, 100);
    };

    const fetchCategoryData = async (value = '') => {
        try {
            const response = await allcategoriesfunction(value);
            if (Array.isArray(response)) {
                let filteredResult;
                if (value.trim() === '') {
                    filteredResult = response;
                } else {
                    filteredResult = response.filter(category =>
                        category.categoryName.toLowerCase().includes(value.toLowerCase())
                    );
                }
                setCategoryResults(filteredResult);
                console.log("Filtered results length:", filteredResult.length, filteredResult);
            } else {
                console.error('Expected an array, but received:', response);
                setCategoryResults([]);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
            setCategoryResults([]);
        }
    };

    const fetchSubCategoryData = async (categoryName) => {
        try {
            const response = await allsubcategoriesfunction(categoryName);
            console.log(response);
            if (Array.isArray(response)) {
                let subCategoryfilterResult;
                if (subCategory.trim() === '') {
                    subCategoryfilterResult = response;
                } else {
                    subCategoryfilterResult = response.filter(category =>
                        category.subCategoryName.toLowerCase().includes(value.toLowerCase())
                    );
                }
                setSubCategoryResults(subCategoryfilterResult);
                console.log("Filtered results length:", subCategoryfilterResult.length, subCategoryfilterResult);
            }
            else {
                console.error('Expected an array, but received:', response);
                setSubCategoryResults([]);
            }
        }
        catch (error) {
            console.error("error while fetching sub category", error);
            setSubCategoryResults([]);
        }
    };

    const filterCourseLevels = (inputValue) => {
        if (!inputValue) {
            setCourseLevelResults(defaultCourseLevels);
        } else {
            const filtered = defaultCourseLevels.filter(level =>
                level.levelName.toLowerCase().includes(inputValue.toLowerCase())
            );
            setCourseLevelResults(filtered);
        }
    };


    const handleCategoryResultClick = (result) => {
        console.log('Selected:', result.categoryName)
        setCategory(result.categoryName);
        setShowCategoryDropdown(false);
        fetchSubCategoryData(result.categoryName);
    }

    const handleSubCategoryResultClick = (result) => {
        console.log('Selected Subcategory:', result.subCategoryName);
        setSubCategory(result.subCategoryName);
        setShowSubCategoryDropdown(false);
    }

    const handleCourseLevelInputChange = (value) => {
        setCourseLevel(value);
        filterCourseLevels(value);
    };

    const handleCourseLevelResultClick = (result) => {
        setCourseLevel(result.levelName);
        setShowCourseLevelDropdown(false);
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? The data will not be saved.")) {
            router.push("/course")
        }
    }

    const handleBasicDetails = () => {
        const basicDetailsData = {
            courseName,
            courseSubtitle,
            category,
            subCategory,
            courseTopic,
            courseLanguage,
            optionalLanguage,
            courseLevel,
            courseDuration,
        };
        onNext(basicDetailsData);
        console.log(basicDetailsData);
    }

    return (
        <div className="bg-[#f4f7fe] w-full min-h-full">
            <div className="addcourse-container">
                <div className="addcourse-top flex gap-6">
                    <h2 className='form-wizard-heading'><Image src="/Stack.svg" width={24} height={24} alt="Stack png icom" />Basic Details</h2>
                </div>
                <div className="addcourse-middle">
                    <form className='addcourse-form'>
                        <div className="course-text-field">
                            <label htmlFor="courseName">Course Title</label>
                            <input
                                type="text"
                                id="courseName"
                                name="courseName"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                placeholder="Your Course Title"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="course-text-field">
                            <label htmlFor="courseSubtitle">Course Subtitle</label>
                            <input
                                type="text"
                                id='courseSubtitle'
                                name='courseSubtitle'
                                value={courseSubtitle}
                                onChange={(e) => setCourseSubtitle(e.target.value)}
                                placeholder='Your Course Subtitle'
                                autoComplete='off'
                            />
                        </div>
                        <div className='course-text-field flex gap-6'>
                            <div className="course-category-search">
                                <Searchbar
                                    inputValue={category}
                                    onInputChange={setCategory}
                                    fetchData={fetchCategoryData}
                                    label='Course Category'
                                    id='courseCategory'
                                    name='courseCategory'
                                    placeholder='Type to Search Category'
                                    onBlur={handleCategorySearchBlur}
                                    onFocus={handleCategorySearchFocus}
                                />
                                {showCategoryDropdown && (
                                    <Searchlist
                                        result={categoryResults}
                                        inputValue={category}
                                        onClick={handleCategoryResultClick}
                                        displayProperty="categoryName"
                                    />
                                )}
                            </div>
                            <div className="course-sub-category-search">
                                <Searchbar
                                    inputValue={subCategory}
                                    onInputChange={setSubCategory}
                                    fetchData={fetchSubCategoryData}
                                    label='Course Sub-Category'
                                    id='courseSubcategory'
                                    name='courseSubcategory'
                                    placeholder='Type to Search sub-category'
                                    onBlur={handleSubCategorySearchBlur}
                                    onFocus={handleSubCategorySearchFocus}
                                />
                                {showSubCategoryDropdown && (
                                    <Searchlist
                                        result={subCategoryResults}
                                        inputValue={subCategory}
                                        onClick={handleSubCategoryResultClick}
                                        displayProperty="subCategoryName"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="course-text-field">
                            <label htmlFor="courseTopic">Course Topic</label>
                            <input
                                type='text'
                                id='courseTopic'
                                name='courseTopic'
                                value={courseTopic}
                                onChange={(e) => setCourseTopic(e.target.value)}
                                placeholder='What is primary taught in the course?'
                                autoComplete='off'
                            />
                        </div>
                        <div className="course-overview-wrapper w-full flex gap-6 justify-between">
                            <div className="course-text-field">
                                <label htmlFor="courseLanguage">Course Language</label>
                                <input
                                    type="text"
                                    id='courseLanguage'
                                    name='courseLanguage'
                                    value={courseLanguage}
                                    onChange={(e) => setCourseLanguage(e.target.value)}
                                    placeholder='Prefered Language'
                                    autoComplete='off'
                                />
                            </div>
                            <div className="course-text-field">
                                <label htmlFor="optionalLanguage">Optional Language</label>
                                <input type="text"
                                    name="optionalLanguage"
                                    id="optionalLanguage"
                                    value={optionalLanguage}
                                    onChange={(e) => setOptionalLanguage(e.target.value)}
                                    placeholder='optional Language'
                                    autoComplete='off'
                                />
                            </div>
                            <div className="course-text-field relative">
                                <Searchbar
                                    inputValue={courseLevel}
                                    onInputChange={handleCourseLevelInputChange}
                                    label='Course Level'
                                    id='courseLevel'
                                    name='courseLevel'
                                    placeholder='Beginner, Intermediate'
                                    onFocus={handleCourseLevelSearchFocus}
                                    onBlur={handleCourseLevelSearchBlur}
                                />
                                {showCourseLevelDropdown && (
                                    <Searchlist
                                        result={courseLevelResults}
                                        inputValue={courseLevel}
                                        onClick={handleCourseLevelResultClick}
                                        displayProperty="levelName"
                                    />
                                )}
                            </div>
                            <div className="course-text-field">
                                <label htmlFor="courseDuration">Course Duration</label>
                                <input
                                    type="text"
                                    id='courseDuration'
                                    name='courseDuration'
                                    value={courseDuration}
                                    onChange={(e) => setCourseDuration(e.target.value)}
                                    placeholder='Course Duration'
                                    autoComplete='off'
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="addcourse-bottom flex justify-between">
                    <button className='cancel-form-btn' onClick={handleCancel}>Cancel</button>
                    <button className='next-form-btn' onClick={handleBasicDetails}>Save & Next</button>
                </div>
            </div>
        </div>
    )
}

export default BasicDetails