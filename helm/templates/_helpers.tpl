{{- define "nodejs-prometheus.name" -}}
{{- .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "nodejs-prometheus.fullname" -}}
{{- printf "%s-%s" (include "nodejs-prometheus.name" .) .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
