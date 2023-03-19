import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './database';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as passport from 'passport';

async function bootstrap() {
  dotenv.config();
  await AppDataSource.initialize();
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const cors = {
    origin: [
      process.env.CLIENT_URL,
      'http://localhost:8001',
      'http://localhost:3030',
      '*',
    ],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  };
  app.enableCors(cors);
  // app.enableCors({
  //   origin: process.env.CLIENT_URL,
  //   methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  //   allowedHeaders: 'Content-Type, Accept',
  //   credentials: true,
  // });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use((req, res, next) => {
    console.log(req.session, req.cookies);
    next();
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
