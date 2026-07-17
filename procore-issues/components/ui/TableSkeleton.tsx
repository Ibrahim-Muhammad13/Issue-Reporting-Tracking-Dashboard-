export function TableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border">
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-16" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-56" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-5 w-20 rounded-md" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-14" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-32" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-24" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-6 w-6 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-20" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-20" />
          </td>
          <td className="px-4 py-3">
            <div className="skeleton h-3.5 w-8" />
          </td>
        </tr>
      ))}
    </>
  );
}
