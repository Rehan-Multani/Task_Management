const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  getsuperadmin,
  createsuperadmin,
  createadmin,
  createuser,
  getbyid,
  getadmin,
  getuser,
  loginAdmin,
  updateAdminPassword,
  updateUserPassword,
} = require("../Controllers/SuperAdminCtrl");
const  uploadSingleImageToCloudinary  = require('../Middlewares/singleImgUpload')

const router = express.Router();

// get hospital doctor  staff  patient
router.get("/admin", getadmin);
router.get("/user", getuser);
router.get("/superadmin", getsuperadmin);

router.get("/profile/:id", getbyid);

router.post("/superadmin", createsuperadmin);
router.post("/user", createuser);
router.post("/admin", upload.single('image'),uploadSingleImageToCloudinary, createadmin);

// login
router.post("/login", loginAdmin);

// router.put("/doctorpassword/:id", adminMiddleware, updateAdminPassword);
// router.put("/patientpassword/:id", UserMiddleware, updateUserPassword);

module.exports = router;
