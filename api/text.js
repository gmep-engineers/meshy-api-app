const config = require("../etc/config");
const axios = require("axios");
const fs = require("fs");

const text = {
  post: async function (req, res) {
    const text = req.body.text;
    const headers = { Authorization: `Bearer ${config.API_KEY}` };
    const payload = {
      mode: "preview",
      prompt: text,
      art_style: "realistic",
    };

    var taskId = "";
    try {
      const response = await axios.post(
        "https://api.meshy.ai/openapi/v2/text-to-3d",
        payload,
        { headers }
      );
      console.log(response.data);
      taskId = response.data.result;
    } catch (err) {
      console.error(err);
    }

    const date = new Date();
    fs.appendFile(
      "tasks.txt",
      "\n" + date.toISOString() + " " + taskId,
      (err) => {
        if (err) {
          console.error(err);
          return res.status(400).send({ error: err });
        } else {
          return res.redirect(`${config.BASE_URL}/meshy/tasks`);
        }
      }
    );
  },
};

module.exports = text;
