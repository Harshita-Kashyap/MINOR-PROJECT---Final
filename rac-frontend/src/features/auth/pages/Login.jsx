import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [loginType, setLoginType] = useState("email");

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
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId,
          password: form.password,
          loginType,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (data.role) {
          localStorage.setItem("user", JSON.stringify(data));
          login(loginId, form.password, data.role);

          if (data.role === "admin") {
            navigate("/admin");
          } else if (data.role === "selector") {
            navigate("/selector");
          } else {
            navigate("/applicant");
          }
        } else {
          alert(data.message || "Invalid credentials");
        }
      } else {
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
        <div className="flex items-center justify-center gap-3">
          <h2 className="text-2xl font-semibold">{t("loginTitle")}</h2>
        </div>

        <AuthSection title={t("loginSelectMethod")}>
          <div className="space-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                checked={loginType === "email"}
                onChange={() => setLoginType("email")}
              />
              {t("loginMethodEmail")}
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                checked={loginType === "mobile"}
                onChange={() => setLoginType("mobile")}
              />
              {t("loginMethodMobile")}
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                checked={loginType === "identity"}
                onChange={() => setLoginType("identity")}
              />
              {t("loginMethodIdentity")}
            </label>
          </div>
        </AuthSection>

        <div className="space-y-4">
          {loginType === "mobile" && (
            <Input
              label={t("mobileNumber")}
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />
          )}

          {loginType === "email" && (
            <Input
              label={t("email")}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
          )}

          {loginType === "identity" && (
            <AuthSection>
              <IdentityFields
                form={form}
                errors={errors}
                handleChange={handleChange}
              />
            </AuthSection>
          )}

          <Input
            label={t("password")}
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Captcha setCaptchaText={setCaptchaText} />
            </div>

            <div className="flex-1">
              <Input
                label={t("enterCaptcha")}
                type="text"
                name="captcha"
                value={form.captcha}
                onChange={handleChange}
                error={errors.captcha}
              />
            </div>
          </div>

          <Button type="submit" fullWidth>
            {t("login")}
          </Button>
        </div>

        <p className="text-center text-sm">
          {t("noAccount")}{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            {t("register")}
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;