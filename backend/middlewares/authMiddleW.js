const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnAuthorized = require('../classErrors/UnAuthorized');
const Admin = require('../models/admin');

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnAuthorized('Неправильные почта или пароль'));
  }

  const token = authorization.replace(bearer, '');

  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    // Сохраняем информацию о пользователе (обычный или админе)
    req.user = payload;

    // Добавляем проверку на админа
    if (payload && payload.isAdmin) {
      req.isAdmin = true;
    }

  } catch (err) {
    return next(new UnAuthorized('Неправильные почта или пароль'));
  }

  return next();
};

module.exports = authMiddleware;
