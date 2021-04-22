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
  const id = req.params.propertyId;
  const user = req.currentUser;

  Match.findOne({ property: id, user })
    .then(property => {
      if (!property) {
        return Match.create({ property: id, user }).then((property) => {
          console.log(property)
          res.status(201).json({ data: "Property liked" });
        });
      } else {
        return Match.findOneAndDelete({  property: id, user}).then((response) =>{
          res.status(200).json({ data: "Property unliked" })
        })
      }
    })
    .catch(next);
} 

module.exports.reject = (req, res, next) => {
  const id = req.params.propertyId;
  const user = req.currentUser;

  Reject.findOne({ property: id, user })
    .then((property) => {
      if (!property) {
        return Reject.create({ property: id, user }).then(() => {
          res.status(201).json({ data: "Property rejected" });
        });
      } else {
        return Reject.findOneAndDelete({ property: id, user }).then(
          (response) => {
            res.status(200).json({ data: "Reject deleted" });
          }
        );
      }
    })
    .catch(next);
}; 