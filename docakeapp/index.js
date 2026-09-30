const express = require("express");
const app = express();
const port = 3002;

app.get("/", (req, res) => {
    res.json([
        
        {
            name: "Sathya Kumar",
            age: 27,
            city: "Boston"
        },
        {
            name: "Sathya Kumar",
            age: 27,
            city: "Boston"
        },
        {
            name: "tanmay Kumar",
            age: 27,
            city: "Boston"
        },
        {
            name: "tanmay sarkar",
            age: 27,
            city: "Boston"
        },
        {
            name: "Raju kayal",
            age: 27,
            city: "kolkata"
        }
    ])
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
