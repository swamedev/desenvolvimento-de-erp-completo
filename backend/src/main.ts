import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 🔥 CORS SIMPLES E FUNCIONAL
  app.enableCors();
  
  await app.listen(3001);
  console.log('🚀 Backend rodando com CORS em http://localhost:3001');
}
bootstrap();