const createError = require("http-errors");
const Property = require("../models/Property.model");
const Match = require("../models/Match.model");

module.exports.create = (req, res, next) => {
  if (req.files) {
    req.body.images = req.files.map((file) => file.path);
  }
    
  req.body.owner = req.currentUser;
  console.log(req.body)
    Property.create(req.body)
    .then((property) => {
      res.status(201).json(property)
    })
    .catch(next);
};


module.exports.get = (req, res, next) => {
  Property.findById(req.params.id)
    .populate("owner")
    .then(property => {
      if (!property) {
        next(createError(404, 'Property not found'))
      } else {
        res.json(property)
      }
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  if (req.file) {
    req.body.images = req.file.path;
  }
  Property.findById(req.params.id)
    .then((property) => {
      if (!property) {
        next(createError(404));
        return;
      }
     if (property.owner.toString() !== req.currentUser.toString()) {
        next(createError(403));
        return;
      }
      Object.entries(req.body).forEach(([key, value]) => {
        property[key] = value;
      });
      return property.save().then(() => res.json({ property}));
    })
    .catch(next);
};

module.exports.deleteProperty = (req, res, next) => {
Property.findOneAndDelete( {
  _id: req.params.id,
})
.then((property) => {
  if (!property) {
    next(createError(404));
    return;
  }
  res.status(204).json({ status: 204, data: null });
}) .catch(next);

  };



  module.exports.list = (req, res, next) => {
    console.log(req.currentUser)
    Property.find({ owner: { $ne: req.currentUser } })
      .then((properties) => {
        console.log("largo", properties.length)
        res.json(properties)
      }) 
      .catch(next);
  };



  module.exports.matchList = (req, res, next) => {
    Match.find({
      $and: [
        { match: true },
        { $or: [{ userOne: req.currentUser }, { userTwo: req.currentUser }] },
      ],
    })
      .populate("userOneProperty")
      .populate("userTwoProperty")
      .then((matchResponse) => {
        let response = [];
        matchResponse.forEach((match) => {
          if (match.userOne === req.currentUser) {
            response.push(match.userTwoProperty);
          } else {
            response.push(match.userOneProperty);
          }
        });
        if (!matchResponse) {
          next(createError(404));
          return;
        }
        res.status(200).json(response);
      })
      .catch(next);
 };


 module.exports.showMyProperties = (req, res, next) => {  
  const owner = req.currentUser
  Property.find({owner})
  .then((property) => {
   
    if (!property) {
      next(createError(404));
      return;
    } else{
      res.status(200).json(property);
    }
  }) .catch(next);
    };
