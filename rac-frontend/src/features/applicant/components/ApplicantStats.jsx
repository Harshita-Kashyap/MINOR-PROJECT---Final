import Card from "../../../shared/components/ui/Card";

export default function ApplicantStats({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((item, index) => (
        <Card key={index}>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {item.value}
          </h3>
        </Card>
      ))}
    </div>
  );
}