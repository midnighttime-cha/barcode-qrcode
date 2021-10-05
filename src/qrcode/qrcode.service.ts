import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
const QRCode = require('qrcode');

@Injectable()
export class QrcodeService {
  async genQrcode(query: any = null) {
    try {
      if (query) {
        const { text, errorCorrectionLevel, type, quality, margin, colorDark, colorLight, version, mode } = query;
        const options = {};

        if (typeof errorCorrectionLevel !== "undefined") {
          options['errorCorrectionLevel'] = errorCorrectionLevel;
        } else {
          options['errorCorrectionLevel'] = "H";
        }

        if (typeof type !== "undefined") {
          options['type'] = type;
        } else {
          options['type'] = "image/jpeg";
        }

        if (typeof mode !== "undefined") {
          options['mode'] = mode;
        }

        if (typeof quality !== "undefined") {
          options['quality'] = quality;
        } else {
          options['quality'] = 0.3;
        }

        if (typeof margin !== "undefined") {
          options['margin'] = margin;
        } else {
          options['margin'] = 0;
        }

        if (typeof colorDark !== "undefined" || typeof colorLight !== "undefined") {
          options['color'] = {
            dark: `#${colorDark}`,
            light: `#${colorLight}`,
          }
        } else {
          options['color'] = {
            dark: "#000000",
            light: "#FFFFFF"
          };
        }

        if (typeof version !== "undefined") {
          options['version'] = version;
        }

        return await QRCode.toDataURL(`${text}`, options);
      } else {
        throw new HttpException("Undefined param require.", HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(`[QRCode fail.] => ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
}
