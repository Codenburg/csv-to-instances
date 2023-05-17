import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createTrutest } from "../api/trutests.api";
import { toast } from "react-hot-toast";
import { parse } from "papaparse";

export function CsvFormPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [csvData, setCsvData] = useState(null);
  const [editedData, setEditedData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);

  const onSubmit = handleSubmit(async () => {
    if (editedData.length > 0) {
      await Promise.all(editedData.map((data) => createTrutest(data)));
      toast.success("Trutests created successfully!", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/trutests");
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const parsedCsv = parse(reader.result, { header: true });
      setEditedData(parsedCsv.data);
      setShowEditForm(true);
    };
    reader.readAsText(file);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setEditedData((prevState) => {
      const newData = [...prevState];
      newData[index] = { ...newData[index], [name]: value };
      return newData;
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <div className="mt-3">
          <label htmlFor="csvFile">Import CSV:</label>
          <input type="file" id="csvFile" onChange={handleFileChange} />
        </div>
        {showEditForm && (
          <>
            {editedData.map((data, index) => (
              <div key={index} className="mt-3">
                <h2>Row {index + 1}</h2>
                <div>
                  <label htmlFor={`idv-${index}`}>IDV:</label>
                  <input
                    type="text"
                    id={`idv-${index}`}
                    name={`idv-${index}`}
                    value={data.idv || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div>
                  <label htmlFor={`ide-${index}`}>IDE:</label>
                  <input
                    type="text"
                    id={`ide-${index}`}
                    name={`ide-${index}`}
                    value={data.ide || ""}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                {/* Aquí añade el resto de campos del formulario */}
              </div>
            ))}
          </>
        )}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>
    </div>
  );
}
