import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarcodeController } from './barcode/barcode.controller';
import { BarcodeService } from './barcode/barcode.service';
import { QrcodeController } from './qrcode/qrcode.controller';
import { QrcodeService } from './qrcode/qrcode.service';

@Module({
  imports: [],
  controllers: [AppController, BarcodeController, QrcodeController],
  providers: [AppService, BarcodeService, QrcodeService],
})
export class AppModule { }
