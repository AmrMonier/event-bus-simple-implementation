const experss = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = new experss();
app.use(cors());
app.use(bodyParser.json());
const events = [];
const hosts = [
  {
    id: "posts",
    url: "http://posts-cluster-ip-srv:3000/events",
  },
  {
    id: "comments",
    url: "http://comments-cluster-ip-srv:3001/events",
  },
  {
    id: "query",
    url: "http://query-cluster-ip-srv:3003/events",
  },
  {
    id: "moderation",
    url: "http://moderation-cluster-ip-srv:3004/events",
  },
];

app.post("/events", async (req, res) => {
  console.log(req.body.tag);
  events.push(req.body);
  try {
    await Promise.all(hosts.map((host) => axios.post(host.url, req.body)));
  } catch (error) {
    console.error(error);
  }
  res.send();
});

app.get("/events", (req, res) => {
  return res.send(events);
});
app.listen(3002, () => console.log("App running on 3002"));
