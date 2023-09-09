import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowModule } from './workflow/workflow.module';
import { NodeModule } from './node/node.module';
import { EdgeModule } from './edge/edge.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_PATH,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    WorkflowModule,
    NodeModule,
    EdgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
