const router = require("express").Router();
const { UserModel } = require("../models");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    let { email, password, handle } = req.body.user;
    try{
        const User = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            handle,
    });
    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token,
    });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use",
            });
        } else {
            res.status(500).json({
                message: "Failed to register user",
            });
            console.log(err);
        }   
    }
});

router.post("/login", async (req, res) => {
    let { email, password } = req.body.user;
    try {
        const loginUser = await UserModel.findOne({
            where: {
                email: email,
            },
        });
        if (loginUser) {
            const passwordComparison = await bcrypt.compare(password, loginUser.password);
            if (passwordComparison) {
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});
                res.status(200).json({
                    user: loginUser,
                    message: "User successfully logged in!",
                    sessionToken: token,
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({    
                message: "Incorrect email or password",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Failed to log user in",
        })
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const userInfo = await UserModel.findOne({
            where: {
                id: id,
            }
        });
        // console.log(userInfo)
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;