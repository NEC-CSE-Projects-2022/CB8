export default function SHAPViz({ shapData }) {
  if (!shapData) return null;

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border mt-8">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">
        🔍 SHAP Explainability Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Global SHAP Summary</h3>
          <img src={shapData.summaryUrl} alt="SHAP Summary" />
        </div>

        <div>
          <h3 className="font-semibold mb-2">Local SHAP Explanation</h3>
          <iframe
            src={shapData.forceUrl}
            className="w-full h-[500px] border"
            title="SHAP Force Plot"
          />
        </div>
      </div>
    </div>
  );
}