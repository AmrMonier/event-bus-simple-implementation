const experss = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");
const app = new experss();
app.use(cors());
app.use(bodyParser.json());

const hosts = {
  // posts: "http://localhost:3000",
  // comments: "http://localhost:3001",
  // query: "http://localhost:3003",
  posts: "http://posts-cluster-ip-srv:3000",
  comments: "http://comments-cluster-ip-srv:3001",
  query: "http://query-cluster-ip-srv:3003",
};

const sendPostRequestToService = async (host, data) => {
  try {
    const res = await axios.post(host, data);
    return res;
  } catch (error) {
    return {
      data: error.response?.data || { msg: "Oops, Something went wrong" },
      status: error.response?.status || 500,
    };
  }
};

const sendGetRequestToService = async (host, data) => {
  try {
    const res = await axios.get(host);
    return res;
  } catch (error) {
    return {
      data: error.response?.data || { msg: "Oops, Something went wrong" },
      status: error.response?.status || 500,
    };
  }
};

app.post("/posts", async (req, res) => {
  const response = await sendPostRequestToService(
    hosts.posts + "/posts",
    req.body
  );
  return res.json(response.data).status(response.status);
});

app.get("/posts", async (req, res) => {
  const response = await sendGetRequestToService(hosts.query + "/posts");
  return res.json(response.data).status(response.status);
});

app.post("/comments", async (req, res) => {
  const response = await sendPostRequestToService(
    hosts.comments + "/posts/" + req.body.post_id + "/comments",
    req.body
  );
  return res.status(response.status).json(response.data);
});

app.get("/posts/:id", async (req, res) => {
  const response = await sendGetRequestToService(
    hosts.query + "/posts/" + req.params.id
  );
  return res.json(response.data).status(response.status);
});

app.listen(4000, () => console.log("App running on 4000"));
