const express = require("express");
const Controller = require("../controller/userController")
const router = express.Router();

router.get("/get", (req, res) => {
    res.send("working")
});

router.post("/saveData", Controller.saveData);
router.post("/login", Controller.login);

module.exports = router;