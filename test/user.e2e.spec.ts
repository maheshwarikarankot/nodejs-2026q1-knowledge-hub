import { Test, TestingModule }    from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request               from 'supertest';
import { AppModule }              from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let createdUserId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Scenario 1: GET all — empty 
  it('GET /user → 200 with paginated empty result', async () => {
    const res = await request(app.getHttpServer()).get('/user');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Scenario 2: POST create user → 201 
  it('POST /user → 201 and created user', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ login: 'testuser', password: 'secret123' });
    expect(res.status).toBe(201);
    expect(res.body.login).toBe('testuser');
    expect(res.body.role).toBe('viewer');
    expect(res.body).not.toHaveProperty('password');
    expect(res.body.id).toBeDefined();
    createdUserId = res.body.id;
  });

  // Scenario 3: POST with admin role → 201 
  it('POST /user with role → 201 with correct role', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ login: 'adminuser', password: 'admin123', role: 'admin' });
    expect(res.status).toBe(201);
    expect(res.body.role).toBe('admin');
  });

  // Scenario 4: POST missing required fields → 400 
  it('POST /user missing fields → 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ login: '' });
    expect(res.status).toBe(400);
  });

  // Scenario 5: POST invalid role → 400 
  it('POST /user invalid role → 400', async () => {
    const res = await request(app.getHttpServer())
      .post('/user')
      .send({ login: 'user2', password: 'pass', role: 'superadmin' });
    expect(res.status).toBe(400);
  });

  // Scenario 6: GET by id 
  it('GET /user/:id → 200 and user without password', async () => {
    const res = await request(app.getHttpServer()).get(`/user/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdUserId);
    expect(res.body).not.toHaveProperty('password');
  });

  // Scenario 7: GET invalid uuid → 400 
  it('GET /user/invalid-id → 400', async () => {
    const res = await request(app.getHttpServer()).get('/user/4er3467-905');
    expect(res.status).toBe(400);
  });

  // Scenario 8: GET non-existing uuid 
  it('GET /user/:id not found → 404', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/11111111-1111-1111-1111-111111111111');
    expect(res.status).toBe(404);
  });

  // Scenario 9: PUT update password → 200
  it('PUT /user/:id → 200 with updated password', async () => {
    const res = await request(app.getHttpServer())
      .put(`/user/${createdUserId}`)
      .send({ oldPassword: 'secret123', newPassword: 'newSecret' });
    expect(res.status).toBe(200);
    expect(res.body).not.toHaveProperty('password');
  });

  // Scenario 10: PUT wrong old password → 403 
  it('PUT /user/:id wrong password → 403', async () => {
    const res = await request(app.getHttpServer())
      .put(`/user/${createdUserId}`)
      .send({ oldPassword: 'wrongPassword', newPassword: '34t67uh' });
    expect(res.status).toBe(403);
  });

  //  Scenario 11: DELETE user → 204
  it('DELETE /user/:id → 204', async () => {
    const res = await request(app.getHttpServer()).delete(`/user/${createdUserId}`);
    expect(res.status).toBe(204);
  });

  // Scenario 12: GET deleted user → 404 
  it('GET deleted user → 404', async () => {
    const res = await request(app.getHttpServer()).get(`/user/${createdUserId}`);
    expect(res.status).toBe(404);
  });

  
});