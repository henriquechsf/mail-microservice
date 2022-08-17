import { Module } from '@nestjs/common';
import { ClientProxyPdiGazin } from './client-proxy';

@Module({
  providers: [ClientProxyPdiGazin],
  exports: [ClientProxyPdiGazin],
})
export class ProxyrmqModule {}
