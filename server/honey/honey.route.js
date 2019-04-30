const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const HoneyCtrl = require('./honey.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/honey - Get list of honey */
  .get(HoneyCtrl.list)

  /** POST /api/honey - Create new honey */
  .post(validate(paramValidation.createHoney), HoneyCtrl.create);

router.route('/:HoneyId')
  /** GET /api/honey/:HoneyId - Get honey */
  .get(HoneyCtrl.get)

  /** PUT /api/honey/:HoneyId - Update honey */
  .put(validate(paramValidation.updateHoney), HoneyCtrl.update)

  /** DELETE /api/honey/:HoneyId - Delete honey */
  .delete(HoneyCtrl.remove);

/** Load honey when API with HoneyId route parameter is hit */
router.param('HoneyId', HoneyCtrl.load);

module.exports = router;
