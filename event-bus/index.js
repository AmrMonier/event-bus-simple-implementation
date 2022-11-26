const experss = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = new experss()
app.use(cors())
app.use(bodyParser.json())
const hosts = [
    {
        id: 'posts',
        url: 'http://localhost:3000'
    },
    {
        id: 'comments',
        url: 'http://localhost:3001'
    },
]

app.post('/events', (req, res) =>{
    console.log(req.body)
    res.send()
})

app.listen(3002, () => console.log('App running on 3002'))