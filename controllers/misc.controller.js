const createError = require('http-errors')

const Match = require('../models/Match.model')
const Reject = require("../models/Reject.model");


module.exports.root = (req, res, next) => {
  res.json({
    name: "HomeCrush API",
    version: "1.0",
    website: "SOON 🏃💨",
  });
}

module.exports.like = (req, res, next) => {
  const propertyLikedId = req.params.propertyId;
  const me = req.currentUser;
  const otherUser = req.body.owner;
  console.log(propertyLikedId)
  console.log(me);
  console.log(otherUser);


  Match.findOne({
      userOne: otherUser,
      userTwo: me
    })
    .then((response) => {
      if (!response) {
        return Match.create({
          userOne: me,
          userTwo: otherUser,
          userTwoProperty: propertyLikedId,
        }).then(() => {
          res.status(201).json({});
        });
      } else {
        response.userOneProperty = propertyLikedId;
        response.match = true;

        return response.save().then(() => {
          res.status(200).json({
            data: "match"
          });
        });
      }
    })
    .catch(next);
};

module.exports.unmatch = (req, res, next) => {
  const me = req.currentUser;
  const matchId = req.body.matchId

  Match.findById(matchId)
    .then((response) => {
      if (response.userOne == me || response.userTwo == me) {
        return response.deleteOne().then(() => {
          res.status(200).json({
            response: "deleted"
          })
        })
      }
    })
    .catch(next);
};

module.exports.matchResponse = (req, res, next) => {
  const matchId = req.params.matchId
  const me = req.currentUser
  const matchResponse = req.body.matchResponse
  let status = "Pending"
  
  Match.findById(matchId)
    .then((response) => {
      if (response.userOne == me) {
        response.accepted.userOne = matchResponse;

      } else if (response.userTwo == me) {
        response.accepted.userTwo = matchResponse;

      } else {
        next(createError(401))
      }

      const acceptedArray = [response.accepted.userOne, response.accepted.userTwo]
      const condition = (element) => element == "accepted"
      const conditionTwo = (element) => element == "rejected"

      if (acceptedArray.every(condition)) {
        status = "Accepted"
      } else if (acceptedArray.some(conditionTwo)) {
        status = "Rejected"
      }

      return response.update().then(() => {
        res.status(200).json({
          status
        })
      })
    })
    .catch(next)
}


module.exports.reject = (req, res, next) => {
  const id = req.params.propertyId;
  const user = req.currentUser;

  Reject.findOne({
      property: id,
      user
    })
    .then((property) => {
      if (!property) {
        return Reject.create({
          property: id,
          user
        }).then(() => {
          res.status(201).json({
            data: "Property rejected"
          });
        });
      } else {
        return Reject.findOneAndDelete({
          property: id,
          user
        }).then(
          (response) => {
            res.status(200).json({
              data: "Reject deleted"
            });
          }
        );
      }
    })
    .catch(next);
};