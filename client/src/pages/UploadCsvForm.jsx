import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CsvTable } from "../components/CsvTable";
import { uploadTrutest, createTrutest } from "../utils/api/trutests.api";
import { useNavigate } from "react-router-dom";

export function UploadCsvPage() {
  const [file, setFile] = useState(null);
  const [showTable, setShowTable] = useState(false); // Estado para mostrar la tabla
  const navigate = useNavigate();
  // Maneja el cambio de archivo
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
    } else {
      setFile(null);
      toast.error("Please select a valid CSV file");
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        setShowTable(true);
        toast.success("CSV file uploaded successfully!");
      } catch (error) {
        toast.error("Error uploading CSV file. Please try again.");
      }
    }
  };

  // Maneja la acción de crear animales
  const handleCreateAnimals = async () => {
    if (file) {
      try {
        await uploadTrutest(file);
        await createTrutest(file);
        toast.success("Animals created successfully!");
        navigate("/");
      } catch (error) {
        toast.error("Error creating animals. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-10 rounded-lg mt-2"
      >
        <div className="mt-3">
          <label htmlFor="csvFile">TRU-TEST: </label>
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
          VER ANIMALES
        </button>
        {showTable && (
          <button
            type="button"
            className="bg-red-600 p-3 rounded-lg block w-full mt-3"
            onClick={handleCreateAnimals}
          >
            CREAR ANIMALES
          </button>
        )}
      </form>

      {/* Mostrar la tabla si el estado showTable es verdadero y hay un archivo */}
      {showTable && file && <CsvTable file={file} />}
    </div>
  );
}
