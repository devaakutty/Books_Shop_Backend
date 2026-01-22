const app = require("./api/index");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// ✅ This file is ONLY for local development
app.listen(PORT, () => {
  console.log(`🚀 Local Server running at http://localhost:${PORT}`);
});
