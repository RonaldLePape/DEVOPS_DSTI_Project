# Istio setup:


  get binaries:
      curl -L https://istio.io/downloadIstio | sh -
      cd istio-*/bin
      export PATH=$PWD:$PATH

  install with default profile:
      istioctl install --kubeconfig /etc/rancher/k3s/k3s.yaml --set profile=default --skip-confirmation

  mark default namespace with a label to indicate istio's injection:
      kubectl label namespace default istio-injection=enabled

  viewing the ingress gateway:
      kubectl get svc -n istio-system istio-ingressgateway

  getting or Editing istio-ingressgateway config to:
  
      1- change the type from "LoadBalancer" to "NodeType":
      2- change the "port:" from 80 to 8888 (to avoid conflicts)

              - name: http2
                  nodePort: 31152
                  port: 8888
                  protocol: TCP
                  targetPort: 8080

      3- note nodePort value which is the value in Nginx config (proxy_pass directive).

        commands:
           GET: kubectl get svc -n istio-system istio-ingressgateway
           or
           EDIT: kubectl edit svc -n istio-system istio-ingressgateway

    
  install istio with "demo" profile to activate Prometheus/Grafana/Kiali.....   
      sudo ISTIO_KUBECONFIG=/etc/rancher/k3s/k3s.yaml ./bin/istioctl install --set profile=demo --kubeconfig=/etc/rancher/k3s/k3s.yaml

# ==========================================================
# Uninstalling Traefik who is hijacking host's port 80 !
# ==========================================================
      kubectl delete svc -n kube-system traefik
      kubectl delete deployment -n kube-system traefik


# Prometheus setup:

  manual install:
    kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.26/samples/addons/prometheus.yaml

  checking (Prometheus must be Running):
    kubectl get pods -n istio-system | grep prometheus

  Viewing Prometheus network properties:
    kubectl get svc -n istio-system prometheus

  Exposing Prometheus via a Service Nodeport:
    kubectl apply -f prometheus-nodeport.yaml   (file in K3s folder)


