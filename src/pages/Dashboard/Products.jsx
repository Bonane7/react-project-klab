import { useState } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiEye } from "react-icons/fi";

function Products() {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    { id: 1, name: "Ana Gray Dining Chair", category: "Chairs", price: "$299.99", stock: 45, status: "In Stock" },
    { id: 2, name: "Axis 2-Piece Sectional Sofa", category: "Sofas", price: "$339.99", stock: 12, status: "In Stock" },
    { id: 3, name: "Curved Back Dining Chair", category: "Chairs", price: "$199.99", stock: 0, status: "Out of Stock" },
    { id: 4, name: "Natural Wood Dining Chair", category: "Chairs", price: "$300.00", stock: 28, status: "In Stock" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-500 text-sm">Manage your product inventory</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-lg shadow-orange-500/30">
          <FiPlus />
          Add Product
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300 bg-white">
          <option>All Categories</option>
          <option>Chairs</option>
          <option>Sofas</option>
          <option>Tables</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <span className="font-medium text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{product.price}</td>
                  <td className="px-6 py-4 text-sm">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${product.status === 'In Stock' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
                    `}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors duration-200">
                        <FiEye />
                      </button>
                      <button className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200">
                        <FiEdit2 />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors duration-200">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;