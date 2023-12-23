const Admin = require('../models/admin');

const BadRequest = require('../classErrors/BadRequest');
const NotFound = require('../classErrors/NotFound');

const getAdmins = (req, res, next) => {
  Admin.find({})
    .then((admin) => {
      res.status(200).send(admin);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return next(new BadRequest('Невалидные данные'));
      }
      return next(error);
    });
};

const getAdminInfo = (req, res, next) => {
  const adminId = req.user._id;

  Admin.findById(adminId)
    .then((user) => {
      if (user) {
        return res.send({ user });
      }
      throw new NotFound('Пользователь с указанным id не найден');
    })
    .catch((error) => {
      next(error);
    });
};

const getAdminById = (req, res, next) => {
  const { id } = req.params;

  Admin.findById(id)
    .then((admin) => {
      if (!admin) throw new NotFound('Пользователь с указанным id не найден');
      res.status(200).send(admin);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequest('Невалидные данные'));
      }
      return next(error);
    });
};

const updateAdmin = (req, res, next) => {
  const { name, about } = req.body;
  const adminId = req.user._id;

  Admin.findByIdAndUpdate(
    adminId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updatedAdmin) => {
      if (!updatedAdmin) throw new NotFound('Пользователь с указанным id не найден');
      res.status(200).send(updatedAdmin);
    })
    .catch((error) => {
      next(error);
    });
};

const updateAvatarAdmin = (req, res, next) => {
  const { avatar } = req.body;
  const adminId = req.user._id;

  Admin.findByIdAndUpdate(
    adminId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((updatedAdmin) => {
      if (!updatedAdmin) throw new NotFound('Пользователь с указанным id не найден');
      res.status(200).send(updatedAdmin);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return next(new BadRequest('Невалидные данные'));
      }
      return next(error);
    });
};

module.exports = {
  getAdmins,
  updateAdmin,
  updateAvatarAdmin,
  getAdminInfo,
  getAdminById
};
