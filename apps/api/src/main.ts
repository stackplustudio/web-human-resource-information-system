import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Daftarin semua domain yang boleh akses API lu di sini
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://web-human-resource-information-syst.vercel.app',
      'https://hris.stackplustudio.com' // 👈 INI DOMAIN BARU LU, WAJIB MASUK!
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, 
  });

  const port = process.env.PORT || 3001;
  await app.listen(port); 
  console.log(`🚀 Application is running on port: ${port}`);
}
bootstrap();