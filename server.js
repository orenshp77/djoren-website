const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'DJ Oren Shaffer - דף הבית', page: 'home' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'DJ Oren Shaffer - אודות', page: 'about' });
});

app.get('/events', (req, res) => {
    res.render('events', { title: 'DJ Oren Shaffer - אירועים', page: 'events' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'DJ Oren Shaffer - צור קשר', page: 'contact' });
});

app.get('/weddings', (req, res) => {
    res.render('weddings', { title: 'DJ Oren Shaffer - חתונות', page: 'weddings' });
});

app.get('/parties', (req, res) => {
    res.render('parties', { title: 'DJ Oren Shaffer - מסיבות ענק והפקות', page: 'parties' });
});

app.get('/corporate', (req, res) => {
    res.render('corporate', { title: 'DJ Oren Shaffer - אירועי חברה', page: 'corporate' });
});

app.get('/music-production', (req, res) => {
    res.render('music-production', { title: 'DJ Oren Shaffer - יצירת מוזיקה', page: 'music-production' });
});

app.listen(PORT, () => {
    console.log(`🎵 DJ Oren Shaffer website running at http://localhost:${PORT}`);
});
