const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`API respondendo em http://localhost:${port}`);
});