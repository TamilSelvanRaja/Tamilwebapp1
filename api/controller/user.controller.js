//const httpStatus = require("http-status");
//const Admin_Role_Model = require("../models/admin_role.model");
//const { ReadPreference } = require("mongodb");

/**
 * Load User Data and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
 
    return res.json({"he":"mmn"}) ;
  } catch (error) {
    return next(error);
  }
};

/** List of Users */
exports.list = async (req, res, next) => {
  try {
    return res.json({"he":"mmn"}) ;
  } catch (error) {
    next(error);
  }
};
