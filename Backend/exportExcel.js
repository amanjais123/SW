const mongoose = require("mongoose");
const XLSX = require("xlsx");
const fs = require("fs");
require("dotenv").config();

const db = require("./config/database");
db.connect();

const Team = require("./models/Team");

async function exportData() {
  try {
    // Fetch all documents from MongoDB
    const data = await Team.find().lean();

    if (data.length === 0) {
      console.log("⚠️ No data found in the 'teams' collection.");
      process.exit();
    }

    // Convert MongoDB data -> Excel worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");

    const filePath = "output.xlsx";

    // If file exists, delete it first (to avoid EBUSY / lock errors)
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.warn("⚠️ Could not delete old file, it may be open in Excel.");
      }
    }

    // Write new Excel file
    XLSX.writeFile(workbook, filePath);

    console.log("✅ Data exported successfully to output.xlsx");
    process.exit();
  } catch (err) {
    console.error("❌ Error exporting data:", err);
    process.exit(1);
  }
}

exportData();
