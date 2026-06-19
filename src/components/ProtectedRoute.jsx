import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  
  if (!token || !userJson) {
    // User is not logged in
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(userJson);
    
    // Check if the user has an allowed role
    if (allowedRoles && !allowedRoles.includes(user.userRole)) {
      // Redirect to correct dashboard based on role
      if (user.userRole === "admin") {
        return <Navigate to="/dashboard" replace />;
      } else {
        return <Navigate to="/user/dashboard" replace />;
      }
    }
  } catch (error) {
    // If JSON parsing fails, clear bad data and redirect
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
