const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const app = express();
const path = require('path');

const corsOptions = {
    origin: "*"
};

// register cors middleware
app.use(cors(corsOptions));
app.use(express.json());

//connect to database

const mongooseConfig = {

}

db.mongoose.connect(db.url, mongooseConfig)
    .then(() => console.log("Connected to database"))
    .catch(err => {
        console.error(`Failed to connect error: ${err}`);
        process.exit();
    });

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

require("./app/routes/items.route")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));