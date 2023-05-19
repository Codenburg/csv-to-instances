import React, { useEffect, useState } from "react";

export const CsvTable = ({ file }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Función para leer el contenido del archivo CSV
    const readCsvFile = async () => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split("\n");
        const data = rows.map((row) => row.split(";"));
        setTableData(data.slice(4)); // Omitir los primeros 4 elementos (encabezados)
      };

      fileReader.readAsText(file);
    };

    readCsvFile();
  }, [file]);

  return (
    <div className="mt-5">
      <h2>CSV File Content:</h2>
      <table className="table-auto">
        <thead>
          <tr>
            {tableData.length > 0 &&
              // Renderizar los encabezados utilizando el primer elemento de la matriz de datos
              tableData[0].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            // Renderizar filas de datos
            tableData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

