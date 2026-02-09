import React from "react";
import { useState } from "react";

export default function PredictForm({
  setExplainData,
  setPredictionData,
  setBulkData,
  setLoading,
  setError,
}) {
  const [formData, setFormData] = useState({
    Age: "",
    MonthlyIncome: "",
    JobSatisfaction: "",
    WorkLifeBalance: "",
    YearsAtCompany: "",
    DistanceFromHome: "",
    OverTime: "No",
    JobRole: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ CSV Upload (Bulk Prediction)
  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setPredictionData(null);
    setBulkData(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/predict_csv", {
        method: "POST",
        body: formDataObj,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "CSV Prediction failed");

      setBulkData(data.predictions); // ✅ Set CSV results
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Single Employee Prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBulkData(null);

    try {
      // Convert numeric inputs
      const processedData = {
        ...formData,
        Age: Number(formData.Age),
        MonthlyIncome: Number(formData.MonthlyIncome),
        JobSatisfaction: Number(formData.JobSatisfaction),
        WorkLifeBalance: Number(formData.WorkLifeBalance),
        YearsAtCompany: Number(formData.YearsAtCompany),
        DistanceFromHome: Number(formData.DistanceFromHome),
        OverTime: formData.OverTime === "Yes" ? 1 : 0,
      };

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processedData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Prediction failed");

      // ✅ Store updated result (forces re-render)
      setPredictionData({
        age: processedData.Age,
        prediction: data.prediction,
        probability: parseFloat(data.probability), // ensure it's numeric
        timestamp: Date.now(), // trick React to re-render if value is same
      });

      setExplainData(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* === Input Fields === */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              {field}
            </label>
            {field === "OverTime" ? (
              <select
                name="OverTime"
                value={formData.OverTime}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            ) : (
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            )}
          </div>
        ))}
      </div>

      {/* === CSV Upload === */}
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Or Upload CSV for Bulk Prediction
        </label>
        <input
          type="file"
          accept=".csv"
          onChange={handleCSVUpload}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* === Submit Button === */}
      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
      >
        🚀 Predict Attrition
      </button>
    </form>
  );
}
