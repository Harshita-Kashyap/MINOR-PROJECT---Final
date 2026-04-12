import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (loginId, password, role) => {
    if (!loginId || !password) return false;

    let type = "email";

    if (/^\d{10}$/.test(loginId)) {
      type = "phone";
    } else if (!loginId.includes("@")) {
      type = "roll";
    }

    const fakeUser = {
      loginId,
      type,
      role,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);

    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, login, logout };
}