import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/layout';
import Home from './pages/home';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Products from './pages/Dashboard/Products';
import Users from './pages/Dashboard/Users';
import Orders from './pages/Dashboard/Orders';
import Contacts from './pages/Dashboard/Contacts';
import Settings from './pages/Dashboard/Settings';
import UserLanding from './pages/Dashboard/UserLanding';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROUTES PUBLIQUES - AVEC LE LAYOUT PUBLIC */}
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
            <Outlet />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<UserLanding />} />
          <Route path="shop" element={<UserLanding />} />
          <Route path="categories" element={<UserLanding />} />
          <Route path="orders" element={<UserLanding />} />
          <Route path="profile" element={<UserLanding />} />
          <Route path="product/:id" element={<UserLanding />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
// import { BrowserRouter,Routes, Route } from "react-router-dom";

// import AdminLayout from "./components/adminLayout";
// import Students from "./pages/Students";
// import Teachers from "./pages/Teachers";
// import Settings from "./pages/Settings";

// export default function App() {
//   return (
//     <>
//     <BrowserRouter>
//     <Routes>

//       {/* Parent */}
//       <Route path="/admin" element={<AdminLayout />}>

//         {/* Enfants */}
//         <Route path="students" element={<Students />} />
//         <Route path="teachers" element={<Teachers />} />
//         <Route path="settings" element={<Settings />} />

//       </Route>

//     </Routes>
//     </BrowserRouter>
//     </>
//   );
// }