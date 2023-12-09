import { Module } from '@nestjs/common';
import { HttpClientService } from './interfaces/httpClient.service';

@Module({
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class CommonModule {}
