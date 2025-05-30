const validateUploadFileData = (body) => {
  if (body.tags && typeof body.tags !== "string") {
    throw new Error("Tags should be a comma-separated string");
  }
};

module.exports = { validateUploadFileData };
