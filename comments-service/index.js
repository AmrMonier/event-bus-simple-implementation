const experss = require('express')
const cors = require('cors')
const {randomBytes} = require('crypto')
const bodyParser = require('body-parser')
const app = new experss()
app.use(cors())
app.use(bodyParser.json())
const commentsByPostId = {

}
app.get('/posts/:id/comments',(req, res) => {
    const {id} = req.params
    return res.json(commentsByPostId[id] || [])
})

app.post('/posts/:id/comments', (req, res) =>{
    const {id} = req.params
    const commentId = randomBytes(4).toString('hex')
    const {content} = req.body
    const comments = commentsByPostId[id] || []
    comments.push({id: commentId, content}) 
    commentsByPostId[id] = comments
    res.status(201).json(comments)
})

app.listen(3001, () => console.log('App running on 3001'))