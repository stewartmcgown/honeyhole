const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Honey APIs', () => {
  let honey = {
    batchId: 'KK123',
    fingerprint: '1234567890'
  };

  describe('# POST /api/honey', () => {
    it('should create a new honey', (done) => {
      request(app)
        .post('/api/honey')
        .send(honey)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.batchId).to.equal(honey.batchId);
          expect(res.body.fingerprint).to.equal(honey.fingerprint);
          honey = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/honey/:HoneyId', () => {
    it('should get honey details', (done) => {
      request(app)
        .get(`/api/honey/${honey._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.batchId).to.equal(honey.batchId);
          expect(res.body.fingerprint).to.equal(honey.fingerprint);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when honey does not exists', (done) => {
      request(app)
        .get('/api/honey/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/honey/:HoneyId', () => {
    it('should update honey details', (done) => {
      honey.batchId = 'KK';
      request(app)
        .put(`/api/honey/${honey._id}`)
        .send(honey)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.batchId).to.equal('KK');
          expect(res.body.fingerprint).to.equal(honey.fingerprint);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/honey/', () => {
    it('should get all honey', (done) => {
      request(app)
        .get('/api/honey')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all honey (with limit and skip)', (done) => {
      request(app)
        .get('/api/honey')
        .query({
          limit: 10,
          skip: 1
        })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/honey/', () => {
    it('should delete honey', (done) => {
      request(app)
        .delete(`/api/honey/${honey._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.batchId).to.equal('KK');
          expect(res.body.fingerprint).to.equal(honey.fingerprint);
          done();
        })
        .catch(done);
    });
  });
});
