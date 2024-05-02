const express = require('express');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'users.json');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json({ users });
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user){
        res.send({ user });
    } else {
        res.send({ error: "User not found!" });
    }
});

app.put('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (user){
        user.firstname = req.body.firstname;
        user.secondname = req.body.secondname;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ user });
    } else {
        res.send({ error: "User not found!" });
    }
});


app.listen(3000, () => console.log("Started on port 3000!"));