const express = require("express");
const app = express();


app.get('/', (req, res) => {

});

app.use(express.json())

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to Port ${port}...`)
});