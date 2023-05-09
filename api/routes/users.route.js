const express = require('express');
//const validate = require('express-validation');
const controller = require('../controllers/users.controller');
const router = express.Router();

router.param('userId', controller.load);

router
   .route('/:userId')
   .get(controller.get)
   .patch(controller.update)
   .delete(controller.remove);

router
  .route('/')
  .post(controller.create)
  .get(controller.userLoginCheck);

router
  .route('/login')
  .post(controller.userLogin)

module.exports = router;
