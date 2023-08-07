require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUserValidation, loginValidation } = require('./middlewares/celebrate');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./utils/errors/NotFoundError');

const error = require('./middlewares/error');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3001',
    'https://localhost:3001',
    'http://epkondrateva.nomoreparties.co',
    'https://epkondrateva.nomoreparties.co',
  ],
}));

app.use(helmet());
app.use(requestLogger);
app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginValidation, login);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError(`Ресурс по адресу ${req.path} не найден`));
  // res.status(ERROR_NOT_FOUND).send({ message: `Ресурс по адресу ${req.path} не найден` });
});
app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
