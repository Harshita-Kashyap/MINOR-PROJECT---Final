import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  let user = null;

  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  // Not logged in
  if (!user || !user.role) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Logged in but wrong role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    if (user.role === "applicant") return <Navigate to="/applicant" replace />;
    if (user.role === "selector") return <Navigate to="/selector" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;