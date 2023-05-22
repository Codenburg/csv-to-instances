import React, { useEffect, useState } from "react";

const readCsvFile = async (file, setTableData) => {
  const fileReader = new FileReader();

  fileReader.onload = (e) => {
    const content = e.target.result;
    const rows = content.split("\n");
    const data = rows.map((row) => row.split(";"));
    setTableData(data.slice(4));
  };

  fileReader.readAsText(file);
};

export const CsvTable = ({ file }) => {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!file) {
      return;
    }

    readCsvFile(file, setTableData);
  }, [file]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tableData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!file) {
    return <div>No file selected.</div>;
  }

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-4">CSV File Content:</h2>
      <table className="table-auto">
        <thead>
          <tr>
            {tableData.length > 0 &&
              tableData[0].map((header, index) => (
                <th key={index} className="p-2 border">
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`} className="p-2 border">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableData.length > 0 ? tableData[0].length : 1}
                className="p-2 border"
              >
                No data available for the selected page.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {tableData.length > itemsPerPage && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md mr-2"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-bold">{currentPage}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            onClick={() => goToPage(currentPage + 1)}
            disabled={indexOfLastItem >= tableData.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
