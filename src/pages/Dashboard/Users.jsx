import { FiSearch, FiEdit2, FiTrash2, FiMail, FiPhone } from "react-icons/fi";

function Users() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+123456789", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+987654321", role: "User", status: "Active" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "+456789123", role: "User", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Users</h2>
          <p className="text-gray-500 text-sm">Manage your users and their permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
          <FiMail className="text-xl" />
          Invite User
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-xl flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200">
                  <FiEdit2 className="text-sm" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors duration-200">
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiMail className="text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FiPhone className="text-gray-400" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}
                `}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;