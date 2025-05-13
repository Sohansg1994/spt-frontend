import { Column, SortConfig } from "../../types/table";
import Spinner from "../spinner/Spinner";

type TableProps<T> = {
  columns: Column<T>[];
  data: T[] | [];
  loading?: boolean;
  sortConfig: SortConfig<T>;
  setSortConfig: (config: SortConfig<T>) => void;
  onSelect?: (id: any) => void;
  handleSelect?: (selectedIds: (string | number)[]) => void;
  enableRowSelection?: boolean;
  rowKey: keyof T;
  render?: (value: any, row: T, rowIndex?: number) => React.ReactNode;
  selectedIds?: (string | number)[];
  setSelectedIds?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  isError?: boolean;
};

const Table = <T extends Record<string, any>>({
  columns,
  data = [],
  loading = false,
  sortConfig,
  setSortConfig,
  handleSelect,
  enableRowSelection = false,
  rowKey,
  onSelect,
  selectedIds = [],
  setSelectedIds = () => {},
  isError = false,
}: TableProps<T>) => {
  const handleSort = (key: keyof T) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  const toggleSelection = (id: string | number) => {
    const updatedSelection = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(updatedSelection);
    handleSelect?.(updatedSelection);
  };

  const toggleAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
      handleSelect?.([]);
    } else {
      const allIds = data.map((row) => row[rowKey]);
      setSelectedIds(allIds);
      handleSelect?.(allIds);
    }
  };

  return (
    <>
      {isError ? (
        <div className="text-red-500 p-4">
          Failed to load stock data. Please try again.
        </div>
      ) : loading ? (
        <div className="my-5 w-full grid grid-cols-6 gap-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className={`h-6 bg-gray-200 rounded animate-pulse ${
                [0, 5, 10].includes(index) ? "col-span-2" : ""
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <div className="w-full overflow-x-auto custom-scrollbar">
          <div className="relative w-full">
            <table className="min-w-full bg-white rounded-lg border-collapse">
              <thead className="bg-white">
                <tr>
                  {enableRowSelection && (
                    <th className="px-4 py-3 sticky left-0 bg-white  shadow-md">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === data.length}
                        onChange={toggleAll}
                      />
                    </th>
                  )}
                  {columns.map((col, index) => (
                    <th
                      key={String(col.key)}
                      className={`px-4 py-3 text-left text-xs font-regular text-typography-secondary whitespace-nowrap ${
                        col.sortable ? "cursor-pointer" : ""
                      } ${
                        index === 0 ? "sticky left-0 bg-white  shadow-md" : ""
                      }`}
                      onClick={
                        col.sortable ? () => handleSort(col.key) : undefined
                      }
                    >
                      <div className="flex items-center">
                        {col.title}
                        {col.sortable && (
                          <span className="ml-2 text-xs">
                            {sortConfig.key === col.key ? (
                              sortConfig.direction === "asc" ? (
                                <span className="text-typography-secondary/50">
                                  ▲
                                </span>
                              ) : (
                                <span className="text-typography-secondary/50">
                                  ▼
                                </span>
                              )
                            ) : (
                              <span className="ml-1 inline-block w-2 h-2 bg-typography-secondary/20 rotate-45 transform"></span>
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                      className="px-4 py-4 text-center"
                    >
                      <div className="flex justify-center py-12">
                        <Spinner dark />
                      </div>
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((row, rowIndex) => (
                    <tr
                      key={row[rowKey]}
                      className={`${
                        selectedIds.includes(row[rowKey])
                          ? "bg-gray-100"
                          : rowIndex % 2 === 0
                          ? "bg-white"
                          : "bg-light-base-light"
                      } hover:bg-gray-200`}
                    >
                      {enableRowSelection && (
                        <td className="px-4 py-4 text-center sticky left-0 bg-white shadow-md">
                          <input
                            type="checkbox"
                            className="bg-light-primary"
                            checked={selectedIds.includes(row[rowKey])}
                            onChange={() => toggleSelection(row[rowKey])}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      {columns.map((col, index) => (
                        <td
                          key={String(col.key)}
                          className={`px-4 py-4 text-xs text-typography-secondary whitespace-nowrap hover:bg-gray-200 ${
                            index === 0
                              ? `sticky left-0   shadow-md ${
                                  rowIndex % 2 === 0
                                    ? "bg-white"
                                    : "bg-light-base-light"
                                }`
                              : ""
                          }`}
                          onClick={() => onSelect?.(row[rowKey])}
                        >
                          {col.render
                            ? col.render(row[col.key], row)
                            : row[col.key]?.toString()}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (enableRowSelection ? 1 : 0)}
                      className="px-4 py-4 text-center text-sm text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
