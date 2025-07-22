import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  return (
    <div className="flex items-center h-fit justify-between pagination mt-7 text-[#667085]">
      <div className="flex gap-2 items-center text-sm text-[13px]">
        <select
          className="px-1 py-2 rounded-md outline-none border border-gray-200 cursor-pointer bg-white"
          name="pageSize"
          id="pageSize"
          onChange={(e) => {
            setPageSize(e.target.value);
            setCurrentPage(1);
          }}
          value={pageSize}
        >
          <option value="5">5 Items</option>
          <option value="10">10 Items</option>
          <option value="15">15 Items</option>
        </select>
      </div>
      <div className="flex gap-2 items-center text-sm text-[13px]">
        <p>Page</p>
        <input
          className="text-gray-700 bg-white rounded-full h-8 w-8  text-center outline-none border border-gray-300 appearance-none [-moz-appearance:textfield]"
          type="number"
          value={currentPage}
          onChange={(e) => {
            let value = parseInt(e.target.value);
            if (isNaN(value) || value < 1 || value > totalPage) {
              value = 1;
            }
            setCurrentPage(value);
          }}
          min={1}
          max={totalPage}
        />
        <p>of</p>
        <p>{totalPage ?? "1"}</p>
      </div>
      <div className="flex gap-5 items-center text-sm text-[13px]">
        <div
          onClick={() =>
            currentPage > 1 && setCurrentPage(Number(currentPage) - 1)
          }
          className={`flex gap-1 items-center text-sm ${
            currentPage > 1
              ? "text-primaryDark font-semibold cursor-pointer"
              : "cursor-default"
          }`}
        >
          <IoIosArrowBack className="text-base" />
          <p>Prev</p>
        </div>
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
