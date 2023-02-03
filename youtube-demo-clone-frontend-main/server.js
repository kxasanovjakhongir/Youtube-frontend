const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 2525

const app = express()

app.set('view engine', 'html')
app.use(express.static(path.join(__dirname, 'public')))

//home
app.get('/', (req, res) => res.sendFile(path.join(__dirname, "index.html")))

//login page
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, "views", "login.html")))

//register page
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, "views", "register.html")))

//admin panel
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, "views", "admin.html")))

//404 page not found
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "views", "404.html")))

app.listen(PORT, () => console.log('server is running on http://localhost:' + PORT))