require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logger');

const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');
const bookmarks = require('./store');
const errorHandler = require('./error-handler')




const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());




app.use(bookmarksRouter);
app.use(errorHandler);


module.exports = app