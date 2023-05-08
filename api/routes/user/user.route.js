const express = require("express");
const controller = require("../../controller/user.controller");
const router = express.Router();

/**
 * Load User when API with User_Id route parameter is hit
 */
router.param("userid", controller.load);

router
  .route("/")
  .get(controller.list);
//   .post(controller.create);


module.exports = router;
