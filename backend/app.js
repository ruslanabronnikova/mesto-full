require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const allcardsRouter = require('./routes/AllCards')
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { CorrectUrl } = require('./constants/correctUrl');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const handleNotFound = require('./routes/errorHandler');
const authMiddleW = require('./middlewares/authMiddleW');
const errorMiddleW = require('./middlewares/errorMiddleW');
const { createUser, loginUser } = require('./controllers/users');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/allcards', allcardsRouter)

// Валидация запроса на вход (логин) пользователя
app.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), loginUser);

// Валидация запроса на регистрацию нового пользователя
app.post('/signup', celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(CorrectUrl),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(authMiddleW);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(handleNotFound);
app.use(errors());
app.use(errorMiddleW);

app.listen(3000, () => {
  console.log('Привет, я сервер!');
});
