#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It removes the app directory and creates a new one with a basic layout.
 */

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const appDir = path.join(root, "app");
const appBackupDir = path.join(root, "app-backup");

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Welcome to your fresh app!</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack />;
}
`;

console.log("🔄 Resetting project...");

// Backup the current app directory
if (fs.existsSync(appDir)) {
  if (fs.existsSync(appBackupDir)) {
    fs.rmSync(appBackupDir, { recursive: true, force: true });
  }
  // Copy instead of rename to avoid permission issues
  fs.cpSync(appDir, appBackupDir, { recursive: true });
  console.log("📁 Backed up existing app to app-backup/");
  fs.rmSync(appDir, { recursive: true, force: true });
}

// Create new app directory
fs.mkdirSync(appDir);

// Create index.tsx
fs.writeFileSync(path.join(appDir, "index.tsx"), indexContent);
console.log("✅ Created app/index.tsx");

// Create _layout.tsx
fs.writeFileSync(path.join(appDir, "_layout.tsx"), layoutContent);
console.log("✅ Created app/_layout.tsx");

console.log("\n🎉 Project reset complete!");
console.log("Your previous app code has been backed up to app-backup/");
