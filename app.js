require('dotenv').config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

// app.use(cors());
app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);

app.use("/test", (req, res) => {
    res.send('This is a test message')
});
app.use(require("./middleware/validate-user"));

app.use("/character", controllers.characterController);

dbConnection.authenticate()
    .then(() => dbConnection.sync({force: true}
        ))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on 3000.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });