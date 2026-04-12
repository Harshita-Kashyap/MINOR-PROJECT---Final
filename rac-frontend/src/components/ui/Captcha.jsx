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
        <label className="text-sm text-gray-600">
          CAPTCHA
        </label>

        <button
          type="button"
          onClick={refresh}
          className="text-xs text-blue-600 hover:underline"
        >
          Refresh
        </button>
      </div>

      <div className="bg-gray-200 px-4 py-2 rounded font-mono tracking-widest text-center">
        {captcha}
      </div>

    </div>
  );
}

export default Captcha;