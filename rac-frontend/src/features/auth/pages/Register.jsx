import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AuthLayout from "../../../layouts/AuthLayout";
import Input from "../../../shared/components/ui/Input";
import Button from "../../../shared/components/ui/Button";
import Captcha from "../../../shared/components/ui/Captcha";

import AuthSection from "../components/AuthSection";
import IdentityFields from "../../../shared/components/forms/IdentityFields";

import { validateRegister } from "../utils/validation";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t("register")}
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {t("createApplicantAccount")}
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label={t("fullName")}
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          <Input
            label={t("email")}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label={t("mobileNumber")}
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        <AuthSection title={t("identityDetails")}>
          <IdentityFields
            form={form}
            errors={errors}
            handleChange={handleChange}
          />
        </AuthSection>

        <div className="space-y-4">
          <Input
            label={t("password")}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label={t("confirmPassword")}
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <Captcha setCaptchaText={setCaptchaText} />
          </div>

          <div className="flex-1">
            <Input
              label={t("enterCaptcha")}
              name="captcha"
              value={form.captcha}
              onChange={handleChange}
              error={errors.captcha}
            />
          </div>
        </div>

        <Button type="submit" fullWidth disabled={loading} loading={loading}>
          {loading ? t("registering") : t("register")}
        </Button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          {t("alreadyAccount")}{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("login")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;