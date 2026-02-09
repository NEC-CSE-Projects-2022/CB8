import React from "react";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <div className="min-h-screen  to-indigo-100 px-6 py-10 flex items-center">
      <div className="max-w-6xl mx-auto w-full">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 leading-tight">
            Explainable Fairness-Attentive ML(Fair-ExplainHR)
          </h1>

          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
            Ethical and Transparent Attrition Prediction with Engagement,
            Economic, and Behavioral Signals
          </p>

          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
              96% Accuracy
            </span>
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              Explainable AI (SHAP)
            </span>
            <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
              Fairness-Aware Model
            </span>
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Deep Stacking Ensemble
            </span>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">

          {/* LEFT CARD */}
          <div className="bg-green-200 p-6 rounded-xl shadow mb-6  shadow-lg p-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              System Overview
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Fair-ExplainHR is a fairness-aware and explainable deep learning
              framework developed to predict employee attrition in an ethical
              and transparent manner. The system integrates behavioral,
              engagement, and economic signals with a deep stacking ensemble
              composed of <strong>GRU</strong>, <strong>TabNet</strong>, and
              <strong> XGBoost</strong>.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed">
              The framework addresses key limitations of traditional HR
              analytics systems by prioritizing interpretability, fairness,
              and responsible AI-driven decision support.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className=" bg-green-200 p-6 rounded-xl shadow mb-6  shadow-lg p-8 border border-indigo-100">
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">
              Key Contributions
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>• Deep stacking ensemble achieving <strong>96% accuracy</strong></li>
              <li>• Human-centric feature engineering (Burnout, Engagement, Economic Stress)</li>
              <li>• SHAP-based global and local explainability</li>
              <li>• Fairness evaluation across gender and age groups</li>
              <li>• Ethical and transparent HR decision support</li>
            </ul>
          </div>

        </div>

        {/* ACTION SECTION */}
        <div className="bg-green-200 p-6 rounded-xl shadow mb-6  shadow-xl p-8 border border-indigo-200 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo-800 mb-3">
            Attrition Prediction & Validation
          </h2>
          <p className="text-gray-700 mb-6">
            Validate employee attrition risk using the Fair-ExplainHR deep
            ensemble model and gain explainable, fairness-aware insights to
            support responsible HR decisions.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/validation"
              className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl font-semibold transition"
            >
              Open Validation Module
            </Link>

            <Link
              to="/Explainability"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-xl font-semibold transition"
            >
              View Model Insights
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}