import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  let user = null;

  try {
    const stored = localStorage.getItem("user");
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (user?.role === "applicant") {
    return <Navigate to="/applicant/dashboard" replace />;
  }

  if (user?.role === "selector") {
    return <Navigate to="/selector" replace />;
  }

  return <Outlet />;
}

export default PublicRoute;

// import { Navigate, Outlet } from "react-router-dom";

// function PublicRoute() {
//   let user = null;

//   try {
//     const stored = localStorage.getItem("user");
//     user = stored ? JSON.parse(stored) : null;
//   } catch {
//     user = null;
//   }

//   if (user?.role === "admin") {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   if (user?.role === "applicant") {
//     return <Navigate to="/applicant/dashboard" replace />;
//   }

//   if (user?.role === "selector") {
//     return <Navigate to="/selector/dashboard" replace />;
//   }

//   return <Outlet />;
// }

// export default PublicRoute;