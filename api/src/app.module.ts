import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_PATH, DatabaseConfig } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowModule } from './workflow/workflow.module';
import { NodeModule } from './node/node.module';
import { EdgeModule } from './edge/edge.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    WorkflowModule,
    NodeModule,
    EdgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
