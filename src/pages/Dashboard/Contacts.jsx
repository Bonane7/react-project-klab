import { useState } from "react";
import { FiSearch, FiMail, FiPhone, FiMessageCircle, FiCheck, FiX } from "react-icons/fi";

function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", phone: "+123456789", subject: "Product Inquiry", message: "I would like to know more about...", status: "Unread" },
    { id: 2, name: "Mike Wilson", email: "mike@example.com", phone: "+987654321", subject: "Order Issue", message: "My order hasn't been delivered...", status: "Read" },
    { id: 3, name: "Emma Davis", email: "emma@example.com", phone: "+456789123", subject: "Partnership", message: "We are interested in collaborating...", status: "Unread" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Contacts</h2>
        <p className="text-gray-500 text-sm">Manage contact messages from customers</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
            Unread
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
            Read
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-bold text-lg flex-shrink-0">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FiMail className="text-xs" />
                    <span>{contact.email}</span>
                  </div>
                </div>
              </div>
              <span className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${contact.status === 'Unread' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}
              `}>
                {contact.status}
              </span>
            </div>

            <div className="mt-4">
              <h5 className="font-medium text-gray-700">{contact.subject}</h5>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{contact.message}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-green-50 rounded-lg text-green-500 transition-colors duration-200">
                  <FiCheck className="text-lg" />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors duration-200">
                  <FiX className="text-lg" />
                </button>
                <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200">
                  <FiMessageCircle className="text-lg" />
                </button>
              </div>
              <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Contacts;