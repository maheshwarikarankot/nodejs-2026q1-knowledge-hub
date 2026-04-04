import { Test, TestingModule }    from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request               from 'supertest';
import { AppModule }              from '../src/app.module';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;
  let articleId: string;
  let categoryId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Pre-create a category for filtering tests
    const catRes = await request(app.getHttpServer())
      .post('/category')
      .send({ name: 'Tech', description: 'Technology articles' });
    categoryId = catRes.body.id;
  });

  afterAll(async () => { await app.close(); });

  // Scenario 1: GET all — empty 
  it('GET /article → 200 paginated', async () => {
    const res = await request(app.getHttpServer()).get('/article');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
  });

  // Scenario 2: POST create article → 201
  it('POST /article → 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/article')
      .send({
        title  : 'Understanding Node.js Streams and Buffers',
        content: 'Streams allow you to process data chunk by chunk without loading the entire file into memory. This article explains readable, writable, transform, and duplex streams with practical examples using the fs and stream modules.',
        status : 'published',
        tags   : ["nodejs", "streams", "performance"],
      });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Understanding Node.js Streams and Buffers');
    expect(res.body.status).toBe('published');
    expect(res.body.tags).toContain('nodejs');
    articleId = res.body.id;
  });

  // Scenario 3: POST missing required fields → 400 
  it('POST /article missing content → 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/article')
      .send({ title: 'Understanding Node.js Streams and Buffers' });
    expect(res.status).toBe(400);
  });

  // Scenario 4: GET by id → 200
  it('GET /article/:id → 200', async () => {
    const res = await request(app.getHttpServer()).get(`/article/${articleId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(articleId);
  });

  // Scenario 5: PUT update article → 200
  it('PUT /article/:id → 200 updated', async () => {
    const res = await request(app.getHttpServer())
      .put(`/article/${articleId}`)
      .send({ status: 'published', categoryId });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('published');
    expect(res.body.categoryId).toBe(categoryId);
  });

  // Scenario 6: Filter by status → 200
  it('GET /article?status=published → filtered', async () => {
    const res = await request(app.getHttpServer())
      .get('/article?status=published');
    expect(res.status).toBe(200);
    res.body.data.forEach((a: any) => expect(a.status).toBe('published'));
  });

  // Scenario 7: Filter by categoryId → 200
  it('GET /article?categoryId=xxx → filtered', async () => {
    const res = await request(app.getHttpServer())
      .get(`/article?categoryId=${categoryId}`);
    expect(res.status).toBe(200);
    res.body.data.forEach((a: any) => expect(a.categoryId).toBe(categoryId));
  });

  // Scenario 8: Filter by tag → 200
  it('GET /article?tag=nodejs → filtered', async () => {
    const res = await request(app.getHttpServer()).get('/article?tag=nodejs');
    expect(res.status).toBe(200);
    res.body.data.forEach((a: any) => expect(a.tags).toContain('nodejs'));
  });

  // Scenario 9: GET invalid uuid → 400
  it('GET /article/invalid-id → 400', async () => {
    const res = await request(app.getHttpServer()).get('/article/not-valid');
    expect(res.status).toBe(400);
  });

  // Scenario 10: DELETE → 204 
  it('DELETE /article/:id → 204', async () => {
    const res = await request(app.getHttpServer()).delete(`/article/${articleId}`);
    expect(res.status).toBe(204);
  });

  // Scenario 11: GET deleted → 404 
  it('GET deleted article → 404', async () => {
    const res = await request(app.getHttpServer()).get(`/article/${articleId}`);
    expect(res.status).toBe(404);
  });
});