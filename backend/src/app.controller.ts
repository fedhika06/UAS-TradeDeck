import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint()
  healthCheck() {
    return {
      status: 'ok',
      service: 'trade-market-api',
      docs: '/docs',
    };
  }
}
