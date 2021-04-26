const createError = require("http-errors");
const Property = require("../models/Property.model");

module.exports.create = (req, res, next) => {
  req.body.user = req.currentUser;

    Property.create(req.body)
    .then((property) => res.status(201).json(property))
      .catch(next);
};

module.exports.get = (req, res, next) => {
  Property.findById(req.params.id)
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
     /* if (property.owner.toString() !== req.currentUser.toString()) {
        next(createError(403));
        return;
      }*/
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
    const criteria = {};
    const { search } = req.query;
  
    if (search) {
      criteria.name = new RegExp(search, "i");
    }
  
    Property.find(criteria)
      .then((properties) => res.json(properties))
      .catch(next);
  };
