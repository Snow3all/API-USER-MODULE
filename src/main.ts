import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
  console.log('MongoURL: ', process.env.MONGODB_URL);
  console.log('=====> USER_MODULE');
}
bootstrap();
