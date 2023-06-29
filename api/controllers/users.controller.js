const Users = require('../models/users.model');
const httpStatus = require("http-status");
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10); // The number of rounds determines the complexity of the hashing algorithm.

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

    const { name,email,mobile,gender,password} = req.body; // Extract password from req.body
    const hashedPassword = bcrypt.hashSync(password, salt);
    const userData = {  name,email,mobile,gender, password: hashedPassword }; // Replace plain password with hashed password
    const data = new Users(userData);
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
 * 
 */
exports.userLogin = async (req, res, next) => {

  const { email, password } = req.body;
  // Find user by email
  let user;
  user = await Users.findOne({ email: email});

  console.log(user);
  if (!user) {
    return res.status(404).json({ msg: false,message: 'User not found' });
  }

  // Compare password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({msg: false,message: 'Internal server error' });
    }

    if (result) {
      return res.status(200).json({ msg: true, user});
    } else {
      return res.status(401).json({msg: false,message: 'Invalid password' });
    }
  });

//    let user;
//     user = await Users.findOne({
//       $and: [
//         { email:req.body.email},
//         { password: req.body.password }
//       ]});
   
//   if (user) {
//     return res.json({ msg: true, user});
//  }else{
//   return res.json({ msg: false});
// }
};

