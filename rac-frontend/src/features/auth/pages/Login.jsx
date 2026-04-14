import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Captcha from "../../../components/ui/Captcha";

import IdentityFields from "../../../components/common/IdentityFields";
import AuthSection from "../../../components/common/AuthSection";

import { validateLogin } from "../validation";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("mobile");

  const [form, setForm] = useState({
    mobile: "",
    email: "",
    dob: "",
    roll: "",
    year: "",
    password: "",
    captcha: "",
  });

  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(form, captchaText, loginType);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    let loginId = "";
    if (loginType === "mobile") loginId = form.mobile;
    else if (loginType === "email") loginId = form.email;
    else loginId = form.roll;

    try {
      // ✅ FIXED API URL
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId,
          password: form.password,
          loginType,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("✅ Login Success:", data);

        // ✅ STORE USER
        localStorage.setItem("user", JSON.stringify(data.user));

        const role = data.user.role;

        // ✅ ROLE BASED REDIRECT
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "selector") {
          navigate("/selector");
        } else {
          navigate("/applicant");
        }
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert("Server error. Please check backend.");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>

        {/* LOGIN TYPE */}
        <AuthSection title="Select Login Method">
          <div className="space-y-3 text-sm">
            <label>
              <input
                type="radio"
                checked={loginType === "mobile"}
                onChange={() => setLoginType("mobile")}
              />
              Mobile
            </label>

            <label>
              <input
                type="radio"
                checked={loginType === "email"}
                onChange={() => setLoginType("email")}
              />
              Email
            </label>

            <label>
              <input
                type="radio"
                checked={loginType === "identity"}
                onChange={() => setLoginType("identity")}
              />
              Identity
            </label>
          </div>
        </AuthSection>

        {/* FORM */}
        <div className="space-y-4">
          {loginType === "mobile" && (
            <Input
              label="Mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
          )}

          {loginType === "email" && (
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          )}

          {loginType === "identity" && (
            <IdentityFields form={form} handleChange={handleChange} />
          )}

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          <Captcha setCaptchaText={setCaptchaText} />

          <Input
            label="Enter Captcha"
            name="captcha"
            value={form.captcha}
            onChange={handleChange}
          />

          <Button type="submit">Login</Button>
        </div>

        <p className="text-sm text-center">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;