import { useState } from "react";
import { FiSave, FiUser, FiLock, FiBell, FiGlobe } from "react-icons/fi";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: <FiUser /> },
    { id: "security", label: "Security", icon: <FiLock /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "general", label: "General", icon: <FiGlobe /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
        <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap
                transition-colors duration-200 border-b-2
                ${activeTab === tab.id 
                  ? 'border-orange-500 text-orange-500' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-3xl font-bold">
                  A
                </div>
                <div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300">
                    Change Photo
                  </button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" defaultValue="Admin User" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" defaultValue="admin@muniture.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" defaultValue="+123456789" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300 bg-white">
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>User</option>
                  </select>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
                <FiSave />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" placeholder="Enter current password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" placeholder="Enter new password" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" placeholder="Confirm new password" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300">
                  Enable
                </button>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
                <FiSave />
                Update Password
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Notification Preferences</h3>
                <div className="space-y-3">
                  {[
                    { label: "Email Notifications", desc: "Receive emails about orders and updates" },
                    { label: "Order Updates", desc: "Get notified when order status changes" },
                    { label: "Promotional Emails", desc: "Receive marketing and promotional emails" },
                    { label: "Push Notifications", desc: "Receive push notifications on your browser" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-50">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index % 2 === 0} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
                <FiSave />
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300" defaultValue="muniture" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300 bg-white">
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                    <option>FRW (Frw)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300 bg-white">
                    <option>English</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>

              <button className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
                <FiSave />
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;