const express = require("express");
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
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

router.post("/admin/register", adminControllers.adminregister);
router.post("/admin/login", adminControllers.adminlogin);
router.post("/admin/add-course", adminAuth, adminControllers.addCourse);
router.get("/admin/total-enrollments", adminControllers.totalenrollments);

router.post("/user/register", userControllers.userregister);
router.post("/user/checkout", userAuth, userControllers.checkout);
router.post("/user/enroll", userAuth, userControllers.enrollCourse);
router.get("/user/total-courses", userAuth, userControllers.totalenrolledcourses);
router.get("/user/all-courses", userControllers.allcourses);
router.get("/user/all-categories", userControllers.allcategories);
router.get("/user/all-subcategories/:categoryName", userControllers.allsubcategories);
router.get("/user/course-details/:courseId", userControllers.coursedetails);
module.exports = router;