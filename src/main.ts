import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
// import * as session from 'express-session';
// import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: true });

  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false,
  }));
  // app.use(
  //   session({
  //     secret: 'keyboard cat',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { maxAge: 60000 },
  //   })
  // )

  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
