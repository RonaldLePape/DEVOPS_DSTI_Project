# NGINX and CERTBOT setups

Nginx will reverse-proxy incoming connections from Internet by relaying to http://127.0.0.1:31152 (Istio Ingress NodePort)
If an incoming connection is HTTP, it will be automatically redirected to HTTPS

Prerequisite for HTTPS (Certbot): having control of a domain name in order to create DNS entries.


## Nginx install:

  install:
      apt update
      apt install nginx
  
  config (see ""Minimal_HTTP_before_CertBot" config file in "Config" subfolder).
  NB: Certbot deployment will later modify/complete "default" file :
      vim /etc/nginx/sites-available/default

  testing config:
      nginx -t
  
  reload nginx:
      systemctl relaod nginx



## Certbot install and useful commands:

Certbot will ask a TLS certificate to Let's Encrypt certificate authority. A cron job is set up during Certbot install to allow automatic renewal.

  install:
      apt update
      apt install certbot python3-certbot-nginx -y

  run Certbot:
      certbot --nginx -d www.ronaldlepape.fr

  test Certbot (no effect):
      certbot renew --dry-run

