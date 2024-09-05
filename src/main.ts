import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ModuleRef } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const moduleRef = app.get(ModuleRef);

  app.use(
    (
      req: Request & { moduleRef?: ModuleRef },
      _res: Response,
      next: NextFunction,
    ) => {
      req.moduleRef = moduleRef;
      next();
    },
  );

  await app.listen(3000);
}
bootstrap();
