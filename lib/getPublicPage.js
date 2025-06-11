const publicPage = require("../templates/publicPage");

const getPublicPage = async function (req, res, main) {
  const mainHtml = await main(req);
  const fullHtml = await publicPage(mainHtml);
  res.status(200).end(fullHtml);
};

module.exports = getPublicPage;
