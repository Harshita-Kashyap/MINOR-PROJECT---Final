function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full bg-white dark:bg-gray-800 text-sm">
        
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-left">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {Object.values(row).map((val, i) => (
                  <td key={i} className="p-3 text-gray-700 dark:text-gray-200">
                    {val}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500 dark:text-gray-400"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default Table;