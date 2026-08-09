import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Wajib agar Next.js (port 3000) tidak diblokir saat nembak API
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
  });

  // Wajib jalan di port 3001 sesuai settingan axios frontend kamu
  await app.listen(3001); 
  console.log(`🚀 Application is running on: http://localhost:3001`);
}
bootstrap();