const { spawn } = require("child_process");
const puppeteer = require("puppeteer");
const net = require("net");

async function waitForPort(port = 3000, maxAttempts = 100) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function tryConnect() {
      attempts++;
      const socket = new net.Socket();

      socket.connect(port, "localhost", () => {
        socket.destroy();
        resolve();
      });

      socket.on("error", () => {
        if (attempts >= maxAttempts) {
          reject(
            new Error(
              `Port ${port} not available after ${maxAttempts} attempts`
            )
          );
        } else {
          setTimeout(tryConnect, 1000);
        }
      });
    }

    tryConnect();
  });
}

async function measureFirstRender(options = {}) {
  const {
    url = "http://localhost:3000",
    port = 3000,
    command = "npm",
    args = ["start"],
  } = options;

  const startTime = Date.now();

  // Spawn the development server
  const devServer = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });

  let browser;
  let page;

  try {
    // Wait for the port to be available
    await waitForPort(port);

    // Launch browser
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: { width: 1280, height: 800 },
    });
    page = await browser.newPage();

    // Navigate with retries
    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 100000,
    });

    // Calculate time to first render
    const firstRenderTime = Date.now() - startTime;

    console.log(`Time to first render: ${firstRenderTime}ms`);

    // Optional: Take a screenshot
    await page.screenshot({ path: "first-render.png" });

    return firstRenderTime;
  } catch (error) {
    console.error("Error measuring render time:", error);
    return null;
  } finally {
    // Cleanup
    if (browser) await browser.close();
    if (devServer) {
      // Try to gracefully kill the process
      try {
        process.kill(devServer.pid);
      } catch (killError) {
        console.warn("Could not kill dev server:", killError);
      }
    }
  }
}

// Run the benchmark
measureFirstRender().catch(console.error);
