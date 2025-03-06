const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 3000;

// Create a Registry and collect default metrics
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

// Define an endpoint for Prometheus to scrape metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Your existing endpoint
app.get('/', (req, res) => {
  res.send('Hello, World! This is the sample application.');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
