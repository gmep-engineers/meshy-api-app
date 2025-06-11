const common = require("../lib/common");

const meshy = async function (req) {
  const params = common.params;
  return await common.render("pages/meshy", params);
};
module.exports = meshy;
