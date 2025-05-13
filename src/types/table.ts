export type Column<T> = {
  key: keyof T;
  title: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

export type SortConfig<T> = {
  key: keyof T | null;
  direction: "asc" | "desc" | null;
};
