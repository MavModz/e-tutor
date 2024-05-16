const express = require("express");
const router = express.Router();
const eitherAuth = require("../middleware/eitherAuth");
const instituteAdminAuth = require('../middleware/instituteAdminAuth');
const userAuth = require("../middleware/userAuth");
const userControllers = require("../controllers/userController");
const adminControllers = require("../controllers/adminController");
const superAdminControllers = require("../controllers/superAdminController");
const instituteAdminControllers = require("../controllers/instituteController");

//Routes
router.post("/superadmin/add-category", superAdminControllers.addCategory);
router.post("/superadmin/add-subcategory", superAdminControllers.addSubCategory);
router.get("/superadmin/instructor-list", superAdminControllers.allinstructors);

router.post("/institute/register", instituteAdminControllers.instituteadminregister);
router.post("/institute/admin/register", instituteAdminAuth, instituteAdminControllers.subadminregister);

router.post("/admin/register", adminControllers.adminregister);
router.post("/admin/login", adminControllers.adminlogin);
router.post("/admin/add-course", eitherAuth, adminControllers.addCourse);
router.get("/admin/total-enrollments", adminControllers.totalenrollments);
router.get("/admin/course-instructors", eitherAuth, adminControllers.courseinstructors);
router.get("/admin/cloud-storage/:userId", eitherAuth, adminControllers.cloudstorage);
router.post("/admin/update-usedspace", eitherAuth, adminControllers.usedSpace);
router.get("/admin/profile-views/:userId", eitherAuth, adminControllers.profileViews);

router.post("/user/register", userControllers.userregister);
router.post("/user/checkout", userAuth, userControllers.checkout);
router.post("/user/enroll", userAuth, userControllers.enrollCourse);
router.get("/user/total-courses", userAuth, userControllers.totalenrolledcourses);
router.get("/user/all-courses", userControllers.allcourses);
router.get("/user/all-categories", userControllers.allcategories);
router.get("/user/all-subcategories/:categoryName", userControllers.allsubcategories);
router.get("/user/total-courses-in-category/:courseCategory", userControllers.coursecategorycount);
router.get("/user/course-details/:courseId", userControllers.coursedetails);
router.post("/user/profile-click", userControllers.profileclick);
module.exports = router;