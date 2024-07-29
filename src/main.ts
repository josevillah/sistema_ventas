import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  app.use(
    session({
      secret: 'my-secret', // Cambia esto a una clave secreta segura
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // Debe ser true si usas HTTPS
        maxAge: 60000, // Tiempo de vida de la cookie en milisegundos
      },
    }),
  );

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}

bootstrap();
