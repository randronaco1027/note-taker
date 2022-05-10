const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path')
const fs = require('fs')
const noteDb = require('./db/db');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Get functions
app.get('/api/notes', (req, res) => {
    res.json(noteDb);
})
app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get('/notes', function(req,res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

function createNewNote(body, notesArray) {
    const newNotes = body;
    notesArray.push(newNotes);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
    );
    return newNotes;
}

// Post data
app.post('/api/notes', (req, res) => {
    console.log(req.body)
    const newNote = createNewNote(req.body, noteDb);
    res.json(newNote)
})

// Listen function
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})