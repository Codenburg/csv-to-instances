import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";

export function CsvTable({ file }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");
      const csvData = [];

      // Obtener los headers de las columnas en la línea 5
      const csvHeaders = lines[4]
      .split(";")
      .map((header) => {
        const trimmedHeader = header.trim().replace(".", "");
        return {
          Header: trimmedHeader,
          accessor: trimmedHeader
        };
      });
    setHeaders(csvHeaders);
    

      // Obtener los datos de las filas (omitir las primeras 4 líneas)
      for (let i = 5; i < lines.length; i++) {
        const rowData = lines[i].split(";").map((value) => value.trim());
        const rowObject = {};

        for (let j = 0; j < csvHeaders.length; j++) {
          const header = csvHeaders[j].accessor;
          const value = rowData[j];
          rowObject[header] = value;
        }

        csvData.push(rowObject);
      }

      setData(csvData);
    };

    reader.readAsText(file);
  }, [file]);

  const columns = useMemo(() => headers, [headers]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
    usePagination
  );

  return (
    <div className="mt-4">
      <table {...getTableProps()} className="w-full overflow-x-auto">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 bg-gray-200 text-gray-700 border"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-center space-x-2 mt-4">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-lg"
        >
          {"<<"}
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-lg"
        >
          {"<"}
        </button>
        <span>
          <strong className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-lg">
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-lg"
        >
          {">"}
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="px-3 py-1 text-blue-500 hover:text-blue-700 rounded-lg"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}
