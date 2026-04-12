import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Captcha from "../../../components/ui/Captcha";

import IdentityFields from "../../../components/common/IdentityFields";
import AuthSection from "../../../components/common/AuthSection";

import { useAuth } from "../useAuth";
import { validateLogin } from "../validation";

function Login() {
  const { login } = useAuth();
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
    role: "applicant",
  });

  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // Added async
    e.preventDefault();

    const validationErrors = validateLogin(form, captchaText, loginType);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    let loginId = "";
    if (loginType === "mobile") loginId = form.mobile;
    else if (loginType === "email") loginId = form.email;
    else loginId = form.roll; // Using roll for identity-based lookup

    try {
      // Sending login request to the backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId,
          password: form.password,
          loginType
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // If MySQL returns success, update the local Auth state
        login(loginId, form.password, form.role);
        navigate("/applicant");
      } else {
        // If MySQL returns no user found or wrong password
        alert(data.message || "You are not registered or credentials invalid.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Database connection failed. Is the server running?");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Login</h2>
        </div>

        {/* LOGIN TYPE */}
        <AuthSection title="Select Login Method">
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={loginType === "mobile"} onChange={() => setLoginType("mobile")} />
              Mobile
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={loginType === "email"} onChange={() => setLoginType("email")} />
              Email
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={loginType === "identity"} onChange={() => setLoginType("identity")} />
              Identity
            </label>
          </div>
        </AuthSection>

        {/* FORM */}
        <div className="space-y-4">

          {loginType === "mobile" && (
            <Input
              label="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />
          )}

          {loginType === "email" && (
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
          )}

          {loginType === "identity" && (
            <AuthSection >
              <IdentityFields
                form={form}
                errors={errors}
                handleChange={handleChange}
              />
            </AuthSection>
          )}

          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

         <div className="flex flex-col sm:flex-row gap-3 w-full">

          {/* Captcha Display */}
          <div className="flex-1">
            <Captcha setCaptchaText={setCaptchaText} />
          </div>

          {/* Input */}
          <div className="flex-1">
            <Input
              label="Enter Captcha"
              type="text"
              name="captcha"
              value={form.captcha}
              onChange={handleChange}
              error={errors.captcha}
            />
          </div>

        </div>

          <Button type="submit" fullWidth>
            Login
          </Button>

        </div>

        {/* FOOTER */}
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;