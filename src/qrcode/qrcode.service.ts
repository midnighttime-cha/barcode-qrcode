import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
const QRCode = require('qrcode');

@Injectable()
export class QrcodeService {
  async genQrcode(query: any = null) {
    try {
      if (query) {
        const { text } = query;
        const options = {
          errorCorrectionLevel: 'H',
          type: 'image/jpeg',
          quality: 0.3,
          margin: 0,
          color: {
            dark: "#000000",
            light: "#FFFFFF"
          }
        };
        return await QRCode.toDataURL(`${text}`, options);
      } else {
        throw new HttpException("Undefined param require.", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`[QRCode fail.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
