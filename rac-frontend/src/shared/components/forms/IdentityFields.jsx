import { useTranslation } from "react-i18next";
import Input from "../ui/Input";

export default function IdentityFields({ form, errors, handleChange }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Input
        label={t("dob")}
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        error={errors.dob}
        className="dark:[color-scheme:dark]"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label={t("rollNumber10")}
          name="roll"
          value={form.roll}
          onChange={handleChange}
          error={errors.roll}
        />

        <Input
          label={t("passingYear10")}
          name="year"
          value={form.year}
          onChange={(e) => {
            if (/^\d{0,4}$/.test(e.target.value)) {
              handleChange(e);
            }
          }}
          error={errors.year}
        />
      </div>
    </div>
  );
}