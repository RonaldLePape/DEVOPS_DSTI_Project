# Nginx and Certbot

- Nginx will reverse-proxy incoming connections from Internet by relaying to http://127.0.0.1:31152 (Istio Ingress NodePort)
If an incoming connection is HTTP, it will be automatically redirected to HTTPS

- Prerequisite for HTTPS (Certbot): having control of a domain name in order to create DNS entries.


## Nginx install:

- Install:

      ```
      apt update
      apt install nginx
      ```

- Configuration (see "Nginx_config.txt" file).
    
      - to copy in **/etc/nginx/sites-available/default**  AFTER Certbot install

- Testing config:

      ```      
      nginx -t
      ```

- Reload nginx:
      
      ```      
      systemctl relaod nginx
      ```


## Certbot install and useful commands:

- Certbot will ask a TLS certificate to Let's Encrypt certificate authority. A cron job is set up during Certbot install to allow automatic renewal.

- Install:

      ```
      apt update
      apt install certbot python3-certbot-nginx -y
      ```

- Run Certbot to add Certbot config to Nginx:

      ```
      certbot --nginx -d www.ronaldlepape.fr
      ```

- Test Certbot (no effect):
      
      ```      
      certbot renew --dry-run
      ```
