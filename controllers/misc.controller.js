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
  const otherUser = req.body.propertyOwner;

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

// deberia separarlos ?

// usuario hace like  (primer liker)
// suministra información
//