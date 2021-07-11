const router = require("express").Router();
const { CharacterModel } = require("../models");

router.get("/practice", (req, res) => {
    res.send("Hey this is a practice route!");
});

router.post("/create", async(req, res) => {
    console.log("Ready to Create!")
    const {
        name,
        race,
        alignment,
        gender,
        height_ft,
        height_in,
        weight,
        char_class,
        background,
        level,
        experience
    } = req.body.Character;
    // const { id } = req.user;
    const characterEntry = {
        name,
        race,
        alignment,
        gender,
        height_ft,
        height_in,
        weight,
        char_class,
        background,
        level,
        experience,
        user_id: 1
    };

    try {
        const newCharacter = await CharacterModel.create(characterEntry);
        res.status(200).json(newCharacter);
    } catch (err) {
        res.status(500).json({ error: err })
    }
});

router.put("/update", (req, res) => {

})


/* 
=======================================
    View Character
=======================================









=======================================
    Delete Character
=======================================







*/


module.exports = router;