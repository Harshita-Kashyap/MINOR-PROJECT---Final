export default function AuthSection({ title, children }) {
  return (
    <div className="border rounded-xl p-5 bg-gray-50 space-y-4">
      <p className="text-sm font-semibold text-gray-700">
        {title}
      </p>
      {children}
    </div>
  );
}