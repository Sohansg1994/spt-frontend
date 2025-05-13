import { useMemo, useCallback } from "react";
import { Option } from "../../types/common";
import Button from "../button/Button";
import SelectStatus from "../selectStatus/SelectStatus";

/* -------------------------------------------------------------------------- */
/*                                 types                                      */
/* -------------------------------------------------------------------------- */
type Props = {
  onChangePage?: (page: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  hasMore?: boolean;
  setItemsPerPage?: (itemsPerPage: number) => void;
  loading?: boolean;
};

const itemsPerPageOptions: Option[] = [
  { id: "10", name: "10" },
  { id: "20", name: "20" },
  { id: "50", name: "50" },
  { id: "100", name: "100" },
];

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
export default function Pagination({
  onChangePage,
  currentPage = 1,
  itemsPerPage = 10,
  setItemsPerPage,
  hasMore = false,
  loading = false,
}: Props) {
  const selectedOption = useMemo(() => {
    return (
      itemsPerPageOptions.find(
        (option) => option.id === itemsPerPage.toString()
      ) || itemsPerPageOptions[0]
    );
  }, [itemsPerPage]);

  const handlePreviousPage = useCallback(() => {
    if (onChangePage && currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  }, [onChangePage, currentPage]);

  const handleNextPage = useCallback(() => {
    if (onChangePage && hasMore) {
      onChangePage(currentPage + 1);
    }
  }, [onChangePage, currentPage, hasMore]);

  const handleItemsPerPageChange = useCallback(
    (option: Option) => {
      if (setItemsPerPage) {
        setItemsPerPage(Number(option.id));
      }
    },
    [setItemsPerPage]
  );

  return (
    <>
      {loading ? (
        <div className="">
          <div className="bg-light-surface  w-full animate-pulse flex justify-between gap-4">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          </div>
        </div>
      ) : (
        <nav
          className="flex items-center justify-between border-gray-200"
          aria-label="Pagination"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm text-typography-secondary-dark font-semibold">
              Show
            </span>
            <div className="sm:w-16">
              <SelectStatus
                className="ring-typography-secondary-dark text-typography-secondary-dark font-semibold"
                options={itemsPerPageOptions}
                selectedOption={selectedOption}
                setSelectedOption={handleItemsPerPageChange}
              />
            </div>
          </div>

          <div className="flex flex-1 gap-3 justify-end sm:justify-end items-center">
            <Button
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
              colour="none"
            >
              Prev
            </Button>

            <div className="relative w-10 p-2 flex justify-center bg-light-primary text-white rounded-[8px]">
              <div>{currentPage}</div>
            </div>

            <Button disabled={!hasMore} onClick={handleNextPage} colour="none">
              Next
            </Button>
          </div>
        </nav>
      )}
    </>
  );
}
