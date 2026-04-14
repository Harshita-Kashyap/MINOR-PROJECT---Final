import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Captcha from "../../../components/ui/Captcha";

import AuthSection from "../../../components/common/AuthSection";
import IdentityFields from "../../../components/common/IdentityFields";

import { validateRegister } from "../validation";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    roll: "",
    year: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });

  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister(form, captchaText);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      return;
    }

    setLoading(true);

    try {
      console.log("📤 Sending Data:", form);

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          dob: form.dob,
          roll: form.roll,
          year: form.year,
          password: form.password,
        }),
      });

      const data = await response.json();
      console.log("📥 Server Response:", data);

      if (response.ok && data.success) {
        alert("✅ Registration Successful!");
        navigate("/login");
      } else {
        alert(data.message || "❌ Registration failed");
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert("Cannot connect to server. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800"
      >
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Register
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Create your applicant account
          </p>
        </div>

        {/* BASIC DETAILS */}
        <div className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Mobile Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        {/* IDENTITY SECTION */}
        <AuthSection title="Identity Details">
          <IdentityFields
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
        </AuthSection>

        {/* PASSWORD */}
        <div className="space-y-4">
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        {/* CAPTCHA */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex-1">
            <Captcha setCaptchaText={setCaptchaText} />
          </div>

          <div className="flex-1">
            <Input
              label="Enter Captcha"
              name="captcha"
              value={form.captcha}
              onChange={handleChange}
              error={errors.captcha}
            />
          </div>
        </div>

        {/* BUTTON */}
        <Button type="submit" fullWidth disabled={loading} loading={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>

        {/* FOOTER */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;