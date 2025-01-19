import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
    images: [],
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("socialMediaHandle", formData.socialMediaHandle);
    Array.from(formData.images).forEach((file) => data.append("images", file));

    try {
      await axios.post("https://3-w-assignment-five.vercel.app/upload", data);
      alert("Form submitted successfully!");
    } catch {
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">User Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Media Handle
          </label>
          <input
            type="text"
            name="socialMediaHandle"
            value={formData.socialMediaHandle}
            onChange={handleInputChange}
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            className="mt-1 block w-full"
            multiple
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
