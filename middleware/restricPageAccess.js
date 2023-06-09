const jwt = require("jsonwebtoken");

// Fungsi untuk menendang user ke halaman login, kalau dia belum authenticated.
function restrictPageAccess(req, res, next) {
  const token = req.session.token;

  jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err || !decodedToken) {
      return res.redirect("/login");
    }
    req.userId = decodedToken.id;
    next();
  });
}

module.exports = { restrictPageAccess };