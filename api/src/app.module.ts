import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_PATH } from './config/constants';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ENV_PATH,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
