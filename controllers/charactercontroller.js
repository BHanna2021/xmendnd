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
        experience,
        hit_points,
        language,
        session_notes
    } = req.body.Character;
    const { id } = req.user
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
        hit_points,
        language,
        session_notes,
        user_id: id
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
        experience,
        hit_points,
        language,
        session_notes,
    } = req.body.Character;
    const ownerId = req.user.id;
    const charId = req.params.id;

    const query = {
        where: {
            id: charId,
            user_id: ownerId,
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
        hit_points: hit_points,
        language: language,
        session_notes: session_notes,
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
    const { id } = req.user;
    try {
        const userCharacters = await CharacterModel.findAll({
            where: {
                user_id: id
            }
        });
        res.status(200).json(userCharacters);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
=======================================
    View Character by Id
=======================================
*/
router.get("/:id", async (req, res) => {
    const ownerId = req.user.id;
    const characterId = req.params.id;

    try {
        const results = await CharacterModel.findOne({
            where: {
                id: characterId,
                user_id: ownerId
            }
        });
        res.status(200).json(results);
    }catch (err) {
        res.status(500).json({ error:err });
    }
});

/*
=======================================
    Delete Character
=======================================
*/
router.delete("/delete/:id", async (req, res) => {
    const ownerId = req.user.id;
    const characterId = req.params.id;

    try {
        const query = {
            where: {
                id: characterId,
                user_id: ownerId
            }
        };

        await CharacterModel.destroy(query);
        res.status(200).json({ message: "Character Deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});





module.exports = router;