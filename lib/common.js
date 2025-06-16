const config = require("../etc/config");
const ejs = require("ejs");
const common = {
  params: {
    config: config,
  },
  apiKey: config.API_KEY,
  render: function (templateName, templateParams) {
    return new Promise((resolve, reject) => {
      ejs.renderFile(
        "./" + templateName + ".ejs",
        templateParams,
        function (err, str) {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(str);
        }
      );
    });
  },
};
module.exports = common;
