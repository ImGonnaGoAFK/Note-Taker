const router = require('express').Router();
const { readFromFile, readAndAppend } = require('../../helpers/fsUtils');
const uuid = require('../../helpers/uuid');
const path = require("path")
const notesPath = path.join(__dirname, "../../db/notes.json")
const fs = require("fs")

router.get('/', (req, res) => {
    const data = fs.readFileSync(notesPath);
    const notesArray = JSON.parse(data)
    res.json(notesArray);
    // readFromFile('../db/notes.json').then((data) => res.json(JSON.parse(data)));
});

router.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        const data = fs.readFileSync(notesPath);
        const notesArray = JSON.parse(data);
        notesArray.push(newNote);
        fs.writeFile('./db/notes.json', JSON.stringify(notesArray, null, 4), (err) =>
            err ? console.error(err) : console.info(`Notes added`))
        // readAndAppend(newNote, '../db/notes.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

module.exports = router;