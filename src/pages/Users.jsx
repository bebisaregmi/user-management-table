import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination";
import { ImSearch } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
import noData from "../assets/data-not-found.png";

const Users = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState();
  const [deviceType, setDeviceType] = useState("desktop");

  // function to check if screen is mobile or desktop
  const checkDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 768) {
      setDeviceType("mobile");
    } else {
      setDeviceType("desktop");
    }
  };

  useEffect(() => {
    checkDeviceType(); // initial check

    window.addEventListener("resize", checkDeviceType); // update on resize

    return () => {
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  // Fetch user data from API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (data) setUserData([...data, ...data]);
  }, [data]);

  console.log(userData);

  // Define which columns to show in table
  const headers = ["name", "email", "phone", "company"];
  const sortableColumns = ["name", "email"];

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Go back to first page when searching
  };

  // Filter users based on search query
  const filterData =
    userData?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Calculate which items to show on current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filterData?.slice(startIndex, endIndex);

  // State for sorting functionality
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Sort the data based on selected column and direction
  const sortedData = useMemo(() => {
    let sortable = [...paginatedData];
    if (sortKey !== null) {
      sortable.sort((a, b) => {
        const valA = a[sortKey];
        const valB = b[sortKey];

        if (valA < valB) return sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [paginatedData, sortKey, sortDirection]);

  // Handle column sorting when header is clicked
  const handleSort = (key) => {
    if (!sortableColumns.includes(key)) return; // Only sort allowed columns
    let direction = "asc";
    // If clicking same column, toggle direction
    if (sortKey === key && sortDirection === "asc") {
      direction = "desc";
    }
    setSortKey(key);
    setSortDirection(direction);
  };

  return (
    <div className="space-y-6 my-10 mx-5 md:mx-12 lg:mx-20">
      <form
        onSubmit={handleSearch}
        className="flex  justify-between  items-center "
      >
        <h2 className="text-base font-bold">User List</h2>
        <div className="flex relative items-center border border-gray-200 focus-within:border-gray-700 w-[200px] py-2 px-1.5 rounded-lg ">
          <input
            type="text"
            placeholder="Search user"
            value={searchQuery}
            onChange={(any) => {
              setSearchQuery(any.target.value);
              setCurrentPage(1);
            }}
            className="outline-none"
          />
          <ImSearch className="absolute right-3" />
        </div>
      </form>

      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-2">
          {deviceType === "desktop" ? (
            <table>
              <thead>
                <tr className="bg-gray-200 text-sm font-medium">
                  {headers.map((key) => (
                    <th
                      key={key}
                      align="left"
                      className={`p-3 ${
                        sortableColumns.includes(key)
                          ? "cursor-pointer hover:bg-gray-200"
                          : ""
                      }`}
                      onClick={() => handleSort(key)}
                    >
                      {key.toUpperCase()}
                      {sortKey === key && sortableColumns.includes(key) && (
                        <span className="ml-1">
                          {sortDirection === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {sortedData?.length > 0 &&
                  sortedData?.map((user, index) => (
                    <tr
                      key={index}
                      className="odd:bg-gray-50 even:bg-white md:ps-0 lg:px-8 sm:px-10 text-sm font-normal hover:bg-gray-100"
                    >
                      <td className="p-2">{user.name} </td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.company.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            // Show cards on mobile
            <div className="grid gap-5 p-5">
              {sortedData?.length > 0 &&
                sortedData?.map((user, index) => (
                  <div
                    className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3.5"
                    key={index}
                  >
                    <h1 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h1>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        EMAIL
                      </p>
                      <p className="text-gray-700 font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        PHONE
                      </p>
                      <p className="text-gray-700 font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">
                        COMPANY
                      </p>
                      <p className="text-gray-700 font-medium">
                        {user.company.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* show message when no data  */}
          {paginatedData?.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <img src={noData} className="w-[300px] h-auto" />
              <p>No data found!</p>
            </div>
          )}

          {/* show loading spinner  */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center mx-auto w-full h-[30vh]">
              <FaSpinner className="animate-spin" />
              <p>Loading...</p>
            </div>
          )}

          {/* show error message */}
          {isError && (
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <img src={noData} className="w-[300px] h-auto" />
              <p>Error loading user!</p>
            </div>
          )}
        </div>

        {/* Pagination components  */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPage={Math.ceil(userData?.length / pageSize)}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
};

export default Users;
