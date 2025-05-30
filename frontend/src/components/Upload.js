import React, { useState } from "react";
import { API_BASE_URL } from "../config/constants";
import Cookies from "js-cookie";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(selected);
  };

  const renderPreview = () => {
    if (!file || !previewUrl) return null;

    if (file.type.startsWith("image/")) {
      return (
        <img src={previewUrl} alt="preview" className="max-w-xs rounded-md" />
      );
    } else if (file.type.startsWith("video/")) {
      return (
        <video src={previewUrl} controls className="max-w-xs rounded-md" />
      );
    } else if (file.type.startsWith("audio/")) {
      return <audio src={previewUrl} controls className="w-full" />;
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={previewUrl}
          title="PDF Preview"
          className="w-full h-64 border rounded"
        />
      );
    } else {
      return (
        <p className="text-red-500">Preview not available for this file type</p>
      );
    }
  };

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file.");
    setIsUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", tags);

      const token = Cookies.get("jwt_token");

      const res = await fetch(`${API_BASE_URL}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.errorCode || "Upload failed");

      setMessage(data.message || "Upload successful!");
      setFile(null);
      setPreviewUrl(null);
      setTags("");
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Upload Multimedia File</h2>

      <input
        type="file"
        accept="image/*,video/*,audio/*,application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      {renderPreview()}

      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default Upload;
