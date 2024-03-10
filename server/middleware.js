var jwt = require("jsonwebtoken");
async function accessControl(req, res, next) {
  try {
    const {
      path,
      headers,
      method,
      params,
      query,
      baseUrl,
      originalUrl,
      hostname,
      ip,
      body,
    } = req;
    const token = headers.token;
    if (!token) throw { message: "Invalid Token", status: 401 };

    var data = jwt.verify(token, "shhhhh");
    if (!data) throw { message: "Invalid Token", status: 401 };
    req.user = data;

    const log = {
      path: path,
      headers: headers,
      method: method,
      params: params,
      query: query,
      body: body,
      baseUrl: baseUrl,
      originalUrl: originalUrl,
      host: hostname,
      ip: ip,
      timestamp: new Date(),
      user: req.user,
    };
    console.log(`| ${new Date().toISOString()} |`, JSON.stringify(log));

    next();
  } catch (err) {
    return res.status(err.status || 500).send(err);
  }
}

module.exports = { accessControl };
