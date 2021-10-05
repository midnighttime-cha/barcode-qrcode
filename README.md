# สร้าง Barcode และ QRCode ด้วย Nest.js + Node.js
```bash
docker build -t nestjs-barcode-qrcode .

docker run -d -p 3007:3000 --restart=always \
-v $PWD/log:/app/_logfile \
--name barcode-qrcode \
nestjs-barcode-qrcode
```
