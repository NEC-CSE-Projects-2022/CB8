import React, { useState } from "react";

/* ================= REQUIRED HR COLUMNS ================= */
const REQUIRED_COLUMNS = [
  
  "Age",
  "MonthlyIncome",
  "DistanceFromHome",
  "JobSatisfaction",
  "JobInvolvement",
  "WorkLifeBalance",
  "OverTime",
  "YearsAtCompany"
];


export default function Validation() {
  const [csvFile, setCsvFile] = useState(null);
  const [bulkData, setBulkData] = useState(null);
  const [shapData, setShapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= CSV VALIDATION ================= */
  const validateCsv = async (file) => {
    if (!file) return "Please upload a CSV file.";
    if (!file.name.toLowerCase().endsWith(".csv"))
      return "Only CSV files are allowed.";

    const text = await file.text();
    const lines = text.trim().split("\n");

    if (lines.length < 2)
      return "CSV must contain header and at least one data row.";

    const headers = lines[0].split(",").map(h => h.trim());

    const missingColumns = REQUIRED_COLUMNS.filter(
      col => !headers.includes(col)
    );

    if (missingColumns.length > 0) {
      return `Invalid HR CSV file.`;
    }

    return null; // ✅ VALID CSV
  };

  /* ================= PREDICT ================= */
  const handlePredict = async () => {
    if (!csvFile) {
      setError("Please upload a valid HR CSV file.");
      return;
    }

    setLoading(true);
    setError(null);
    setBulkData(null);
    setShapData(null);

    try {
      const err = await validateCsv(csvFile);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await fetch("http://localhost:5000/predict_csv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setBulkData(data.predictions);
    } catch {
      setError("Server error while predicting.");
    }

    setLoading(false);
  };

  /* ================= SHAP ================= */
  const handleBulkShap = async () => {
    if (!csvFile) {
      setError("Upload CSV first.");
      return;
    }

    if (shapData) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await fetch("http://localhost:5000/shap_global", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        setError("SHAP table not generated.");
        setLoading(false);
        return;
      }

      setShapData(data);
    } catch {
      setError("SHAP failed.");
    }

    setLoading(false);
  };

  /* ================= RESET ================= */
  const handleReset = () => {
    setCsvFile(null);
    setBulkData(null);
    setShapData(null);
    setError(null);
    document.getElementById("csvInput").value = "";
  };

  return (
    <div className="min-h-screen p-6">

      <h1 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center">
        Fair-ExplainHR Validation
      </h1>

      {/* Upload Section */}
      <div className="bg-green-200 p-6 rounded-xl shadow mb-6">
        <input
          id="csvInput"
          type="file"
          accept=".csv"
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
            setError(null);
          }}
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={handlePredict}
            disabled={!csvFile}
            className={`px-5 py-2 rounded text-white
              ${csvFile ? "bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Predict
          </button>

          <button
            onClick={handleBulkShap}
            disabled={!bulkData || shapData}
            className="bg-blue-600 disabled:opacity-50 text-white px-5 py-2 rounded"
          >
            Explain with SHAP
          </button>

          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Reset
          </button>
        </div>

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Predictions */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">📊 Predictions</h2>

          {bulkData ? (
            <table className="min-w-full border">
              <thead className="bg-blue-100">
                <tr>
                  <th className="p-3 border">Employee ID</th>
                  <th className="p-3 border">Prediction</th>
                  <th className="p-3 border">Probability</th>
                </tr>
              </thead>
              <tbody>
                {bulkData.map((row, i) => (
                  <tr key={i}>
                    <td className="p-3 border">{row.Employee_ID}</td>
                    <td className="p-3 border">{row.Prediction}</td>
                    <td className="p-3 border">{row.Probability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Upload valid HR CSV and click Predict.</p>
          )}
        </div>

        {/* SHAP */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h2 className="text-xl font-semibold mb-4">🔍 SHAP Feature Importance</h2>

          {shapData ? (
            <div className="overflow-y-auto max-h-[500px]">
              <table className="min-w-full border">
                <thead className="bg-indigo-100 sticky top-0">
                  <tr>
                    <th className="p-2 border text-left">Feature</th>
                    <th className="p-2 border text-right">Mean |SHAP|</th>
                  </tr>
                </thead>
                <tbody>
                  {shapData.map((row, i) => (
                    <tr key={i}>
                      <td className="p-2 border">{row.feature}</td>
                      <td className="p-2 border text-right">{row.importance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              Click <b>Explain with SHAP</b> to view feature importance.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
