import { Test, TestingModule }    from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request               from 'supertest';
import { AppModule }              from '../src/app.module';

describe('CommentController (e2e)', () => {
  let app        : INestApplication;
  let articleId  : string;
  let commentId  : string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();

    // Pre-create an article
    const artRes = await request(app.getHttpServer())
      .post('/article')
      .send({ title: 'Understanding Node.js Streams and Buffers',
        content: 'Streams allow you to process data chunk by chunk without loading the entire file into memory. This article explains readable, writable, transform, and duplex streams with practical examples using the fs and stream modules.' });
    articleId = artRes.body.id;
  });

  afterAll(async () => { await app.close(); });

  // Scenario 1: GET without articleId → 400
  it('GET /comment without articleId → 400', async () => {
    const res = await request(app.getHttpServer()).get('/comment');
    expect(res.status).toBe(400);
  });

  // Scenario 2: POST create comment → 201
  it('POST /comment → 201', async () => {
    const res = await request(app.getHttpServer())
      .post('/comment')
      .send({ content: 'Great article!', articleId });
    expect(res.status).toBe(201);
    expect(res.body.content).toBe('Great article!');
    expect(res.body.articleId).toBe(articleId);
    commentId = res.body.id;
  });

  // Scenario 3: POST non-existing articleId → 422
  it('POST /comment with invalid articleId → 422', async () => {
    const res = await request(app.getHttpServer())
      .post('/comment')
      .send({
        content  : 'Great article!',
        articleId: '550e8400-e29b-41d4-a716-446655440000',
      });
    expect(res.status).toBe(422);
  });

  // Scenario 4: POST missing fields → 400
  it('POST /comment missing content → 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/comment')
      .send({ articleId });
    expect(res.status).toBe(400);
  });

  // Scenario 5: GET comments for article → 200 paginated
  it(`GET /comment?articleId → 200 paginated`, async () => {
    const res = await request(app.getHttpServer())
      .get(`/comment?articleId=${articleId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  // Scenario 6: DELETE comment → 204
  it('DELETE /comment/:id → 204', async () => {
    const res = await request(app.getHttpServer()).delete(`/comment/${commentId}`);
    expect(res.status).toBe(204);
  });

  // Scenario 7: GET deleted comment → 404
  it('DELETE /comment/:id already deleted → 404', async () => {
    const res = await request(app.getHttpServer()).delete(`/comment/${commentId}`);
    expect(res.status).toBe(404);
  });

  // Scenario 8: Cascade — delete article deletes comments
  it('Cascade: deleting article removes its comments', async () => {
    // Create article and comment
    const artRes = await request(app.getHttpServer())
      .post('/article')
      .send({ title: 'Great Article', content: 'Content' });
    const newArticleId = artRes.body.id;

    const comRes = await request(app.getHttpServer())
      .post('/comment')
      .send({ content: 'Great Article', articleId: newArticleId });
    const newCommentId = comRes.body.id;

    // Delete article
    await request(app.getHttpServer()).delete(`/article/${newArticleId}`);

    // Comment should be gone
    const delRes = await request(app.getHttpServer()).delete(`/comment/${newCommentId}`);
    expect(delRes.status).toBe(404);
  });
});