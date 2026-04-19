// ================= REGISTER VALIDATION =================
export function validateRegister(form, captchaText) {
  const errors = {};

  if (!form.name?.trim()) {
    errors.name = "Name is required";
  }

  if (!form.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Invalid email";
  }

  if (!form.phone?.trim()) {
    errors.phone = "Phone is required";
  } else if (!/^[0-9]{10}$/.test(form.phone)) {
    errors.phone = "Phone must be 10 digits";
  }

  if (!form.dob) {
    errors.dob = "DOB required";
  }

  if (!form.roll?.trim()) {
    errors.roll = "Roll required";
  }

  if (!form.year?.trim()) {
    errors.year = "Year required";
  }

  if (!form.password) {
    errors.password = "Password required";
  } else if (form.password.length < 6) {
    errors.password = "Minimum 6 characters";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Confirm password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!form.captcha) {
    errors.captcha = "Captcha required";
  } else if (form.captcha !== captchaText) {
    errors.captcha = "Captcha incorrect";
  }

  return errors;
}


// ================= LOGIN VALIDATION =================
export function validateLogin(form, captchaText, loginType) {
  const errors = {};

  if (loginType === "mobile") {
    if (!form.mobile) {
      errors.mobile = "Mobile required";
    } else if (!/^[0-9]{10}$/.test(form.mobile)) {
      errors.mobile = "Invalid mobile";
    }
  }

  if (loginType === "email") {
    if (!form.email) {
      errors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email";
    }
  }

  if (loginType === "identity") {
    if (!form.roll) {
      errors.roll = "Roll required";
    }
    if (!form.dob) {
      errors.dob = "DOB required";
    }
    if (!form.year) {
      errors.year = "Year required";
    }
  }

  if (!form.password) {
    errors.password = "Password required";
  }

  if (!form.captcha) {
    errors.captcha = "Captcha required";
  } else if (form.captcha !== captchaText) {
    errors.captcha = "Captcha incorrect";
  }

  return errors;
}