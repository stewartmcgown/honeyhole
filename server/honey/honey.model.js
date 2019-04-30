const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Honey Schema
 */
const honeySchema = new mongoose.Schema({
  batchId: {
    type: String,
    required: true
  },
  fingerprint: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
honeySchema.method({});

/**
 * Statics
 */
honeySchema.statics = {
  /**
   * Get honey
   * @param {ObjectId} id - The objectId of honey.
   * @returns {Promise<Honey, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((honey) => {
        if (honey) {
          return honey;
        }
        const err = new APIError('No such honey exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List honey in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of honey to be skipped.
   * @param {number} limit - Limit number of honey to be returned.
   * @returns {Promise<Honey[]>}
   */
  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Honey
 */
module.exports = mongoose.model('Honey', honeySchema);
