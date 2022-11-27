const experss = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = new experss()
app.use(cors())
app.use(bodyParser.json())
const hosts = [
    {
        id: 'posts',
        url: 'http://localhost:3000/events'
    },
    {
        id: 'comments',
        url: 'http://localhost:3001/events'
    },
    {
        id: 'query',
        url: 'http://localhost:3003/events'
    },

]

app.post('/events', (req, res) =>{
    console.log(req.body)
    hosts.forEach(host => {
        axios.post(host.url, req.body)
    })
    res.send()
})

app.listen(3002, () => console.log('App running on 3002'))