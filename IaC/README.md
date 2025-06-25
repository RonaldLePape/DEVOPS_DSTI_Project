# Developper environment : Vagrant + Ansible
  
  - Vagrant file defines global properties of the developper's Linux server:
    - Linux distribution: Ubuntu
    - Network: DHCP
    - Shared folders with host (developper's PC)
    - Number of CPUs, Memory
    - Installs Ansible
    - Ansible playbook: devserver-config.yml

## The Ansible playbook does: 

  - Adds "postgres" in /etc/hosts for name resolution
  - Installs curl
  - Standard deployment (non containerized):
    - Installs Node.JS 20
    - Installs Postgres 15
    - Sets PostgreSQL authentication from peer (OS user) to md5 (password-based) 
    - Creates a Postgres user
    - Creates a Postgres database
    - Execute SQL scripts (table creation, inserts 3 rows in the table)
  - Containerized deployment:
    - Installs Docker
    - Installs Docker Compose
    - Creates 3 scripts for local app execution: myapp-start, myapp-stop, myapp-test
    - Launches Docker Compose : creates 2 containers (1 for app/Node, 1 for Postgres)

## Networking aspects :

  - Local app listens port 3000
  - Local Postgres listens port 5432
  - Postgres container listens on host port 5433
  - NodeJS container listens on host port 3001

## Good to know:

  - An Ansible playbook can be played manually from inside the VM:

    ```
    user@box$ ansible-playbook /home/dsti_project/IaC/playbooks/dev-config.yml -i localhost, -c local 
    ``` 
  