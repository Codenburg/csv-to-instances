import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CsvTable } from "../components/CsvTable";

export function UploadCsvPage() {
  const [file, setFile] = useState(null);
  const [showTable, setShowTable] = useState(false); // Estado para mostrar la tabla

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile && selectedFile.name.endsWith(".csv")) {
    setFile(selectedFile);
  } else {
    setFile(null);
    toast.error("Please select a valid CSV file");
  }
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      setShowTable(true);
      toast.success("CSV file uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading CSV file. Please try again.");
    }
  }
};


  const handleViewTable = () => {
    setShowTable(true);
    setFile(null);
  };

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-10 rounded-lg mt-2"
      >
        <div className="mt-3">
          <label htmlFor="csvFile">Upload CSV File:</label>
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
        >
          Ver animales
        </button>
        {showTable && (
          <button
            type="button"
            className="bg-indigo-500 p-3 rounded-lg block w-full mt-3"
            onClick={handleViewTable}
          >
            Ver en otra pagina
          </button>
        )}
      </form>

      {/* Mostrar la tabla si el estado showTable es verdadero y hay un archivo */}
      {showTable && file && <CsvTable file={file} />}
    </div>
  );
}
