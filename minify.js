// Import necessary modules
const fs = require('fs').promises;
const path = require('path');
const terser = require('terser');

/**
 * 
 * Run the script using "node minify.js". Github Actions will always run this script, you can do it locally as well.
 * 
 * A comprehensive build script with detailed logging that:
 * 1. Minifies the source JavaScript.
 * 2. Builds a Tampermonkey script from a template.
 * 3. Builds a Chrome Extension content script.
 */
async function runBuild() {
  // --- Configuration: Define all file paths ---
  const paths = {
    source: path.join(__dirname, 'code', 'source.js'),
    minifiedSource: path.join(__dirname, 'code', 'source.min.js'),
    tampermonkeyTemplate: path.join(__dirname, 'code', 'tampermonkey_userscript', 'template.user.js'),
    tampermonkeyOutput: path.join(__dirname, 'code', 'tampermonkey_userscript', 'bm-enhanced.min.js'),
    chromeExtensionOutput: path.join(__dirname, 'code', 'chrome_extension', 'content.js'),
  };

  try {
    console.log('🚀 Starting build process...');
    console.log('--------------------------------------------------');

    // --- 1. Read and minify the source code ---
    console.log('STEP 1: Minifying source code...');
    console.log(`  - Reading source from: ${paths.source}`);
    const sourceCode = await fs.readFile(paths.source, 'utf8');
    const originalSize = Buffer.byteLength(sourceCode, 'utf8');
    console.log(`  - Original size: ${originalSize} bytes`);

    const result = await terser.minify(sourceCode, {
      compress: true,
      mangle: { toplevel: true },
    });
    const minifiedCode = result.code;
    const minifiedSize = Buffer.byteLength(minifiedCode, 'utf8');
    const reduction = (((originalSize - minifiedSize) / originalSize) * 100).toFixed(2);

    await fs.writeFile(paths.minifiedSource, minifiedCode);
    console.log(`  - Minified size: ${minifiedSize} bytes (Reduction: ${reduction}%)`);
    console.log(`  - Minified source written to: ${paths.minifiedSource}`);

    // --- 2. Extract version from source code ---
    console.log('\nSTEP 2: Extracting version number...');
    const versionRegex = /const EXTENSION_VERSION = "([^"]+)"/;
    const match = sourceCode.match(versionRegex);
    if (!match) {
      throw new Error(`Could not find version string matching '${versionRegex}' in ${paths.source}`);
    }
    const version = match[1];
    console.log(`  - Found version: "${version}"`);

    // --- 3. Build the Tampermonkey script ---
    console.log('\nSTEP 3: Building Tampermonkey script...');
    console.log(`  - Reading template from: ${paths.tampermonkeyTemplate}`);
    let templateContent = await fs.readFile(paths.tampermonkeyTemplate, 'utf8');

    console.log('  - Injecting minified code and updating version tag...');
    templateContent = templateContent
      .replace('//INJECT_MINIFIED_CODE_HERE', minifiedCode)
      .replace(/^\/\/ @version .*$/m, `// @version ${version}`);

    await fs.writeFile(paths.tampermonkeyOutput, templateContent);
    console.log(`  - Tampermonkey script written to: ${paths.tampermonkeyOutput}`);

    // --- 4. Build the Chrome Extension script ---
    console.log('\nSTEP 4: Building Chrome Extension script...');
    await fs.writeFile(paths.chromeExtensionOutput, minifiedCode);
    console.log(`  - Chrome Extension script written to: ${paths.chromeExtensionOutput}`);

    console.log('--------------------------------------------------');
    console.log('✨ Build finished successfully!');
    console.log('\nGenerated/Updated Files:');
    console.log(`  1. ${paths.minifiedSource}`);
    console.log(`  2. ${paths.tampermonkeyOutput}`);
    console.log(`  3. ${paths.chromeExtensionOutput}`);

  } catch (err) {
    console.error('\n🚫🚫🚫 BUILD FAILED 🚫🚫🚫');
    console.error('--------------------------------------------------');
    console.error(err);
    console.error('--------------------------------------------------');
    process.exit(1); // Exit with an error code to fail the GitHub Action
  }
}

// --- Execution ---
runBuild();