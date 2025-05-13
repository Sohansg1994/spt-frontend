import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
type SearchBoxProps = {
  searchQuery?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export default function SearchBox({
  searchQuery = "",
  onChange = () => {},
  placeholder = "Search",
}: SearchBoxProps) {
  return (
    <div className="relative rounded-lg shadow-sm">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <MagnifyingGlassIcon
          className="h-6 w-6 text-typography-secondary/50"
          aria-hidden="true"
        />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full h-10 rounded-lg ring-1 ring-light-base bg-transparent placeholder:text-typography-secondary/70 dark:bg-surface-dark-primary sm:leading-6 outline-none text-typography-secondary/70 pl-12"
        placeholder={placeholder}
      />
    </div>
  );
}
