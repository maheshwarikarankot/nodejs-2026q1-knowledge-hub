import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../src/app.module';

const supertest = require('supertest');

let app: INestApplication;
let requester: any;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.init();
  requester = supertest(app.getHttpServer());
});

afterAll(async () => {
  await app.close();
});

export const request = {
  get: (url: string) => requester.get(url),
  post: (url: string) => requester.post(url),
  put: (url: string) => requester.put(url),
  delete: (url: string) => requester.delete(url),
  patch: (url: string) => requester.patch(url),
};
