const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const Router = require("./routes/router")

const DB = process.env.DATABASE

const app = express();
app.use(express.json());




mongoose.set('strictQuery', false);
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(DB).then(() => {
        console.log("Database Connected");
    })
}



app.use("/app/v1", Router)



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})
