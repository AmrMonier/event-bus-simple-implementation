const experss = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

const eventBusURL = "http://localhost:3002/events";
const app = new experss();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

const CheckForBadWords = (value) => {
  const badWords = ["fuck", "damn", "bitch"];
  for (const word of badWords) {
    const wordExp = new RegExp(`${word.replace(/(\W)/g, "\\$1")}`, "gi");
    if (wordExp.test(value)) return true;
  }
  return false;
};
app.post("/events", (req, res) => {
  console.log(req.body.tag);
  const { tag, data } = req.body;
  switch (tag) {
    case "comment_created":
      axios.post(eventBusURL, {
        tag: "comment_moderated",
        data: {
          ...data,
          status: CheckForBadWords(data.content) ? "rejected" : "approved",
        },
      });
      break;
    case "comment_updated":
      break;
  }
  return res.send();
});
app.listen(3004, () => console.log("App running on 3004"));
