const express = require("express");
const { uploadMedia } = require("../controllers/mediaController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerConfig");
const validateRequest = require("../middlewares/validateMiddleware");
const {
  validateUploadFileData,
} = require("../utils/validations/validateUploadFileData");

const mediaRouter = express.Router();

mediaRouter.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  validateRequest(validateUploadFileData),
  uploadMedia
);

module.exports = mediaRouter;
