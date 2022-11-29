const experss = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const eventBusURL = "http://localhost:3002/events";

const app = new experss();
app.use(cors({}));
app.use(bodyParser.json());
const posts = {};
const updateComment = (data) => {
  const { postId, content, status } = data;
  const comments = posts[postId].comments;
  let comment = comments.find((e) => e.id === data.id);
  comment.content = content;
  comment.status = status;
};

const handleEvents = (tag, data) => {
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
  handleEvents(tag, data);
  return res.send();
});
app.listen(3003, async () => {
  console.log("App running on 3003");
  const { data } = await axios.get(eventBusURL);
  for (const event of data) {
    console.log('handle missed event:'  + event.tag)
    handleEvents(event.tag, event.data)
  }
});
