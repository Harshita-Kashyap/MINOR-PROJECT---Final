import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="font-semibold">RAC System</h1>

      <button
        onClick={handleLogout}
        className="text-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;