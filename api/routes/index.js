const express = require('express');
const router = express.Router();
const userRoutes = require("./user/user.route");

//Testing
router.get("/test", (req, res) => res.send("Hi Tamil"));

// User Route
router.use("/user", userRoutes);



module.exports = router;