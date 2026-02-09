import React from "react";
import { Link } from "react-router-dom";

export default function Methodology() {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto bg-green-200 p-6 rounded-xl shadow mb-6  rounded-2xl shadow-xl p-8">

        {/* BACK ARROW */}
        <div className="mb-6">
          <Link
            to="/"
            className="text-indigo-700 font-semibold hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-extrabold text-indigo-800 mb-6 text-center">
          Methodology of Fair-ExplainHR
        </h1>

        {/* INTRO */}
        <p className="text-gray-700 leading-relaxed mb-8">
          The Fair-ExplainHR framework follows a structured, ethical, and
          explainable machine learning pipeline designed to predict employee
          attrition with high accuracy and fairness. The methodology integrates
          data preprocessing, human-centric feature engineering, deep ensemble
          modeling, explainability, and fairness evaluation, as proposed in the
          conference paper.
        </p>

        {/* DATASET */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            1. Dataset Description
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The system is trained using the IBM HR Analytics Employee Attrition
            dataset, which contains 1,470 employee records with more than 35
            features. These features include demographic attributes, job-related
            information, work behavior, and performance indicators. The target
            variable is <strong>Attrition</strong>, representing whether an
            employee leaves the organization.
          </p>
        </section>

        {/* PREPROCESSING */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            2. Data Preprocessing
          </h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Categorical features encoded using label and one-hot encoding</li>
            <li>Removal of redundant and low-variance features</li>
            <li>Z-score standardization applied to numerical attributes</li>
            <li>SMOTE used to address class imbalance in attrition labels</li>
          </ul>
        </section>

        {/* FEATURE ENGINEERING */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            3. Feature Engineering
          </h2>
          <p className="text-gray-700 mb-3">
            To incorporate human-centric signals, the following engineered
            features were introduced:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>
              <strong>Burnout Index:</strong> Captures stress caused by overtime,
              low work-life balance, and poor environment satisfaction
            </li>
            <li>
              <strong>Engagement Score:</strong> Derived from job satisfaction
              and job involvement
            </li>
            <li>
              <strong>Economic Stress Indicator:</strong> Combines monthly income
              and distance from home to reflect financial strain
            </li>
          </ul>
        </section>

        {/* MODEL */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            4. Deep Ensemble Model Architecture
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The prediction engine employs a deep stacking ensemble consisting
            of three base models:
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2 mt-3">
            <li><strong>XGBoost</strong> for high-performance gradient boosting</li>
            <li><strong>TabNet</strong> for interpretable attention-based learning</li>
            <li><strong>GRU</strong> to capture complex nonlinear feature interactions</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Outputs from these models are combined using a meta-classifier,
            improving generalization and reducing prediction variance.
          </p>
        </section>

        {/* OPTIMIZATION */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            5. Hyperparameter Optimization
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Optuna was used to automatically tune hyperparameters for all base
            models. Stratified cross-validation, early stopping, and dropout
            were applied to prevent overfitting and ensure stable performance.
          </p>
        </section>

        {/* EXPLAINABILITY */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            6. Explainability using SHAP
          </h2>
          <p className="text-gray-700 leading-relaxed">
            SHAP (SHapley Additive exPlanations) was employed to provide global
            and local explanations of predictions. The analysis revealed that
            burnout, engagement, and economic stress features have the highest
            influence on employee attrition decisions.
          </p>
        </section>

        {/* FAIRNESS */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            7. Fairness Evaluation
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Fairness was evaluated across demographic groups such as gender and
            age. The model demonstrated consistent accuracy and AUC scores
            across all groups, confirming unbiased and ethical behavior.
          </p>
        </section>

        {/* FINAL RESULTS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-700 mb-3">
            8. Final Results
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The Fair-ExplainHR deep stacking ensemble achieved superior
            performance compared to individual models.
          </p>
          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li><strong>Accuracy:</strong> 96%</li>
            <li><strong>Precision:</strong> 0.95</li>
            <li><strong>Recall:</strong> 0.94</li>
            <li><strong>F1-Score:</strong> 0.95</li>
            <li><strong>ROC-AUC:</strong> 0.97</li>
          </ul>
          <p className="text-gray-700 mt-4">
            These results confirm that Fair-ExplainHR outperforms traditional
            and hybrid models while maintaining transparency and fairness.
          </p>
        </section>

      </div>
    </div>
  );
}
