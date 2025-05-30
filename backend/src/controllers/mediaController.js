const cloudinary = require("../config/cloudinary");
const Media = require("../models/Media");
const errorResponse = require("../utils/errorResponse");
const streamifier = require("streamifier");

const uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    const tags = req.body.tags?.split(",") || [];

    if (!file) {
      return errorResponse(res, 400, "NO_FILE", "No file uploaded");
    }

    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "uploads",
            tags,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result = await streamUpload(file.buffer);

    const newMedia = new Media({
      originalFileName: file.originalname,
      secureUrl: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
      tags,
      uploadedBy: req.user._id,
    });

    await newMedia.save();

    res.status(201).json({
      message: "File uploaded successfully",
      media: newMedia,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return errorResponse(res, 500, "FILE_UPLOAD_FAILED", error.message);
  }
};

module.exports = { uploadMedia };
