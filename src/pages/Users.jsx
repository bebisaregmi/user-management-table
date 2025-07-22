import React, { useState, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import Pagination from "../components/Pagination";
import { ImSearch } from "react-icons/im";
import { FaSpinner, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import noData from "../assets/data-not-found.png";

const Users = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response.data);
      return response.data;
    },
  });

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor((row) => row.company.name, {
        id: "companyName",
        header: "Company Name",
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!data) return [];

    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    table.setPageIndex(0);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    table.setPageIndex(newPage - 1);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    table.setPageIndex(0);
    table.setPageSize(newPageSize);
  };

  const getSortIcon = (column) => {
    if (!column.getCanSort()) return null;

    const sortDirection = column.getIsSorted();
    if (sortDirection === "asc") {
      return <FaSortUp className="inline ml-1 text-blue-600" />;
    } else if (sortDirection === "desc") {
      return <FaSortDown className="inline ml-1 text-blue-600" />;
    }
    return <FaSort className="inline ml-1 opacity-40 hover:opacity-70" />;
  };

  return (
    <div className="space-y-6 my-10 mx-5 md:mx-12 lg:mx-20">
      <form
        onSubmit={handleSearch}
        className="flex justify-between items-center"
      >
        <h2 className="text-base font-bold">User List</h2>
        <div className="flex relative items-center border border-gray-200 focus-within:border-gray-700 w-[200px] py-2 px-1.5 rounded-lg">
          <input
            type="text"
            placeholder="Search user"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
              table.setPageIndex(0);
            }}
            className="outline-none"
          />
          <ImSearch className="absolute right-3" />
        </div>
      </form>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    className="bg-gray-200 text-sm font-medium"
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`p-2 text-left select-none ${
                          header.column.getCanSort()
                            ? "cursor-pointer hover:bg-gray-300"
                            : "cursor-default"
                        } ${
                          header.column.getIsSorted()
                            ? "bg-blue-100 font-semibold"
                            : ""
                        }`}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                      >
                        <div className="flex items-center">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {getSortIcon(header.column)}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-50 even:bg-white text-sm font-normal hover:bg-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {table.getRowModel().rows.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <img
                src={noData}
                className="w-[300px] h-auto"
                alt="No data found"
              />
              <p>No data found!</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center mx-auto w-full h-[30vh]">
              <FaSpinner className="animate-spin" />
              <p>Loading...</p>
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <img src={noData} className="w-[300px] h-auto" alt="Error" />
              <p>Error loading user!</p>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          totalPage={Math.ceil(filteredData.length / pageSize)}
          pageSize={pageSize}
          setPageSize={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default Users;
