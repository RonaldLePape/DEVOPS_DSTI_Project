# K3s setup and configuration

K3s is a lightweight version of K8s


## System update:

  apt update && sudo apt upgrade -y

## Install K3s in one command:

  version v1.29 to support istio: 
      curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION="v1.29.15+k3s1" sh -

## Declare Docker Hub credentials in K3S to access private repo:

  kubectl create secret docker-registry regcred \
    --docker-username=ronaldlepape \
    --docker-password=************************* \
    --docker-email=ronald.lepape@gmail.com

## K3s configuration : Apply Yaml files

  kubectl apply -f pvc.yaml
  kubectl apply -f postgres_config.yaml
  kubectl apply -f node_app_config_config.yaml
  kubectl apply -f gateway_config.yaml

## Useful commands:

  kubectl get pods
  kubectl get pvc
  kubectl get pv
  kubectl get services
  kubectl get deployments

## Describe (get errors):
  kubectl describe pod pod_name

## Accessing a pod's console:

  kubectl exec -it pod_name -- bash