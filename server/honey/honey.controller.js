const Honey = require('./honey.model');

/**
 * Load honey and append to req.
 */
function load(req, res, next, id) {
  Honey.get(id)
    .then((honey) => {
      req.honey = honey; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get honey
 * @returns {Honey}
 */
function get(req, res) {
  return res.json(req.honey);
}

/**
 * Create new honey
 * @property {string} req.body.batchId - The batchId of honey.
 * @property {string} req.body.fingerprint - The fingerprint of honey.
 * @returns {Honey}
 */
function create(req, res, next) {
  const honey = new Honey({
    batchId: req.body.batchId,
    fingerprint: req.body.fingerprint,
    producer: req.body.producer
  });

  honey.save()
    .then(savedHoney => res.json(savedHoney))
    .catch(e => next(e));
}

/**
 * Update existing honey
 * @property {string} req.body.batchId - The batchId of honey.
 * @property {string} req.body.fingerprint - The fingerprint of honey.
 * @returns {Honey}
 */
function update(req, res, next) {
  const honey = req.honey;
  honey.batchId = req.body.batchId;
  honey.fingerprint = req.body.fingerprint;

  honey.save()
    .then(savedHoney => res.json(savedHoney))
    .catch(e => next(e));
}

/**
 * Get honey list.
 * @property {number} req.query.skip - Number of honey to be skipped.
 * @property {number} req.query.limit - Limit number of honey to be returned.
 * @returns {Honey[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;
  Honey.list({
      limit,
      skip
    })
    .then(honey => res.json(honey))
    .catch(e => next(e));
}

/**
 * Delete honey.
 * @returns {Honey}
 */
function remove(req, res, next) {
  const honey = req.honey;
  honey.remove()
    .then(deletedHoney => res.json(deletedHoney))
    .catch(e => next(e));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove
};
