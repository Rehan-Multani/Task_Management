const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
});

const uploadSingleImageToCloudinary = async (req, res, next) => {
    try {
        if (req.file) {
            const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
            const result = await cloudinary.uploader.upload(dataUrl);
            req.uploadedImageUrl = result.secure_url;
        }
        // If no file is uploaded, you can proceed without uploading to Cloudinary.
        next();
    } catch (error) {
        res.status(500).json({ message: "File was not uploaded in backend", error: error.message });
    }
};


module.exports = uploadSingleImageToCloudinary;