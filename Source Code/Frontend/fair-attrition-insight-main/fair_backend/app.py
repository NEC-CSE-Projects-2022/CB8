from flask import Flask, request, jsonify, send_file
import numpy as np
import pandas as pd
import joblib, json, os
from tensorflow.keras.models import load_model
from xgboost import XGBClassifier
from pytorch_tabnet.tab_model import TabNetClassifier
from flask_cors import CORS
import shap

app = Flask(__name__)

# === CORS setup ===
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
     supports_credentials=True)

# === LOAD MODELS & PREPROCESSORS ===
xgb_model = XGBClassifier()
xgb_model.load_model("Models1/models/xgb_model.json")

tabnet_model = TabNetClassifier()
tabnet_model.load_model("Models1/models/tabnet_model.zip")

gru_model = load_model("Models1/models/gru_model.h5")

scaler = joblib.load("Models1/models/scaler.pkl")
selector = joblib.load("Models1/models/feature_selector.pkl")

with open("Models1/columns.json", "r") as f:
    train_columns = json.load(f)


# === PREPROCESS FUNCTION ===
def preprocess_input(input_data):
    df = pd.DataFrame([input_data])
    df = pd.get_dummies(df)

    for col in train_columns:
        if col not in df.columns:
            df[col] = 0

    df = df[train_columns]
    X_scaled = scaler.transform(df)
    X_sel = selector.transform(X_scaled)
    return X_sel, df


# === SINGLE EMPLOYEE PREDICT ===
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    X_sel, _ = preprocess_input(data)

    xgb_proba = xgb_model.predict_proba(X_sel)
    tabnet_proba = tabnet_model.predict_proba(X_sel)
    gru_out = gru_model.predict(X_sel)
    gru_proba = np.hstack([(1 - gru_out), gru_out])

    avg_proba = (xgb_proba + tabnet_proba + gru_proba) / 3
    pred = np.argmax(avg_proba, axis=1)[0]
    prob = float(avg_proba[0][1])

    return jsonify({
        "prediction": "🚨 Employee will leave" if pred else "✅ Employee will stay",
        "probability": round(prob, 4)
    })


# ======================================================
# ✅ FIXED SHAP GLOBAL (FEATURE IMPORTANCE TABLE)
# ======================================================
@app.route("/shap_global", methods=["POST"])
def shap_global():
    try:
        file = request.files.get("file")
        if not file:
            return jsonify({"error": "No CSV uploaded"}), 400

        # 1️⃣ READ CSV
        df_raw = pd.read_csv(file)
        df_raw.replace({"Yes": 1, "No": 0}, inplace=True)

        if "Attrition" in df_raw.columns:
            df_raw.drop(columns=["Attrition"], inplace=True)

        # 2️⃣ ONE-HOT
        df = pd.get_dummies(df_raw)

        # 3️⃣ ALIGN TRAINING COLUMNS
        for col in train_columns:
            if col not in df.columns:
                df[col] = 0
        df = df[train_columns]

        # 4️⃣ SCALE + FEATURE SELECTION (🔥 FIX)
        X_scaled = scaler.transform(df)
        X_sel = selector.transform(X_scaled)

        # 5️⃣ GET SELECTED FEATURE NAMES
        selected_features = np.array(train_columns)[selector.get_support()]

        # 6️⃣ SHAP ON XGBOOST
        explainer = shap.TreeExplainer(xgb_model)
        shap_values = explainer.shap_values(X_sel)

        # 7️⃣ GLOBAL SHAP TABLE
        mean_abs = np.abs(shap_values).mean(axis=0)

        shap_table = sorted(
            [
                {
                    "feature": feature,
                    "importance": round(float(val), 6)
                }
                for feature, val in zip(selected_features, mean_abs)
            ],
            key=lambda x: x["importance"],
            reverse=True
        )

        return jsonify(shap_table)

    except Exception as e:
        print("🔥 SHAP ERROR:", e)
        return jsonify({"error": str(e)}), 500


# === BULK CSV PREDICTION ===
@app.route("/predict_csv", methods=["POST"])
def predict_csv():
    try:
        file = request.files["file"]
        df_raw = pd.read_csv(file)
        df_raw.replace({"Yes": 1, "No": 0}, inplace=True)

        df = pd.get_dummies(df_raw)
        for col in train_columns:
            if col not in df.columns:
                df[col] = 0
        df = df[train_columns]

        X_scaled = scaler.transform(df)
        X_sel = selector.transform(X_scaled)

        xgb_p = xgb_model.predict_proba(X_sel)
        tab_p = tabnet_model.predict_proba(X_sel)

        try:
            gru_out = gru_model.predict(X_sel)
        except:
            gru_out = gru_model.predict(X_sel.reshape(X_sel.shape[0], 1, X_sel.shape[1]))

        if gru_out.ndim == 1 or gru_out.shape[1] == 1:
            gru_p = np.hstack([(1 - gru_out).reshape(-1, 1), gru_out.reshape(-1, 1)])
        else:
            gru_p = gru_out

        avg = (xgb_p + tab_p + gru_p) / 3
        preds = np.argmax(avg, axis=1)
        probs = avg[:, 1]

        results = []
        for i, (p, pr) in enumerate(zip(preds, probs), 1):
            results.append({
                "Employee_ID": i,
                "Prediction": "🚨 Employee will leave" if p else "✅ Employee will stay",
                "Probability": round(float(pr), 4)
            })

        return jsonify({"predictions": results})

    except Exception as e:
        print("CSV ERROR:", e)
        return jsonify({"error": str(e)}), 500
# ============================
# ✅ DATASET VALIDATION
# ============================
def validate_dataset(df_raw):
    # 1️⃣ Empty or too small
    if df_raw.empty or df_raw.shape[1] < 5:
        return False, "❌ Invalid dataset: too few columns."

    # 2️⃣ Feature overlap check
    uploaded_cols = set(df_raw.columns)
    base_train_cols = {c.split("_")[0] for c in train_columns}

    matched = sum(1 for col in uploaded_cols if col in base_train_cols)
    coverage = matched / len(base_train_cols)

    if coverage < 0.6:
        return False, (
            f"❌ Invalid dataset: only {round(coverage*100,2)}% "
            f"required HR features found."
        )

    return True, None

# === HEALTH CHECK ===
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Fair-ExplainHR Backend Running ✅"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)