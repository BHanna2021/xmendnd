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

router.put("/update/:id", async(req, res) => {
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
    // const ownerId = req.user.id;
    const charId = req.params.id;

    const query = {
        where: {
            id: charId,
            // user_id: ownerId,
        }
    };
    const updatedChar = {
        name: name,
        race: race,
        alignment: alignment,
        gender: gender,
        height_ft: height_ft,
        height_in: height_in,
        weight: weight,
        char_class: char_class,
        background: background,
        level: level,
        experience: experience,
    };
    try {
        const update = await CharacterModel.update(updatedChar, query);
        res.status(200).json({
            message: `${name} has been updated.`
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


/*
=======================================
    View Characters
=======================================
*/
router.get("/mine", async (req, res) => {
    const { user_id } = req.user;
    try {
        const userCharacters = await CharacterModel.findAll({
            where: {
                owner: user_id
            }
        });
        res.status(200).json(userCharacters);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
=======================================
    Delete Character
=======================================
*/
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const characterId = req.params.id;

    try {
        const query = {
            where: {
                id: characterId,
                owner: ownerId
            }
        };

        await CharacterModel.destroy(query);
        res.status(200).json({ message: "Character Deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});





module.exports = router;