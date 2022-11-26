const experss = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = new experss()
app.use(cors())
app.use(bodyParser.json())
const posts = {

}
app.get('/posts',(req, res) => {
    return res.json(posts)
})

app.post('/posts', (req, res) =>{
    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    posts[id]= {id, title}
    res.status(201).json(posts[id])
})

app.listen(3000, () => console.log('App running on 3000'))