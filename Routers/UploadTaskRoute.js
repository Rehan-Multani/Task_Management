const express = require("express");
const multer = require("multer"); // For handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { getpaginate, Getdata, Postdata, Putdata, DeleteData } =
  require('../Controllers/UploadTaskCtrl')
const router = express.Router();
const uploadSingleImageToCloudinary = require('../Middlewares/singleImgUpload')

router.get("/", getpaginate)
router.get("/:id", Getdata)
router.post("/", upload.single('descriptionFile'), uploadSingleImageToCloudinary, Postdata)
router.put("/:id", upload.single('descriptionFile'), uploadSingleImageToCloudinary, Putdata)
router.delete("/:id", DeleteData)

module.exports = router;
