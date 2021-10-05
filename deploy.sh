#!/bin/bash
git pull origin master
docker stop barcode-qrcode || true && docker rm barcode-qrcode || true
docker rmi nestjs-barcode-qrcode || true
docker build -t nestjs-barcode-qrcode .
docker run -d -p 3007:3000 \
--restart=always \
-v $(pwd)/log:/app/_logfile \
--name barcode-qrcode \
nestjs-barcode-qrcode