import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { TrutestCard } from "../cards/TrutestCard";

export const Table = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "IDE",
        Cell: ({ row }) => <TrutestCard trutest={row.original} />,
        accessor: "IDE",
      },
      { Header: "IDV", accessor: "idv" },
      { Header: "RAZA", accessor: "raza" },
      { Header: "UBICACION", accessor: "ubicacion" },
      { Header: "INSCRIPTA", accessor: "inscripta" },
      { Header: "PESO", accessor: "peso" },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // Configuración inicial de la paginación
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          style={{ color: "black" }}
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          style={{ color: "black", marginLeft: "10px" }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      <table {...getTableProps()} className="w-full table-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-800 text-white"
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 cursor-pointer"
                >
                  <span>{column.render("Header")}</span>
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="ml-1 h-4 w-4 inline text-gray-300"
                        >
                          <path d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="ml-1 h-4 w-4 inline text-gray-300"
                        >
                          <path d="M19 9l-7 7-7-7" />
                        </svg>
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white text-black sm:bg-gray-100"
              >
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="border px-4 py-2">
                    {cell.column.Header === "PESO" ? (
                      <span
                        className={`font-bold ${
                          cell.value < 50
                            ? "text-green-500"
                            : cell.value > 100
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {cell.render("Cell")}
                      </span>
                    ) : (
                      cell.render("Cell")
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-l-lg focus:shadow-outline hover:bg-indigo-100 ${
            !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100 ${
            !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {"<"}
        </button>
        <span className="px-3 text-white">
          Página{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white focus:shadow-outline hover:bg-indigo-100 ${
            !canNextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className={`h-10 px-5 text-indigo-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-indigo-100 ${
            !canNextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};
