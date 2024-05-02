const express = require('express');
const fs = require('fs');
const path = require('path');
const joi = require('joi');

const filePath = path.join(__dirname, 'users.json');
let customId = 1;

const scheme = joi.object({
    firstname: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    city: joi.string().min(3),
    age: joi.number().min(0).max(300).required()
});

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
    const result = scheme.validate(req.body);
    if (result.error){
        return res.send({ error: result.error.details[0].message });
    };
    
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user){
        user.firstname = req.body.firstname;
        user.secondName = req.body.secondName;
        user.city = req.body.city;
        user.age = req.body.age;
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ user });
    } else {
        res.send({ error: "User not found!" });
    }
});

app.post('/users', (req, res) => {
    const result = scheme.validate(req.body);
    if (result.error){
        return res.send({ error: result.error.details[0].message });
    };

    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = {
        id: ++customId,
        firstname: req.body.firstname,
        secondName: req.body.secondName,
        city: req.body.city,
        age: req.body.age
    };
        users.push(user);
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ user });
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex >= 0){
        users.splice(userIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({ status: 'ok' });
    } else {
        res.send({ error: "User not found!" });
    }
});

app.listen(3000, () => console.log("Started on port 3000!"));