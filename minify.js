// Import necessary modules
const fs = require('fs').promises; // Using the promise-based version of fs for async/await
const path = require('path');
const terser = require('terser');

/**
 * Minifies a JavaScript file using Terser.
 *
 * This function reads a source file, minifies its content using Terser with
 * compression and name mangling, and writes the result to an output file.
 */
async function minifyScript() {
  // --- Configuration ---
  // Set the input and output file paths
  const inputPath = path.join(__dirname, 'code', 'source.js'); // Path to the original source.js
  const outputPath = path.join(__dirname, 'code', 'source.min.js'); // Path to save the minified file

  console.log(`Reading source file from: ${inputPath}`);

  try {
    // Read the source file content
    const code = await fs.readFile(inputPath, 'utf8');

    // Minify the code using Terser
    // Terser's minify function is asynchronous and returns a promise
    const result = await terser.minify(code, {
      compress: true, // Enable compression (optimizes code structure)
      mangle: {
        toplevel: true, // Mangle names in the top-level scope
      },
      output: {
        comments: false, // Remove all comments from the output
      },
      sourceMap: false, // Optionally, you can generate a source map
    });

    // Terser returns the minified code in the 'code' property of the result object.
    // It does not have an 'error' property like UglifyJS; it throws an error on failure.
    const minifiedCode = result.code;

    // Write the minified output to the destination file
    await fs.writeFile(outputPath, minifiedCode);

    console.log(`✅ Minification successful!`);
    console.log(`Output written to: ${outputPath}`);

  } catch (err) {
    // Catch and log any errors that occur during the process
    console.error('🚫 An error occurred during minification:');
    console.error(err);
  }
}

// --- Execution ---
// Before running, make sure to install Terser:
// npm install terser --save-dev

// Run the minification function
minifyScript();
