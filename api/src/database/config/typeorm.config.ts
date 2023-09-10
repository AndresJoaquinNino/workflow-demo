import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import { ENV_PATH } from './../../config';

ConfigModule.forRoot({
  envFilePath: ENV_PATH,
});

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  logging: true,
  synchronize: false,
  entities: [__dirname + '/../../**/*.entity.{js,ts}'],
  seeds: [__dirname + '/../seeds/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
