## Istio setup

  - Getting binaries:

      ```
      curl -L https://istio.io/downloadIstio | sh -
      cd istio-*/bin
      export PATH=$PWD:$PATH
      ```

  - Installing with default profile:
    
      ```
      istioctl install --kubeconfig /etc/rancher/k3s/k3s.yaml --set profile=default --skip-confirmation
      ```

  - Marking default namespace with a label to indicate istio's injection:
      
      ```
      kubectl label namespace default istio-injection=enabled
      ```

  - Viewing the ingress gateway:
      
      ```
      kubectl get svc -n istio-system istio-ingressgateway
      ```

  - Editing istio-ingressgateway config:

      ```
      kubectl edit svc -n istio-system istio-ingressgateway
      ```

    - changing the type from "LoadBalancer" to "NodeType":
    - changing the "port:" from 80 to 8888 (to avoid conflicts)

        ```
        - name: http2
          nodePort: 31234
          port: 8888
          protocol: TCP
          targetPort: 8080
        ```
          
        - the above nodePort value is random in range 30000 - 32000 
        - nodePort value is the value in Nginx config (proxy_pass directive).

  - To only display istio-ingressgateway:

      ```
      kubectl get svc -n istio-system istio-ingressgateway
      ```
    
  - Install istio with "demo" profile to activate Prometheus/Grafana/Kiali:
    
      ```
      sudo ISTIO_KUBECONFIG=/etc/rancher/k3s/k3s.yaml ./bin/istioctl install --set profile=demo --kubeconfig=/etc/rancher/k3s/k3s.yaml
      ```

  - **Uninstalling Traefik who is hijacking host's port 80 !**

      ```
      kubectl delete svc -n kube-system traefik
      kubectl delete deployment -n kube-system traefik
      ```

## Prometheus setup:

  - Installing (a copy of yaml file in Kubernetes folder):

      ```
      kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.26/samples/addons/prometheus.yaml
      ```

  - Checking (Prometheus must be Running):
    
      ```    
     kubectl get pods -n istio-system | grep prometheus
      ```

  - Viewing Prometheus network properties:
      ```    
      kubectl get svc -n istio-system prometheus
      ```

  - Exposing Prometheus via a Service Nodeport (a copy of yaml file in Kubernetes folder):

      ```
      kubectl apply -f prometheus-nodeport.yaml
      ```

## Grafana setup

  - Creating a namespace:

      ```
      kubectl create namespace monitoring
      ```

  - Deploying Grafana:

      ```
      kubectl apply -f 70-grafana_datasource_configmap.yml
      kubectl apply -f 71-grafana_config.yml
      ```

  - Restart Grafana pod:

      ```
      kubectl rollout restart deployment grafana -n monitoring
      ```

  - Importing the dashboard JSON file in Grafana:

    ![Import_dashboard](./Images/Import_Grafana_dashboard.png)



