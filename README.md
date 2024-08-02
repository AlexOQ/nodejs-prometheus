# Node.js Application with Prometheus Monitoring

This repository contains a Node.js application that is monitored using Prometheus. The setup includes a Helm chart for deploying the application that includes a `ServiceMonitor` for Prometheus to scrape metrics from the application.

## Prerequisites

- Kubernetes cluster
- Helm installed

## Prometheus Stack

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus-stack prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```
## Application

#### Build
```
docker build -t <your-repository>:latest .
docker push <your-repository>
```

#### Deploy
```
helm dep up helm/
helm install --namespace nodejs-prometheus nodejs-prometheus helm/ --set image.repository=<your-repository> --create-namespace
```

#### Port-forward your application

```
kubectl port-forward svc/nodejs-prometheus-nodejs-prometheus 3001:3000 -n nodejs-prometheus
```

#### Generate some traffic
```
for i in {1..100}; do
  curl http://localhost:3001
done

```

Open your web browser and navigate to `http://localhost:3001/metrics`.

Verify that your custom metrics are listed:
```
# HELP node_request_operations_total The total number of processed requests
# TYPE node_request_operations_total counter
node_request_operations_total 210

# HELP node_request_duration_seconds Histogram of request durations in seconds
# TYPE node_request_duration_seconds histogram
node_request_duration_seconds_bucket{le="0.1"} 210
node_request_duration_seconds_bucket{le="0.5"} 210
node_request_duration_seconds_bucket{le="1"} 210
node_request_duration_seconds_bucket{le="1.5"} 210
node_request_duration_seconds_bucket{le="2"} 210
node_request_duration_seconds_bucket{le="2.5"} 210
node_request_duration_seconds_bucket{le="3"} 210
node_request_duration_seconds_bucket{le="+Inf"} 210
node_request_duration_seconds_sum 0.09237869700000005
node_request_duration_seconds_count 210
```

## Check Prometheus has picked up our application
#### Port-forward Prometheus server
```
kubectl port-forward svc/prometheus-kube-prometheus-prometheus 9090:9090 -n monitoring
```

Open your web browser and navigate to `http://localhost:9090/targets`.

Verify that `nodejs-prometheus-servicemonitor` is listed and up and running.

## Grafana
#### Port-Forward Grafana
```
kubectl port-forward svc/prometheus-stack-grafana 3000:80 -n monitoring
```
#### Login to Grafana
1. Open your web browser and navigate to `http://localhost:3000`.
2. Login with the default credentials `admin/prom-operator`.
3. Go to Dashboards -> New -> Import.
4. Upload dashboard JSON file using provided `example-dashboard.json`.
5. The result should be similar to provided `example-dashboard.jpeg`.
