import React, { useState, useEffect } from "react";
import { useTable } from "react-table";

export function CsvTable({ file }) {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");
      const csvData = [];

      // Obtener los headers de las columnas
      const csvHeaders = lines[4]
        .split(";")
        .map((header) => ({ Header: header.trim(), accessor: header.trim() }));
      setHeaders(csvHeaders);

      // Obtener los datos de las filas
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

  const columns = headers;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="mt-4">
      <table {...getTableProps()} className="table-auto border-collapse">
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
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border text-white"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
