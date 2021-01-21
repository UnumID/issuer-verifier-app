import { Controller, Get } from '@nestjs/common';
import { HealthResponse } from './dto/healthResponse.dto';

// @ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get('alive')
  checkHealth (): HealthResponse {
    return { status: 'ok' };
  }
}
