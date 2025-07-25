import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

// Pagination component to navigate between pages
const Pagination = ({
  totalPage, // Total number of pages
  currentPage, // Current page number
  setCurrentPage, // Function to change current page
  pageSize, // Number of items per page
  setPageSize, // Function to change page size
}) => {
  return (
    <div className="flex items-center h-fit justify-between pagination mt-7 text-[#667085]">
      {/* Left side: Dropdown to select how many items per page  */}
      <div className="flex gap-2 items-center text-sm text-[13px]">
        <select
          className="px-1 py-2 rounded-md outline-none border border-gray-200 cursor-pointer bg-white"
          name="pageSize"
          id="pageSize"
          onChange={(e) => {
            setPageSize(e.target.value); // Change page size
            setCurrentPage(1); // Reset to first page
          }}
          value={pageSize}
        >
          <option value="5">5 Items</option>
          <option value="10">10 Items</option>
          <option value="15">15 Items</option>
        </select>
      </div>
      {/* Center: Input field to jump to specific page */}
      <div className="flex gap-2 items-center text-sm text-[13px]">
        <p>Page</p>
        <input
          className="text-gray-700 bg-white rounded-full h-8 w-8  text-center outline-none border border-gray-300 appearance-none [-moz-appearance:textfield]"
          type="number"
          value={currentPage}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            // Check if input is valid page numbe
            if (isNaN(value) || value < 1 || value > totalPage) {
              value = 1; // Reset to page 1 if invalid
            }
            setCurrentPage(value);
          }}
          min={1}
          max={totalPage}
        />
        <p>of</p>
        <p>{totalPage ?? "1"}</p>
      </div>
      {/* Right side: Previous and Next buttons */}
      <div className="flex gap-5 items-center text-sm text-[13px]">
        {/* Previous button */}
        <div
          onClick={() =>
            currentPage > 1 && setCurrentPage(Number(currentPage) - 1)
          }
          className={`flex gap-1 items-center text-sm ${
            currentPage > 1
              ? "text-primaryDark font-semibold cursor-pointer" // Active style
              : "cursor-default" // Disabled style
          }`}
        >
          <IoIosArrowBack className="text-base" />
          <p>Prev</p>
        </div>
        {/* Next Button */}
        <div
          onClick={() =>
            currentPage < totalPage && setCurrentPage(Number(currentPage) + 1)
          }
          className={`flex gap-1 items-center text-sm ${
            currentPage < totalPage
              ? "text-primaryDark font-semibold cursor-pointer"
              : "cursor-default"
          }`}
        >
          <p>Next</p>
          <IoIosArrowForward className="text-base" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
