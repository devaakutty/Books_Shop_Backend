const app = require("./api/index");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

// This file is ONLY for your local computer
app.listen(PORT, () => {
  console.log(`🚀 Local Server running at http://localhost:${PORT}`);
});