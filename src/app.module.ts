import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CategoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options),UserModule, ProductModule, AddressModule, OrderModule, OrderItemModule, CategoryModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
