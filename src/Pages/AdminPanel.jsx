import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(()=>{
    fetchUnapprovedPosts();
  },[])

  const fetchUnapprovedPosts = async () => {
    try {
      const response = await api.get("/posts/unapprovedpost");
      setPosts(response.data.posts);
    } catch (error) {
      setError(error.response.data.message);
    }
  }
  
  const approveBlog = async (id) => {
    try {
      const response = await api.patch(`/posts/${id}/approve`);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success(response.data.message);
      navigate("/");
      
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  
  const rejectBlog = async (id) => {
    try {
      const response = await api.delete(`/posts/delete/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success(response.data.message);
      
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl text-center font-bold underline">Admin Panel</h1>
      {error && (
          <div className="bg-red-100 p-3 mb-4 text-red-600 rounded">
            {error}
          </div>
        )}
        <div className="absolute grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 cursor-pointer">
          {posts.map((blog)=>{
            return(
              <div
              key={blog._id}
              className="bg-white p-4 shadow rounded  relative border tranform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className=" font-bold">Author: {blog.user.name}</p>
              <p className="text-gray-500">{blog.description}</p>
              <div className="mt-4">
                   <button 
                   onClick={()=>approveBlog(blog._id)}
                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                   >Approve</button>
                   <button
                   onClick={()=>rejectBlog(blog._id)}
                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                   >
                    Reject
                   </button>
              </div>
            </div>
            )
          })}
        </div>
    </div>
  );
};

export default AdminPanel;
