require('dotenv').config();
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// routes import
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');

// database
const connectDB = require('./db/connect');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// routes
app.get('/', (req, res) => {
  res.json({ msg: 'E-commerce API' });
});

app.get('/api/v1', (req, res) => {
  console.log(req.signedCookies);
  res.send('e-commerce api');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
