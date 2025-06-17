# Ronald's DEVOPS project for DSTI

### Implementing DevOps technologies, methodologies and philosophy

----
<div style="display: flex; gap: 10px;">
  <img src="https://github.com/kubernetes/kubernetes/raw/master/logo/logo.png" width="100">
  <img src="https://avatars.githubusercontent.com/u/5429470?s=200&v=4" width="100">
  <img src="https://avatars.githubusercontent.com/u/1507452?s=200&v=4" width="100">
  <img src="https://avatars.githubusercontent.com/u/23534644?s=200&v=4" width="100">
  <img src="https://avatars.githubusercontent.com/u/3380462?s=200&v=4" width="100">
  <img src="https://avatars.githubusercontent.com/u/1412239?s=200&v=4" width="100">  
  <img src="https://avatars.githubusercontent.com/u/22105643?s=200&v=4" width="100">  
</div>

----

## Summary

The goal of this project is to create a CI/CI pipeline, using several Devops tools. A [NodeJS application] exposes webservices that allow simple user management. The data are persisted in a Postgres database. 

- a standardized Ubuntu server id provided to developpers as a Virtaul Machine, using Vagrant+Ansible. The developper uses Git to push new versions in GitLab, which triggers the pipeline.
- a copy of this repo is created in [GitLab] in order to use GitLab Actions for the CI/CD pipeline. Three stages are implemented: Test, Build and Deploy. 
- the application is deployed in AWS in a EC2 instance running a lightweight version of Kubernetes (K3s), and Nginx (+ Certbot) as a reverse Proxy. For observability and monitoring, Prometheus and Grafana are also deployed. Both can be accessed via the application's landing page.


List of DevOps tools:

- Git
- GitLab
- Vagrant
- Ansible
- Docker
- Docker Compose
- Kubernetes
- Nginx
- Prometheus
- Grafana


## Documentation:

Specific README file can be found in each project's subdirectory


## Landing page:

![Landing Ppage](./Images/Landing_page.png)

## GitLab pipeline:

The pipelineand its 3 stages is described in the .gitlab-ci.yml at the root of the repository. Below is a view of 3 pipeline executions. When the project is pushed to the "master" branch, all 3 stages are run in  sequence (Test, Build, Deply). For a push to any other branch, only the Test stage is run. This ensure that test versions are not deployed in AWS.

- The 3 stages are defined at the beginning of .gitlab-ci.yaml file:
  
```
stages:
  - test
  - build
  - deploy

.... Build and Deploy stages are controlled by GitLab rule:

rules:
  - if: '$CI_COMMIT_BRANCH == "master"'
    when: always
  - when: never
```

- Pipeline executions:


![GitLab Pipeline](./Images/GitlabCICD_actions.png)



## Visualizing canary deployment with Prometheus:

A canary deployment consists of running two versions of the application (the old one and the new one) simultaneously. Incoming connections are then distributed between the two, with only a small percentage directed to the new version. This approach ensures minimal disruption if the new version fails to meet expectations (by redirecting 100% of traffic back to the old version), or allows for a gradual increase in traffic to the new version if the deployment goes well.

- Canary deployment defined at Istio level in Kubernetes's VirtualService:

````
  ........
  http:
  - route:
    - destination:
        host: mywebapp-service
        subset: v1
      weight: 90
    - destination:
        host: mywebapp-service
        subset: v2
      weight: 10
````



- Prometheus shows how traffic is distributed in a 90-10 manner during a load test:


![Prometheus](./Images/Canary_deployment_Prometheus.png)


[NodeJS application]: https://www.ronaldlepape.fr
[GitLab]: https://gitlab.com/ronaldlepape-group/DEVOPS_DSTI_Project




