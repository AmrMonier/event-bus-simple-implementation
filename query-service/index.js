const experss = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = new experss();
app.use(cors());
app.use(bodyParser.json());
const posts = {};
const updateComment = (data) => {
  const {postId, content, status} = data
  const comments = posts[postId].comments;
  let comment = comments.find((e) => e.id === data.id);
  comment.content = content
  comment.status = status
};
app.get("/posts", (req, res) => {
  return res.json(Object.values(posts));
});

app.get("/posts/:id", (req, res) => {
  return res.json(posts[req.params.id]);
});

app.post("/events", (req, res) => {
  console.log(req.body.tag);
  const { tag, data } = req.body;
  switch (tag) {
    case "post_created":
      posts[data.id] = { ...data, comments: [] };
      break;
    case "comment_created":
      const post = posts[data.postId];
      post.comments.push({
        id: data.id,
        content: data.content,
        status: "pending",
      });
      break;
    case "comment_updated":
      updateComment(data);
      
      break;
  }
  return res.send();
});
app.listen(3003, () => console.log("App running on 3003"));
