const common = require("../lib/common");

const home = async function (req) {
  const params = common.params;
  return await common.render("pages/home", params);
};
module.exports = home;
