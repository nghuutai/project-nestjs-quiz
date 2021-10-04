import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthJwtService } from './auth-jwt.service';
import { AuthJwtController } from './auth-jwt.controller';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule, JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: parseInt(process.env.EXPIRE_TOKEN) }
    }),
  })],
  providers: [AuthJwtService, LocalStrategy, JwtStrategy, TransformInterceptor],
  controllers: [AuthJwtController],
  exports: [AuthJwtService]
})
export class AuthJwtModule {}
