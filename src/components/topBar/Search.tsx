import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function Search() {
  return (
    <div className="w-full sm:max-w-xs ">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <input
          id="search"
          name="search"
          className="rounded-full block w-full border-0 bg-gray-light py-2 pr-10 pl-3 text-gray-300 placeholder:text-gray-400 focus:bg-gray-default focus:text-gray-900 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
          placeholder="Search"
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-white"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
