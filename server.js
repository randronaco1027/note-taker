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

// Get data from server and display at appropriate URLs
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function read(err, data) {
        err
            ? console.log(err)
            : res.json((JSON.parse(data)))
    })
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Post data from database
fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    err
        ? console.log(err)
        : console.log(data)
    const savedNotes = JSON.parse(data)
    app.post('/api/notes', (req, res) => {
        const newNote = JSON.stringify(req.body);
        console.log(newNote)
        savedNotes.push(JSON.parse(newNote))
        fs.writeFile('./db/db.json', JSON.stringify(savedNotes, null), (err) =>
            err 
            ? console.error(err) 
            : console.info('NOTE ADDED'))
            return savedNotes
    })
})


// Listen function
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})

//  function createNewNote(body, notesArray) {
//     var notesArray =  app.get('/api/notes', (req, res) => {
//         fs.readFile('./db/db.json', function read(err, data){
//             err 
//             ? console.log(err)
//             : res.json((JSON.parse(data)))
//         })
//     })
//     console.log(notesArray)
//     const newNotes = body;
//     notesArray.push(newNotes);
//     fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify({ notesArray }, null, 2)
//     );
//     return newNotes;
// }

