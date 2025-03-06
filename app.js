const express = require("express");
const promClient = require("prom-client");
const app = express();
const port = 3000;

// Create a Registry and collect default metrics
promClient.collectDefaultMetrics({ register });

// Define a custom counter metric (optional)
const requestCounter = new promClient.Counter({
  name: "node_request_total",
  help: "Total number of requests received",
});

// Middleware to count every request
app.use((req, res, next) => {
  requestCounter.inc();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!This is a sample application");
});

// Define an endpoint for Prometheus to scrape metrics
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
