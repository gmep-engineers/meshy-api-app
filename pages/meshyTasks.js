const common = require("../lib/common");
const axios = require("axios");
const fs = require("fs");
const readline = require("readline");
const meshyTasks = async function (req) {
  const params = common.params;
  const fileStream = fs.createReadStream("tasks.txt");
  const rl = readline.createInterface({
    input: fileStream,
    clrfDelay: Infinity,
  });
  const tasks = [];
  for await (const line of rl) {
    var trimmedLine = line.trim();
    if (trimmedLine.length > 0) {
      tasks.push({
        date: trimmedLine.split(" ")[0],
        taskId: trimmedLine.split(" ")[1],
      });
    }
  }
  params.htmlTasks = "";
  for (let i = 0; i < tasks.length; i++) {
    const taskId = tasks[i].taskId;
    const date = tasks[i].date;

    const headers = { Authorization: `Bearer ${params.config.API_KEY}` };
    try {
      const response = await axios.get(
        `https://api.meshy.ai/openapi/v1/image-to-3d/${taskId}`,
        { headers }
      );
      console.log(response.data);
      params.htmlTasks += `
        <li><img src="${response.data.thumbnail_url}" /> ${date} ${response.data.progress}% complete <a href="${response.data.model_urls.obj}"> download </a> </li>
        `;
    } catch (err) {
      console.error(err);
    }
  }

  return await common.render("pages/meshyTasks", params);
};
module.exports = meshyTasks;
