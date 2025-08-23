import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ProductsModule],
  providers: [PrismaService],
})
export class AppModule {}