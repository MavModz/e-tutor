import { commonrequest } from "./apiCalls";
import { backend_url } from "./helper";

// ALL USER AND ADMIN LOGIN
export const loginfunction = async (email, password) => {
    try {
        const response = await commonrequest("POST", `${backend_url}/admin/login`, { email: email, password: password }, null, null, false);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// USER REGISTER
export const registerfunction = async (name, phone, email, password, birth, gender) => {
    try {
        const response = await commonrequest("POST", `${backend_url}/user/register`, { name: name, phone: phone, email: email, birth: birth, gender: gender, password: password }, null, null, false);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

//ADMIN CHART DATA
export const adminchartfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/total-enrollments`, null, null, false);
        console.log(response);
        return response.data;
    }

    catch (error) {
        throw error;
    }
}

//USER COURSE ENROLLMENT CHART DATA
export const userchartfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/total-courses`);
        console.log(response);
        return response.data;
    }

    catch (error) {
        throw error;
    }
}

// ADD NEW COURSE
export const addcoursefunction = async (formattedData) => {
    console.log('api data in api.js', formattedData);
    try {
        const response = await commonrequest("POST", `${backend_url}/admin/add-course`, formattedData);
        console.log(response);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// CATEGORIES FOR COURSES

export const allcategoriesfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/all-categories`, null, null, false)
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// SUB-CATEGORIES FOR COURSES

export const allsubcategoriesfunction = async (categoryName) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/all-subcategories/${categoryName}`, null, null, false)
        return response.data;
    }
    catch (error) {

    }
}

// INSTRUCTUTORS DATA

export const courseinstructorsfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/course-instructors`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}


// LISTING OF ALL COURSES
export const allcoursesfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/all-courses`, null, null, false)
        return response.data;
    }
    catch (error) {
        throw error;
    }
}


// COURSE DETAILS

export const coursedetailsfunction = async (courseId) => {
    try{
        const response = await commonrequest("GET", `${backend_url}/user/course-details/${courseId}`, null, null, false);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// COURSE IN CATEGORIES COUNT

export const coursecategorycountfunction = async (courseCategory) => {
    try {
     const response = await commonrequest("GET", `${backend_url}/user/total-courses-in-category/${courseCategory}`, null, null, false);
     return response.data;    
    }
    catch(error) {
        throw error;
    }
}