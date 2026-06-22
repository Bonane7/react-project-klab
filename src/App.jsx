import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Dashboard/Products';
import Users from './pages/Dashboard/Users';
import Orders from './pages/Dashboard/Orders';
import Contacts from './pages/Dashboard/Contacts';
import Settings from './pages/Dashboard/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Import des pages User
import UserLayout from './pages/User/UserLayout';
import UserDashboard from './pages/User/UserDashboard';
import UserShop from './pages/User/UserShop';
import UserCategories from './pages/User/UserCategories';
import UserOrders from './pages/User/UserOrders';
import UserProfile from './pages/User/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTES PUBLIQUES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* ROUTES ADMIN DASHBOARD */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ROUTES USER LANDING */}
        <Route path="/user" element={
          <ProtectedRoute allowedRoles={["user", "admin"]}>
            <UserLayout />
          </ProtectedRoute>
        }>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="shop" element={
            <ErrorBoundary>
              <UserShop />
            </ErrorBoundary>
          } />
          <Route path="categories" element={<UserCategories />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="product/:id" element={<UserShop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;