import { Controller, Get, HttpStatus, Logger, Query, Res } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QrcodeService } from './qrcode.service';
const fs = require('fs');

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
    const resBase64 = `${responseData}`.replace(/^data:image\/png;base64,/, "");
    await fs.writeFileSync(`./files/qrcode/${query.text}.png`, resBase64, 'base64');
    return await res.status(HttpStatus.OK).sendFile(`${query.text}.png`, { root: "./files/qrcode/" });
  }
}
