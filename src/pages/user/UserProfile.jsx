import { useState, useEffect } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave } from "react-icons/fi";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    try {
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const parsed = JSON.parse(userJson);
        setUser(parsed);
        setFormData({
          firstName: parsed.FirstName || "",
          lastName: parsed.LastName || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
        });
      }
    } catch (e) {
      console.error("Error parsing user:", e);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          {isEditing ? <FiSave /> : <FiEdit2 />}
          {isEditing ? "Save" : "Edit Profile"}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                rows="2"
                className={`w-full px-4 py-2 border border-gray-200 rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"} focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;