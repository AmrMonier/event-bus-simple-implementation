const experss = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const eventBusURL = "http://localhost:3002/events";

const app = new experss();
app.use(cors());
app.use(bodyParser.json());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  return res.json(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[id];
  if (!comments) return res.status(404).json({ msg: "post not found" });
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;
  axios.post(eventBusURL, {
    tag: "comment_created",
    data: { postId: id, content, id: commentId },
  });
  return res.status(201).json(comments);
});

const updateComment = (data) => {
  const comments = commentsByPostId[data.postId];
  let comment = comments.find((e) => e.id === data.id);
  comment.status = data.status;
  axios.post(eventBusURL, {
    tag: "comment_updated",
    data: {
      ...comment,
      postId: data.postId,
    },
  });
};
app.post("/events", (req, res) => {
  console.log(req.body.tag);
  const { tag, data } = req.body;
  switch (tag) {
    case "post_created":
      commentsByPostId[data.id] = [];
      break;
    case "comment_moderated":
      updateComment(data);
      break;
  }
  return res.send();
});

app.listen(3001, () => console.log("App running on 3001"));
