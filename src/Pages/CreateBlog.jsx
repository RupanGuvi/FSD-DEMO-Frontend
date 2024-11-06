import React, { useState } from "react";
import api from "../Services/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setError("All fields are required");
      return;
    }

    const updatedDescription = description.replace(/<\/?p>/g, "");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", updatedDescription);
    if (image) formData.append("image", image);
    try {
      const response = await api.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // set the content type to multipart/form-data for uploading images /files
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setTitle("");
    setDescription("");
    setImage(null);
 
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create A New Blog
        </h2>
        {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <p>
          <label htmlFor="title" className="block mb-2 font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter the Your Blog Title"
            className="border w-full p-2 mb-4 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </p>
       
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
          />
       
        <p>
          <label htmlFor="image" className="block mb-2 font-bold">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            placeholder="Upload Your Blog Image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </p>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
