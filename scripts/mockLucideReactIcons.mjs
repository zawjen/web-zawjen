import fs from "fs";
import path from "path";
import * as lucideIcons from "lucide-react"; // Import all icons from lucide-react

const outputDir = path.resolve(path.dirname("."), "src", "__mocks__");
const outputFile = path.join(outputDir, "lucide-react.js");

// Ensure the __mocks__ directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Create a mock function for each component
const iconNames = Object.keys(lucideIcons);
const mockFileContent = iconNames
  .map((iconName) => `export const ${iconName} = () => 'svg-icon-mock';`)
  .join("\n");

// Write the mock file
fs.writeFileSync(outputFile, mockFileContent);

console.log(`Mock file created at: ${outputFile}`);
