const app = require("./api/index");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

// ✅ ONLY for local development
app.listen(PORT, () => {
  console.log(`🚀 Local Server running at http://localhost:${PORT}`);
});
