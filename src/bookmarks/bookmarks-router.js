const express = require('express');
const { v4: uuid } = require('uuid');
const logger = require('../logger');


const { PORT } = require('../config');
const bookmarks = require('../store');


const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route('./bookmarks')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;

    if (!title) {
      logger.error('Title required');
      return res
        .status(400)
        .send('Invalid Title')
    }
    if (!url) {
      logger.error('URL required');
      return res
        .status(400)
        .send('Invalid URL')
    }
    if (!description) {
      logger.error('description required');
      return res
        .status(400)
        .send('Invalid description')
    }
    if (!rating) {
      logger.error('rating required');
      return res
        .status(400)
        .send('Invalid rating')
    }

    const id = uuid();

    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    }
    bookmarks.push(bookmark);

    logger.info(`Card with id ${id} created`);

    res
      .status(201)
      .location(`${PORT}/bookmarks/${id}`)
      .json(bookmark)
  });
