const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function measureHotReload(options = {}) {
  const {
    url = "http://localhost:3000",
    sourceFile = "./src/App.js", // Adjust based on your project structure
    editLine = 11, // Line number to modify
    command = "npm",
    args = ["start"],
  } = options;

  // Start the development server
  const devServer = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });

  let browser, page;

  try {
    // Wait for server to start
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });
    page = await browser.newPage();

    // Navigate to the page
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 100000,
    });

    // Initial render time
    const initialRenderStart = Date.now();
    await page.reload({ waitUntil: "networkidle0" });
    const initialRenderTime = Date.now() - initialRenderStart;

    // Read source file
    const sourceFilePath = path.resolve(sourceFile);
    const originalContent = fs.readFileSync(sourceFilePath, "utf8");

    // Modify source file to trigger hot reload
    const modifiedContent = originalContent
      .split("\n")
      .map((line, index) =>
        index === editLine - 1
          ? `// Modified at ${new Date().toISOString()}`
          : line
      )
      .join("\n");

    // Measure hot reload time
    const hotReloadStart = Date.now();

    // Write modified content
    fs.writeFileSync(sourceFilePath, modifiedContent);

    // Wait for page to update
    await page.waitForNavigation({
      waitUntil: "networkidle0",
      timeout: 10000,
    });

    const hotReloadTime = Date.now() - hotReloadStart;

    // Restore original content
    fs.writeFileSync(sourceFilePath, originalContent);

    console.log("Hot Reload Performance:");
    console.log(`Initial Render Time: ${initialRenderTime}ms`);
    console.log(`Hot Reload Time: ${hotReloadTime}ms`);

    return {
      initialRenderTime,
      hotReloadTime,
    };
  } catch (error) {
    console.error("Error measuring hot reload:", error);
    return null;
  } finally {
    // Cleanup
    if (browser) await browser.close();
    if (devServer) devServer.kill();
  }
}

// Run the benchmark
measureHotReload().catch(console.error);
