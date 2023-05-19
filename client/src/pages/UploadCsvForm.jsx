import React, { useState } from "react";
import { uploadTrutest } from "../api/trutests.api";
import { toast } from "react-hot-toast";
import { CsvTable } from "../components/CsvTable";

export function UploadCsvPage() {
  const [file, setFile] = useState(null);
  const [showTable, setShowTable] = useState(false); // Estado para mostrar la tabla

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        await uploadTrutest(formData);
        setShowTable(true); // Mostrar la tabla después de cargar el archivo exitosamente
        toast.success("CSV file uploaded successfully!");
      } catch (error) {
        toast.error("Error uploading CSV file");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
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
          Upload
        </button>
      </form>

      {/* Mostrar la tabla si el estado showTable es verdadero */}
      {showTable && <CsvTable file={file} />}
    </div>
  );
}
