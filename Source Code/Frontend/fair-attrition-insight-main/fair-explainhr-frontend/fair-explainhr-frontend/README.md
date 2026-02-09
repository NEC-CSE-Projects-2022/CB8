# Fair-ExplainHR Frontend (Vite + React + Tailwind)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Start dev server:
   ```
   npm run dev
   ```
3. Make sure your Flask backend is running at http://127.0.0.1:5000 and has endpoints:
   - POST /predict
   - POST /explain

## Notes
- Update API URL in `src/sections/PredictForm.jsx` if your backend runs elsewhere.
