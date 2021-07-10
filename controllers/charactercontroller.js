const router = require("express").Router();
const { CharacterModel } = require("../models");

router.get("/practice", (req, res) => {
    res.send("Hey this is a practice route!");
});


module.exports = router;