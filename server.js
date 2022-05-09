const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`)
})