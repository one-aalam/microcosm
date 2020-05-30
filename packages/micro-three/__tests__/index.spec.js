const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('Server', () => {
    it('GETs the test endpoint', async done => {
      const response = await request.get('/test');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('pass!');

      done()
    })
})
