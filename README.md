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

## Landing page:

![Landingpage](./Images/Landing_page.png)





[NodeJS application]: https://www.ronaldlepape.fr
[GitLab]: https://gitlab.com/ronaldlepape-group/DEVOPS_DSTI_Project
