const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Админ',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Администрирование сайта',
  },
  avatar: {
    type: String,
    default: 'https://fikiwiki.com/uploads/posts/2022-02/1644852449_3-fikiwiki-com-p-kartinki-admina-3.jpg',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Недопустимый формат URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Недопустимый формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: true, // Устанавливаем в true, так как это модель админа
  },
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
