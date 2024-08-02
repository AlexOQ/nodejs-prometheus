const express = require("express");
const client = require("prom-client");
const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;

// Probe every 5th second.
collectDefaultMetrics({ timeout: 5000 });

const counter = new client.Counter({
  name: "node_request_operations_total",
  help: "The total number of processed requests",
});

const histogram = new client.Histogram({
  name: "node_request_duration_seconds",
  help: "Histogram of request durations in seconds",
  buckets: [0.1, 0.5, 1, 1.5, 2, 2.5, 3],
});

app.get("/", (req, res) => {
  counter.inc();
  const end = histogram.startTimer();
  res.send("Hello World");
  end();
});

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  try {
    const metrics = await client.register.metrics();
    res.end(metrics);
  } catch (err) {
    res.status(500).end(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
