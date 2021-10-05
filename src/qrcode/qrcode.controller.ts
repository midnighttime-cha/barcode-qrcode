import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QrcodeService } from './qrcode.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(
    private qrCodeService: QrcodeService
  ) { }

  @ApiQuery({ name: 'type' })
  @ApiQuery({ name: 'text' })
  @ApiQuery({ name: 'code' })
  @Get()
  async genBarcode(@Res() res, @Query() query) {
    const responseData = await this.qrCodeService.genQrcode(query);
    res.write('<html><body>');
    res.write(`<img src="${responseData}" />`);
    res.write('</body></html>');
    return res.end();
  }
}
