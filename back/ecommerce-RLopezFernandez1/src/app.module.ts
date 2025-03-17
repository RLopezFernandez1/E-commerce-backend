import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UsersModule, ProductsModule, AuthModule, CategoriesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:(config:ConfigService)=>config.get('typeorm')
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    OrdersModule,
    FileUploadModule,
   ],
  controllers: [],
  providers: [],
})
export class AppModule {}
