import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Wajib agar Next.js di lokal (3000) DAN di Vercel tidak diblokir saat nembak API
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://web-human-resource-information-syst.vercel.app'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  // Wajib pakai process.env.PORT agar Railway bisa menembak port production secara dinamis
  const port = process.env.PORT || 3001;
  await app.listen(port); 
  console.log(`🚀 Application is running on port: ${port}`);
}
bootstrap();