/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3330;
  const USERS_SERVICE_URL = "http://localhost:3334";
  const TEACHER_SERVICE_URL = "http://localhost:3332";
  const COURSE_SERVICE_URL = "http://localhost:3333";


  // Proxy endpoints
  app.use('/api/users', createProxyMiddleware({
    target: USERS_SERVICE_URL,
    changeOrigin: true,
  }));
  app.use('/api/teachers', createProxyMiddleware({
    target: TEACHER_SERVICE_URL,
    changeOrigin: true,
  }));
  app.use('/api/courses', createProxyMiddleware({
    target: COURSE_SERVICE_URL,
    changeOrigin: true,
  }));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

}

bootstrap();
