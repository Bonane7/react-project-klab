import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

function UserCategories() {
  const categories = [
    { name: "Living Room", icon: "🛋️", count: 45, description: "Sofas, chairs, tables" },
    { name: "Bedroom", icon: "🛏️", count: 38, description: "Beds, wardrobes, nightstands" },
    { name: "Kitchen", icon: "🍳", count: 52, description: "Tables, chairs, storage" },
    { name: "Outdoor", icon: "🌿", count: 27, description: "Garden, patio, balcony" },
    { name: "Office", icon: "💼", count: 33, description: "Desks, chairs, shelves" },
    { name: "Lighting", icon: "💡", count: 29, description: "Lamps, chandeliers" },
    { name: "Decor", icon: "🎨", count: 41, description: "Vases, mirrors, art" },
    { name: "Storage", icon: "📦", count: 19, description: "Cabinets, shelves" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shop by Category</h1>
        <p className="text-gray-500 mt-1">Explore our wide range of furniture categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <Link 
            key={index} 
            to={`/user/categories/${cat.name.toLowerCase().replace(' ', '-')}`}
            className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="text-4xl mb-3">{cat.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-500 transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
            <p className="text-sm text-orange-500 font-medium mt-3">
              {cat.count} products <FiArrowRight className="inline ml-1" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserCategories;