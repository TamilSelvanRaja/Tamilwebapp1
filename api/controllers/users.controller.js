const Users = require('../models/users.model');
const httpStatus = require("http-status");

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const getUser = await Users.findById(id);
    req.locals = { getUser };
    return next();
  } catch (error) {
    return next(error);
  }
};


/**
 * Create new Users
 * @public
 */
exports.create = async (req, res, next) => {
  try {
  let checkuser;
  checkuser= await Users.findOne({ email: req.body.email});
  if(checkuser){
    return res.json({ msg: false});
  }else{
    const data = new Users(req.body);
    const user = await data.save();
    res.status(httpStatus.CREATED);
     return res.json({ msg: true, user});
  }
 
  } catch (error) {
    next(error);
  } 
};

/**
 * Update Existing Users
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = Object.assign(
      req.locals.getUser,
      req.body
    );    
    data.save()
    .then((dataSaved)=>res.json(dataSaved))
    .catch((e)=>next())

    ;
  } catch (error) {
    next(error);
  }
};

/**
 * Get Users
 * @public
 */
exports.get = (req, res) => res.json(req.locals.getUser);


/**
 * User Email Existing Check
 * @public
 */
exports.userLoginCheck = async (req, res, next) => {
  let user;
    user = await Users.findOne({ email: req.query.email});
   
  if (user) {
    return res.json({ msg: true, user});
 }else{
  return res.json({ msg: false});
 }
};

/**
 * User Login
 * @public
 */
exports.userLogin = async (req, res, next) => {
   let user;
    user = await Users.findOne({
      $and: [
        { email:req.body.email},
        { password: req.body.password }
      ]});
   
  if (user) {
    return res.json({ msg: true, user});
 }else{
  return res.json({ msg: false});
}
};

