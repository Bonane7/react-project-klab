import { useState, useEffect, useRef } from "react";
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiImage, FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
import axios from "axios";

// Configurable via .env (Vite). Falls back to localhost for dev.
const BASE_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api_v1/product`;

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
}

const emptyForm = {
  productName: "",
  productPrice: "",
  productCategory: "",
  productDescription: "",
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const fileInputRef = useRef(null);
  // Track object URLs so we can revoke them and avoid memory leaks.
  const objectUrlRef = useRef(null);

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Revoke any pending object URL on unmount.
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const setPreviewFromFile = (file) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setImagePreview(url);
  };

  const clearPreview = (fallback = null) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setImagePreview(fallback);
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getProducts`, {
        headers: getAuthHeaders(),
      });
      // Normalize: the API may return an array directly, or wrap it in
      // { products: [...] } / { data: [...] }. Always store an array.
      const payload = res.data;
      const list = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.products)
        ? payload.products
        : Array.isArray(payload?.data)
        ? payload.data
        : [];
      setProducts(list);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load products.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open Create Modal
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setFormData(emptyForm);
    setImageFile(null);
    clearPreview();
    setFormError("");
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      productName: product.productName || "",
      productPrice: product.productPrice || "",
      productCategory: product.productCategory || "",
      productDescription: product.productDescription || "",
    });
    setImageFile(null);
    clearPreview(product.imageUrl || null);
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData(emptyForm);
    setImageFile(null);
    clearPreview();
    setFormError("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setFormError("Invalid image type. Use PNG, JPG or WEBP.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setFormError("Image is too large. Maximum size is 5MB.");
      e.target.value = "";
      return;
    }

    setFormError("");
    setImageFile(file);
    setPreviewFromFile(file);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildFormData = () => {
    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productPrice", formData.productPrice);
    data.append("productCategory", formData.productCategory);
    data.append("productDescription", formData.productDescription);
    if (imageFile) data.append("image", imageFile);
    return data;
  };

  // Create or update product (shared handler)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.productName || !formData.productPrice || !formData.productCategory || !formData.productDescription) {
      setFormError("Please fill in all required fields.");
      return;
    }
    if (Number.isNaN(Number(formData.productPrice)) || Number(formData.productPrice) < 0) {
      setFormError("Please enter a valid price.");
      return;
    }

    setFormLoading(true);
    try {
      const data = buildFormData();
      if (modalMode === "create") {
        await axios.post(`${BASE_URL}/create`, data, {
          headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
        });
        showToast("Product created successfully!");
      } else {
        await axios.put(`${BASE_URL}/updateProduct/${selectedProduct._id}`, data, {
          headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
        });
        showToast("Product updated successfully!");
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      setFormError(
        err.response?.data?.message ||
          `Failed to ${modalMode === "create" ? "create" : "update"} product.`
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Trigger delete confirmation
  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  // Execute delete
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${BASE_URL}/deleteProduct/${productToDelete._id}`, {
        headers: getAuthHeaders(),
      });
      showToast("Product deleted successfully!");
      setShowDeleteConfirm(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete product.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Derive unique categories for the filter
  const categories = ["All", ...new Set(products.map((p) => p.productCategory).filter(Boolean))];

  // Reset the category filter if its category no longer exists.
  useEffect(() => {
    if (categoryFilter !== "All" && !categories.includes(categoryFilter)) {
      setCategoryFilter("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  // Filter products by search + category
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = categoryFilter === "All" || p.productCategory === categoryFilter;
    return matchSearch && matchCat;
  });

  const formatPrice = (value) => {
    const n = Number(value);
    return Number.isNaN(n) ? "—" : `$${n.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[99999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-[fadeIn_.3s_ease] ${toast.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
          {toast.type === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <p className="text-gray-500 text-sm">Manage your product inventory</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 font-medium"
        >
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
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <FiLoader className="animate-spin text-xl" />
            <span className="text-sm font-medium">Loading products...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
            <FiImage className="text-4xl" />
            <p className="text-sm font-medium">No products found</p>
            <button
              onClick={openCreateModal}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.productName}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FiImage className="text-orange-300 text-xl" />
                          </div>
                        )}
                        <span className="font-medium text-sm text-gray-800">{product.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
                        {product.productCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-800">
                      {formatPrice(product.productPrice)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <p className="truncate">{product.productDescription}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => confirmDelete(product)}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors duration-200"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* COUNT */}
      {!loading && filteredProducts.length > 0 && (
        <p className="text-sm text-gray-400 text-right">
          Showing <span className="font-semibold text-gray-600">{filteredProducts.length}</span> of <span className="font-semibold text-gray-600">{products.length}</span> products
        </p>
      )}

      {/* ===== ADD / EDIT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_.2s_ease]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">
                {modalMode === "create" ? "Add New Product" : "Edit Product"}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <FiX className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 px-6 py-4">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                  <FiAlertCircle className="flex-shrink-0" />
                  {formError}
                </div>
              )}

              <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Product Image</label>
                  <div
                    className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-orange-400 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <div className="flex items-center gap-4">
                        <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{imageFile ? imageFile.name : "Current image"}</p>
                          <p className="text-xs text-gray-400 mt-1">Click to change image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4 gap-2 text-gray-400">
                        <FiImage className="text-3xl" />
                        <p className="text-sm">Click to upload product image</p>
                        <p className="text-xs">PNG, JPG, WEBP up to 5MB</p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleFormChange}
                    placeholder="e.g. Ana Gray Dining Chair"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
                  />
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Price ($) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleFormChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleFormChange}
                      placeholder="e.g. Chairs"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleFormChange}
                    placeholder="Describe the product..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                form="productForm"
                type="submit"
                disabled={formLoading}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2 ${formLoading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg shadow-orange-500/30"}`}
              >
                {formLoading && <FiLoader className="animate-spin" />}
                {modalMode === "create" ? "Create Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_.2s_ease]">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <FiTrash2 className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Delete Product</h3>
            </div>
            <p className="text-sm text-gray-500 mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-5">
              "{productToDelete.productName}"?
            </p>
            <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowDeleteConfirm(false); setProductToDelete(null); }}
                className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all ${deleteLoading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
              >
                {deleteLoading && <FiLoader className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;








// import { useState, useEffect, useRef } from "react";
// import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiImage, FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api_v1/product";

// function getAuthHeaders() {
//   const token = localStorage.getItem("token");
//   return { Authorization: `Bearer ${token}` };
// }

// const emptyForm = {
//   productName: "",
//   productPrice: "",
//   productCategory: "",
//   productDescription: "",
// };

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("All");

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState("create"); // "create" | "edit"
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState(emptyForm);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [formError, setFormError] = useState("");
//   const [formSuccess, setFormSuccess] = useState("");
//   const fileInputRef = useRef(null);

//   // Delete confirmation state
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // Toast notification
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 3500);
//   };

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/getProducts`, {
//         headers: getAuthHeaders(),
//       });
//       setProducts(res.data.products || res.data || []);
//     } catch (err) {
//       showToast(err.response?.data?.message || "Failed to load products.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Open Create Modal
//   const openCreateModal = () => {
//     setModalMode("create");
//     setFormData(emptyForm);
//     setImageFile(null);
//     setImagePreview(null);
//     setFormError("");
//     setFormSuccess("");
//     setShowModal(true);
//   };

//   // Open Edit Modal
//   const openEditModal = (product) => {
//     setModalMode("edit");
//     setSelectedProduct(product);
//     setFormData({
//       productName: product.productName || "",
//       productPrice: product.productPrice || "",
//       productCategory: product.productCategory || "",
//       productDescription: product.productDescription || "",
//     });
//     setImageFile(null);
//     setImagePreview(product.imageUrl || null);
//     setFormError("");
//     setFormSuccess("");
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProduct(null);
//     setFormData(emptyForm);
//     setImageFile(null);
//     setImagePreview(null);
//     setFormError("");
//     setFormSuccess("");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Create product
//   const handleCreate = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     if (!formData.productName || !formData.productPrice || !formData.productCategory || !formData.productDescription) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }
//     setFormLoading(true);
//     try {
//       const data = new FormData();
//       data.append("productName", formData.productName);
//       data.append("productPrice", formData.productPrice);
//       data.append("productCategory", formData.productCategory);
//       data.append("productDescription", formData.productDescription);
//       if (imageFile) data.append("image", imageFile);

//       await axios.post(`${BASE_URL}/create`, data, {
//         headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
//       });
//       showToast("Product created successfully!");
//       closeModal();
//       fetchProducts();
//     } catch (err) {
//       setFormError(err.response?.data?.message || "Failed to create product.");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Update product
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setFormError("");
//     if (!formData.productName || !formData.productPrice || !formData.productCategory || !formData.productDescription) {
//       setFormError("Please fill in all required fields.");
//       return;
//     }
//     setFormLoading(true);
//     try {
//       const data = new FormData();
//       data.append("productName", formData.productName);
//       data.append("productPrice", formData.productPrice);
//       data.append("productCategory", formData.productCategory);
//       data.append("productDescription", formData.productDescription);
//       if (imageFile) data.append("image", imageFile);

//       await axios.put(`${BASE_URL}/updateProduct/${selectedProduct._id}`, data, {
//         headers: { ...getAuthHeaders(), "Content-Type": "multipart/form-data" },
//       });
//       showToast("Product updated successfully!");
//       closeModal();
//       fetchProducts();
//     } catch (err) {
//       setFormError(err.response?.data?.message || "Failed to update product.");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // Trigger delete confirmation
//   const confirmDelete = (product) => {
//     setProductToDelete(product);
//     setShowDeleteConfirm(true);
//   };

//   // Execute delete
//   const handleDelete = async () => {
//     setDeleteLoading(true);
//     try {
//       await axios.delete(`${BASE_URL}/deleteProduct/${productToDelete._id}`, {
//         headers: getAuthHeaders(),
//       });
//       showToast("Product deleted successfully!");
//       setShowDeleteConfirm(false);
//       setProductToDelete(null);
//       fetchProducts();
//     } catch (err) {
//       showToast(err.response?.data?.message || "Failed to delete product.", "error");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   // Derive unique categories for the filter
//   const categories = ["All", ...new Set(products.map((p) => p.productCategory).filter(Boolean))];

//   // Filter products by search + category
//   const filteredProducts = products.filter((p) => {
//     const matchSearch = p.productName?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchCat = categoryFilter === "All" || p.productCategory === categoryFilter;
//     return matchSearch && matchCat;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Toast */}
//       {toast && (
//         <div className={`fixed top-5 right-5 z-[99999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium animate-[fadeIn_.3s_ease] ${toast.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
//           {toast.type === "error" ? <FiAlertCircle /> : <FiCheckCircle />}
//           {toast.message}
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">Products</h2>
//           <p className="text-gray-500 text-sm">Manage your product inventory</p>
//         </div>
//         <button
//           onClick={openCreateModal}
//           className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 font-medium"
//         >
//           <FiPlus />
//           Add Product
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <select
//           className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
//           value={categoryFilter}
//           onChange={(e) => setCategoryFilter(e.target.value)}
//         >
//           {categories.map((cat) => (
//             <option key={cat}>{cat}</option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         {loading ? (
//           <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
//             <FiLoader className="animate-spin text-xl" />
//             <span className="text-sm font-medium">Loading products...</span>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
//             <FiImage className="text-4xl" />
//             <p className="text-sm font-medium">No products found</p>
//             <button
//               onClick={openCreateModal}
//               className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition-colors"
//             >
//               Add your first product
//             </button>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Description</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {filteredProducts.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         {product.imageUrl ? (
//                           <img
//                             src={product.imageUrl}
//                             alt={product.productName}
//                             className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
//                           />
//                         ) : (
//                           <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
//                             <FiImage className="text-orange-300 text-xl" />
//                           </div>
//                         )}
//                         <span className="font-medium text-sm text-gray-800">{product.productName}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span className="px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full">
//                         {product.productCategory}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-bold text-gray-800">
//                       ${Number(product.productPrice).toFixed(2)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
//                       <p className="truncate">{product.productDescription}</p>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <button
//                           onClick={() => openEditModal(product)}
//                           className="p-2 hover:bg-orange-50 rounded-lg text-orange-500 transition-colors duration-200"
//                           title="Edit"
//                         >
//                           <FiEdit2 />
//                         </button>
//                         <button
//                           onClick={() => confirmDelete(product)}
//                           className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition-colors duration-200"
//                           title="Delete"
//                         >
//                           <FiTrash2 />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* COUNT */}
//       {!loading && filteredProducts.length > 0 && (
//         <p className="text-sm text-gray-400 text-right">
//           Showing <span className="font-semibold text-gray-600">{filteredProducts.length}</span> of <span className="font-semibold text-gray-600">{products.length}</span> products
//         </p>
//       )}

//       {/* ===== ADD / EDIT MODAL ===== */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_.2s_ease]">
//           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] flex flex-col">
//             {/* Modal Header */}
//             <div className="flex items-center justify-between px-6 py-4 border-b">
//               <h3 className="text-lg font-bold text-gray-800">
//                 {modalMode === "create" ? "Add New Product" : "Edit Product"}
//               </h3>
//               <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                 <FiX className="text-gray-500" />
//               </button>
//             </div>

//             {/* Modal Body */}
//             <div className="overflow-y-auto flex-1 px-6 py-4">
//               {formError && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
//                   <FiAlertCircle className="flex-shrink-0" />
//                   {formError}
//                 </div>
//               )}

//               <form id="productForm" onSubmit={modalMode === "create" ? handleCreate : handleUpdate} className="space-y-4">
//                 {/* Image Upload */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Product Image</label>
//                   <div
//                     className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-orange-400 transition-colors cursor-pointer"
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     {imagePreview ? (
//                       <div className="flex items-center gap-4">
//                         <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
//                         <div>
//                           <p className="text-sm font-medium text-gray-700">{imageFile ? imageFile.name : "Current image"}</p>
//                           <p className="text-xs text-gray-400 mt-1">Click to change image</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="flex flex-col items-center py-4 gap-2 text-gray-400">
//                         <FiImage className="text-3xl" />
//                         <p className="text-sm">Click to upload product image</p>
//                         <p className="text-xs">PNG, JPG, WEBP up to 5MB</p>
//                       </div>
//                     )}
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                       onChange={handleImageChange}
//                     />
//                   </div>
//                 </div>

//                 {/* Product Name */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                     Product Name <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="productName"
//                     value={formData.productName}
//                     onChange={handleFormChange}
//                     placeholder="e.g. Ana Gray Dining Chair"
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
//                   />
//                 </div>

//                 {/* Price & Category */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                       Price ($) <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="productPrice"
//                       value={formData.productPrice}
//                       onChange={handleFormChange}
//                       placeholder="0.00"
//                       min="0"
//                       step="0.01"
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                       Category <span className="text-red-400">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="productCategory"
//                       value={formData.productCategory}
//                       onChange={handleFormChange}
//                       placeholder="e.g. Chairs"
//                       className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div>
//                   <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
//                     Description <span className="text-red-400">*</span>
//                   </label>
//                   <textarea
//                     name="productDescription"
//                     value={formData.productDescription}
//                     onChange={handleFormChange}
//                     placeholder="Describe the product..."
//                     rows={3}
//                     className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm resize-none"
//                   />
//                 </div>
//               </form>
//             </div>

//             {/* Modal Footer */}
//             <div className="flex justify-end gap-3 px-6 py-4 border-t">
//               <button
//                 onClick={closeModal}
//                 className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 form="productForm"
//                 type="submit"
//                 disabled={formLoading}
//                 className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all flex items-center gap-2 ${formLoading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg shadow-orange-500/30"}`}
//               >
//                 {formLoading && <FiLoader className="animate-spin" />}
//                 {modalMode === "create" ? "Create Product" : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== DELETE CONFIRMATION MODAL ===== */}
//       {showDeleteConfirm && productToDelete && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 animate-[fadeIn_.2s_ease]">
//           <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
//             <div className="flex items-center gap-3 mb-3">
//               <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
//                 <FiTrash2 className="text-red-500" />
//               </div>
//               <h3 className="text-lg font-bold text-gray-900">Delete Product</h3>
//             </div>
//             <p className="text-sm text-gray-500 mb-1">
//               Are you sure you want to delete
//             </p>
//             <p className="text-sm font-semibold text-gray-800 mb-5">
//               "{productToDelete.productName}"?
//             </p>
//             <p className="text-xs text-gray-400 mb-6">This action cannot be undone.</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => { setShowDeleteConfirm(false); setProductToDelete(null); }}
//                 className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleteLoading}
//                 className={`px-4 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2 transition-all ${deleteLoading ? "bg-red-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
//               >
//                 {deleteLoading && <FiLoader className="animate-spin" />}
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Products;