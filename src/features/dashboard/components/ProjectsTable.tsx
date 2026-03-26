export const ProjectsTable = () => {
  const data = [
    { client: "VOIS", project: "Ana Vodafone", status: "Approved", statusColor: "bg-green-500", pending: 3, comments: 6, updated: "1h ago" },
    { client: "Freelance", project: "Alpha", status: "In Review", statusColor: "bg-sky-500", pending: 0, comments: 5, updated: "12h ago" },
    { client: "Noon", project: "X", status: "Rejected", statusColor: "bg-red-500", pending: 2, comments: 8, updated: "2d ago" },
    { client: "Freelane", project: "Gamma", status: "Text", statusColor: "bg-neutral-300", pending: "Text", comments: "Text", updated: "Text" },
  ];

  return (
    <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-[#6944A9] text-white text-left text-sm">
              <th className="py-4 px-6 font-semibold w-[15%]">Client</th>
              <th className="py-4 px-6 font-semibold w-[20%]">Project</th>
              <th className="py-4 px-6 font-semibold w-[15%]">Status</th>
              <th className="py-4 px-6 font-semibold w-[10%]">Pending</th>
              <th className="py-4 px-6 font-semibold w-[15%]">Comments</th>
              <th className="py-4 px-6 font-semibold w-[15%]">Updated</th>
              <th className="py-4 px-6 font-semibold w-[10%] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-neutral-100 last:border-none text-sm hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-6 font-medium text-neutral-800">{row.client}</td>
                <td className="py-4 px-6 text-neutral-600">{row.project}</td>
                <td className="py-4 px-6">
                  {row.status !== "Text" ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${row.statusColor}`}>
                      {row.status}
                    </span>
                  ) : (
                    <span className="text-neutral-500">{row.status}</span>
                  )}
                </td>
                <td className="py-4 px-6 text-neutral-600">{row.pending}</td>
                <td className="py-4 px-6 text-neutral-600">{row.comments}</td>
                <td className="py-4 px-6 text-neutral-600">{row.updated}</td>
                <td className="py-4 px-6 flex justify-center gap-2">
                  <button className="w-8 h-8 rounded-full bg-indigo-50 text-[#6944A9] flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    📁
                  </button>
                  <button className="w-8 h-8 rounded-full bg-indigo-50 text-[#6944A9] flex items-center justify-center hover:bg-indigo-100 transition-colors">
                    🔗
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
