import Input from "../ui/Input";

export default function IdentityFields({ form, errors, handleChange }) {
  return (
    <div className="space-y-4">

      {/* DOB */}
      <Input
        label="Date of Birth"
        type="date"
        name="dob"
        value={form.dob}
        onChange={handleChange}
        error={errors.dob}
        className="dark:[color-scheme:dark]" 
      />

      {/* Roll + Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          label="10th Roll Number"
          name="roll"
          value={form.roll}
          onChange={handleChange}
          error={errors.roll}
        />

        <Input
          label="10th Passing Year"
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