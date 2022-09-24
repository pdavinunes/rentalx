## Configurando proxy-reverso 

```
$ sudo apt install nginx
$ cd /etc/nginx/sites-available 
$ sudo touch rentalx
$ vim rentalx 
 
# Copie isso! 
 server {
 	listen 80 default_server;
 	listen [::]:80 default_server;
	location / {
        proxy_pass http://localhost:3333;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
# Fim 

$ sudo ln -s /etc/nginx/sites-available/rentalx rentalx
$ sudo rm -rf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
$ sudo service nginx restart
``` 

### Configurando PM2

```
$ sudo npm install pm2 -g
$ cd ~/app/
$ pm2 start ~/app/api/dist/shared/infra/http/server.js --name rentalx
```

### Rodando migrations 

```
~/app/api/.node_modules/.bin/typeorm migration:run
``` 