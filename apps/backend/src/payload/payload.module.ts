import { Module, Scope } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core'
import payload from 'payload'
import config from './../../payload.config'

@Module({
  providers: [
    {
      provide: 'Payload',
      inject: [HttpAdapterHost],
      scope: Scope.DEFAULT,
      useFactory: async (httpAdapterHost: HttpAdapterHost) => {
        console.log('payload init')
        return await payload.init({
          express: httpAdapterHost.httpAdapter.getInstance(),
          secret: process.env.PAYLOAD_SECRET,
          config,
        })
      },
    },
  ],
  exports:['Payload']
})
export class PayloadModule {}

