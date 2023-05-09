const express = require('express');
const userRoutes = require("./users.route");
const router = express.Router();

router.get("/status", (req, res) => res.send("OK"));

//For count
router.use("/users", userRoutes);


module.exports = router;