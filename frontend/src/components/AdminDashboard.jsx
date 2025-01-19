import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [showImages, setShowImages] = useState({}); // Track which user's images to show

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Toggle images display
  const handleShowImages = (userId) => {
    setShowImages((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId], // Toggle visibility for this user's images
    }));
  };

  return (
    <div className="flex flex-col items-center text-center p-6 bg-gray-100 min-h-screen">
      <h2 className="font-bold text-3xl mb-6 text-indigo-700">Admin Dashboard</h2>
      <div className="border border-gray-600 rounded-lg p-6 bg-white shadow-lg w-full max-w-4xl">
        {users.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <table className="table-auto w-full text-gray-700">
            <thead className="bg-gray-200">
              <tr className="text-lg">
                <th className="px-6 py-2 text-left">Name</th>
                <th className="px-6 py-2 text-left">Social Media Handle</th>
                <th className="px-6 py-2 text-left">Images</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-lg">{user.name}</td>
                  <td className="px-6 py-4 font-semibold text-lg">{user.socialMediaHandle}</td>
                  <td className="px-6 py-4">
                    {/* Display the first image */}
                    <img
                      src={`http://localhost:3000/${user.images[0]}`}
                      alt="Uploaded"
                      className="w-40 h-40 object-cover mx-auto rounded-lg shadow-md"
                    />
                    {/* If there are more than one image, show the "More Images" button */}
                    {user.images.length > 1 && (
                      <button
                        onClick={() => handleShowImages(user._id)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        {showImages[user._id] ? "Hide Images" : "Show All Images"}
                      </button>
                    )}

                    {/* Show all images in a box if button clicked */}
                    {showImages[user._id] && (
                      <div className="mt-4 bg-gray-100 p-4 rounded-lg border border-gray-300">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {user.images.map((image, index) => (
                            <img
                              key={index}
                              src={`http://localhost:3000/${image}`}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg shadow-md"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
