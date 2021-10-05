import { Controller, Get, Logger, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiParam } from '@nestjs/swagger';
import { BarcodeService } from './barcode.service';

@Controller('barcode')
export class BarcodeController {
  constructor(
    private barcodeService: BarcodeService
  ) { }

  @ApiQuery({ name: 'type' })
  @ApiQuery({ name: 'text' })
  @ApiQuery({ name: 'code' })
  @Get()
  async genBarcode(@Res() res, @Query() query) {
    const responseData = await this.barcodeService.genBarcode(query);
    res.write('<html><body>');
    res.write(`<img src="${responseData}" />`);
    res.write('</body></html>');
    return res.end();
  }
}
