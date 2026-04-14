import { useEffect, useState } from "react";

function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  return captcha;
}

function Captcha({ setCaptchaText }) {
  const [captcha, setCaptcha] = useState("");

  const refresh = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    setCaptchaText(newCaptcha);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          CAPTCHA
        </label>

        <button
          type="button"
          onClick={refresh}
          className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Refresh
        </button>
      </div>

      <div className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2 text-center font-mono tracking-widest text-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        {captcha}
      </div>
    </div>
  );
}

export default Captcha;