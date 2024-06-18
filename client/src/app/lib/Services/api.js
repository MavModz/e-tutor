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

// TOP INSTRUCTORS OF THE MONTH

export const topinstructorsfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/superadmin/instructor-list`, null, null, false);
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

// FILTER COURSE

export const filtercoursesfunction = async (courseName) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/filter-courses/${courseName}`, null, null, false)
        return response.data;
    }
    catch (error) {
        throw error;
    }
}


// COURSE DETAILS

export const coursedetailsfunction = async (courseId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/course-details/${courseId}`, null, null, false);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// SPECIFIC ADMIN COURSES

export const admincoursefunction = async (userId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/my-courses/${userId}`);
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
    catch (error) {
        throw error;
    }
}

// CLOUD STORAGE INFORMATION

export const cloudstoragefunction = async (userId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/cloud-storage/${userId}`);
        return response.data;
    }
    catch (error) {
        throw error
    }
}

// UPDATING USED SPACE

export const updateusedspacefunction = async (adminId, fileSize) => {
    try {
        const response = await commonrequest("POST", `${backend_url}/admin/update-usedspace/`, { adminId, fileSize });
        return response.data;
    }
    catch (error) {
        throw error
    }
}

// PROFILE VIEWS

export const profileviewfunction = async (userId) => {
    try {
        const respose = await commonrequest("GET", `${backend_url}/admin/profile-views/${userId}`);
        return respose.data;
    }
    catch (error) {
        throw error;
    }
}

// OVERALL COURSE RATING

export const overallcourseratingfunction = async (userId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/overall-course-rating/${userId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// WEEKLY COURSE RATING

export const weeklycourseratingfunction = async (userId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/weekly-overall-rating/${userId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// COURSE COMMENTS

export const coursecommentfunction = async (courseId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/user/course-comments/${courseId}`);
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

// LIST OF USERS ENROLLED WITH SPECIFIC ADMIN

export const enrolleduserlistfunction = async () => {
    try {
        const response = await commonrequest("GET", `${backend_url}/admin/user-list/`);
        return response.data;
    }
    catch(error) {
        throw error;
    }
}


// SEND THE MESSAGE

export const sendmessagefunction = async (senderId, receiverId, senderModel, receiverModel, message) => {
    try {
        const response = await commonrequest("POST", `${backend_url}/chat-message/send`, {senderId, receiverId, senderModel, receiverModel, message}, null, null, false);
        return response.data;
    }
    catch(error) {
        throw error;
    }
}

// RECEIVE THE MESSAGE

export const receivemessagefunction = async (senderId, receiverId) => {
    try {
        const response = await commonrequest("GET", `${backend_url}/chat-message/receive/${senderId}/${receiverId}`, null, null, false);
        return response.data;
    }
    catch(error) {
        throw error;
    }
}