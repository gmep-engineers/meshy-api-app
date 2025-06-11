const common = require("../lib/common");

const publicPage = async function (mainHtml) {
  const params = {
    main: mainHtml,
  };
  return await common.render("templates/publicPage", params);
};
module.exports = publicPage;
