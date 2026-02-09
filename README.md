
# Team Number – Project Title

## Team Info
- 22471A05H4 — **Meesala Sivaiah** ( [LinkedIn](https://www.linkedin.com/in/meesala-sivaiah-031941380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app) )
_Work Done: Model Development, Backend & Web Integration

- 22471A05H2 — **Mallela Manikanta** ( [LinkedIn](www.linkedin.com/in/manikanta-mallela-68a775301) )
_Work Done: Dataset Processing, Feature Engineering, Documentation

- 22471A05F1 — **Ikkurthi Dhanush** ( [LinkedIn](https://linkedin.com/in/xxxxxxxxxx) )
_Work Done: Model Evaluation & Performance Analysis
---

## Abstract
With a data-driven approach to workforce man agement, forecasting employee attrition is crucial for reducing organizational disruption and maximizing human capital strat egy. Fair-ExplainHR is an improved, explainable, and fairness aware machine learning model for ethically transparent attrition prediction proposed in this work. Inspired by the shortcomings of current models—largely their lack of attention to interpretability, fairness, and human-focused cues—this effort incorporates new behavioral (burnout), engagement, and economic signals into the prediction pipeline. Based on the IBM HR Analytics dataset, the approach combines strong preprocessing with SMOTE for imbalance management, feature engineering, and sophisticated model tuning using Optuna. The prediction engine consists of a deep stack ensemble of GRU-based neural networks, XGBoost, and TabNet, with a meta-classifier coordinating decision-level fusion. In contrast to earlier hybrid models that were limited to 95 % accuracy, Fair-ExplainHR recorded a higher accuracy of 96%, with heavy gains through deep learning integration and explainability. SHAP analysis also provides transparent model decision insights, tackling ethical AI issues.it also promotes responsible AI practices, serving as a benchmark for future attrition prediction systems within corporate HR analytics.

---

## Paper Reference (Inspiration)
👉 Paper Title:-Predicting Employee Attrition: A Comparative Analysis of Machine Learning Models Using the IBM Human Resource Analytics Dataset.

   Author Names:-Rajkumar Govindarajan,N. Komal Kumar,Sudhakar Reddy P,Sai Pravallika E,Dhatri B,Pavan Kumar G.
 ("https://doi.org/10.1016/j.procs.2025.04.659
")

Original conference/IEEE paper used as inspiration for the model.

---

## Our Improvement Over Existing Paper
Compared to existing employee attrition prediction studies, this work improves accuracy through deep ensemble learning, cross-validated hyperparameter tuning, and domain-specific feature engineering. In addition, SHAP-based explainability and a real-time Flask deployment make the model ethical, interpretable, and practical for real-world HR decision-making.

---

## About the Project

### What the project does  
The system predicts whether an employee is likely to leave an organization based on demographic details, job-related attributes, behavioral patterns, engagement levels, and economic factors.
### Why it is useful  
Employee attrition leads to increased recruitment costs, productivity loss, and workforce instability. This model provides a data-driven and ethical decision-support system that helps HR teams identify at-risk employees early and take proactive retention measures.
### General Project Workflow  

**Input →** Employee attributes (demographic, job, behavioral, engagement, economic)
**Processing →** Data cleaning, encoding, scaling, feature engineering, and class balancing (SMOTE)  
**Model →** Trained deep learning and stacked ensemble models (GRU, XGBoost, TabNet)  
**Output →** Attrition prediction (Yes / No)

---

## Dataset Used
👉 **[IBM HR Analytics Employee Attrition](https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset)**

**Dataset Details:**
Total records: 1,470 employee records
Features: Age, Gender, Department, Job Role, OverTime, Job Satisfaction, Work-Life Balance, Monthly Income, Distance From Home, Years at Company, etc.
Target variable: Attrition (Yes / No)
Domain: Human Resource Analytics

---

## Dependencies Used
pandas, 
numpy,
scikit-learn,
XGBoost,
TabNet,
TensorFlow / Keras (GRU),
Optuna,
imbalanced-learn (SMOTE),
SHAP,
matplotlib,
seaborn,
Flask.

---

## EDA & Preprocessing

-Analyzed attrition distribution and feature correlations

-Identified strong relationships between attrition, overtime, job satisfaction, work-life balance, income, and distance from home

-Removed redundant and non-informative features

-Handled missing values using appropriate imputation techniques

-Encoded categorical features using label encoding and one-hot encoding

-Scaled numerical features using standardization

-Applied SMOTE to address class imbalance

-Created domain-specific composite features such as:

-Burnout Index

-Engagement Score

-Economic Stress Indicator

---

## Model Training Info
-Trained multiple classification models:

-XGBoost

-TabNet

-GRU (Gated Recurrent Unit)

-Hyperparameters optimized using Optuna with stratified cross-validation

-Built a deep stacked ensemble by combining XGBoost, TabNet, and GRU predictions using a meta-learner

---

## Model Testing / Evaluation
Stratified train-test split used

Metrics used:

Accuracy

Precision

Recall

F1-score

ROC-AUC

Cross-validation and early stopping used to prevent overfitting
---

## Results
Best Model: Deep Stacked Ensemble

Accuracy: 96%

Precision: 0.95

Recall: 0.94

F1-score: 0.95

ROC-AUC: 0.97

Standalone performance:

XGBoost: 94% accuracy

GRU: 92% accuracy

TabNet: 91% accuracy
---

## Limitations & Future Work
Dataset is limited to a single organization

Temporal employee behavior is not fully modeled

Future work includes:

Real-time HRIS integration

Longitudinal employee behavior tracking

Cross-industry validation

Large-scale enterprise deployment

---

## Deployment Info
Flask-based web application

REST API accepts employee attributes as input

Returns attrition prediction instantly

Can be integrated with HR dashboards and enterprise systems

---
