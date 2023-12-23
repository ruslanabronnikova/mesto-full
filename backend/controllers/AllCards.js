const Card = require("../models/card")

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  getAllCards
};