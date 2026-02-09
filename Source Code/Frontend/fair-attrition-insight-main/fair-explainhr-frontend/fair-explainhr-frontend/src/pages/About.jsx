import React from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-6xl mx-auto bg-green-200 rounded-2xl shadow-xl p-6">

        {/* TITLE */}
        <h1 className="text-2xl font-extrabold text-indigo-800 mb-3 text-center">
          About the Project Team
        </h1>

        {/* INTRO */}
        <p className="text-gray-700 text-center max-w-4xl mx-auto mb-6 text-sm leading-relaxed">
          The Fair-ExplainHR project was developed as a research-oriented system
          focusing on ethical, explainable, and fairness-aware employee attrition
          prediction, guided by academic supervision and implemented by a student
          research team.
        </p>

        {/* GUIDE SECTION */}
        <h2 className="text-xl font-bold text-indigo-700 mb-3 text-center">
          Project Guide
        </h2>

        <div className="flex justify-center mb-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm w-full md:w-1/2">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-indigo-700 text-white flex items-center justify-center text-lg font-bold">
              SS
            </div>
            <h3 className="text-lg font-semibold text-indigo-800">
              Dr. S.V.N. Sreenivasu
            </h3>
            <p className="text-indigo-600 font-medium text-sm">
              Project Guide & Research Supervisor
            </p>
            <p className="text-gray-700 mt-2 text-xs leading-relaxed">
              Provided academic guidance, research direction, and technical
              supervision throughout the development of the Fair-ExplainHR
              framework and paper preparation.
            </p>
          </div>
        </div>

        {/* TEAM MEMBERS */}
        <h2 className="text-xl font-bold text-indigo-700 mb-4 text-center">
          Student Research Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* MEMBER 1 */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              MS
            </div>
            <h3 className="text-sm font-semibold text-indigo-800">
              Meesala Sivaiah
            </h3>
            <p className="text-indigo-600 text-xs font-medium">
              Model Development & Integration
            </p>
            <p className="text-gray-700 mt-1 text-xs leading-relaxed">
              Developed ML/DL models, backend services, and web integration.
            </p>
          </div>

          {/* MEMBER 2 */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              MM
            </div>
            <h3 className="text-sm font-semibold text-indigo-800">
              Mallela Manikanta
            </h3>
            <p className="text-indigo-600 text-xs font-medium">
              Dataset & Feature Engineering
            </p>
            <p className="text-gray-700 mt-1 text-xs leading-relaxed">
              Handled preprocessing and engineered burnout, engagement, and
              economic stress features.
            </p>
          </div>

          {/* MEMBER 3 */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
              ID
            </div>
            <h3 className="text-sm font-semibold text-indigo-800">
              Ikkurthi Dhanush
            </h3>
            <p className="text-indigo-600 text-xs font-medium">
              Model Evaluation & Analysis
            </p>
            <p className="text-gray-700 mt-1 text-xs leading-relaxed">
              Evaluated performance using accuracy, precision, recall, and
              comparative analysis.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
