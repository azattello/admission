const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "Нет доступа: токен отсутствует" });
    }

    const decoded = jwt.verify(token, config.get("secretKey"));

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: "Администратор не найден" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error("Ошибка авторизации:", error);
    return res.status(401).json({ message: "Ошибка авторизации" });
  }
};
