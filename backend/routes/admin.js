const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { CorrectUrl } = require('../constants/correctUrl');

const {
  getAdmins,
  updateAdmin,
  updateAvatarAdmin,
  getAdminInfo,
  getAdminById
} = require('../controllers/admin');

// Валидация запроса на получение информации о текущем пользователе
router.get('/me', getAdminInfo);

// Остальные роуты без валидации
router.get('/', getAdmins);

// Валидация запроса на обновление информации о пользователе
router.patch('/me', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateAdmin);

// Валидация запроса на обновление аватара пользователя
router.patch('/me/avatar', celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(CorrectUrl),
  }),
}), updateAvatarAdmin);

// Валидация запроса на получение пользователя по ID
router.get('/:id', celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
}), getAdminById);

module.exports = router;