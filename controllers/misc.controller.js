const createError = require('http-errors')
const Match = require('../models/Match.model')

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
  console.log("entra al controller")
  console.log(id, user)

  Match.findOne({ property: id, user })
    .then(property => {
      if (!property) {
        return Match.create({ property: id, user }).then(() => {
          res.status(201).json({ property });
        });
      } else {
        return Match.findOneAndDelete({  property: id, user}).then((response) =>{
          res.status(201).json({ response })
        })
      }
    })
    .catch(next);
}