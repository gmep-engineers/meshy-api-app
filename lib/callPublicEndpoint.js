const callPublicEndpoint = async function (req, res, api, action) {
  await api[action](req, res);
};

module.exports = callPublicEndpoint;
