const mongoose = require("mongoose");

var express = require('express');
var router = express.Router();

const Property = require("../models/Property.model");
const Like = require("../models/Like.model");


module.exports.create = (req, res, next) => {
  req.body.user = req.currentUser;

    Property.create(req.body)
    .then((property) => res.status(201).json(property))
      .catch((e);
};

//
/*module.exports.createProperty = catchAsync(async (req, res, next) => {
  if (!req.body.owner) req.body.owner = req.user.id;
  req.body.images = [];

  if (req.files.length !== 0) {
    req.body.images = req.files.map((element) => element.key);
  }

  const newProperty = await Property.create(req.body);

  res.status(201).json({
    status: 201,
    data: {
      property: newProperty,
    },
  });
});*/

//

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
    return property.save().then(() => res.json({/*property*/}));
    })
    .catch(next);
};
//
/*exports.updateProperty = catchAsync(async (req, res, next) => {
  if (req.files.length !== 0) {
    req.body.images = [];
    req.body.images = req.files.map((element) => element.key);
  }

  const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }); 
  //Arg "{new: true}" to return the modified document rathen than the original
  //Arg "runValidators: true" validate the update operation against the model's schema
  if (!property) {
    return next('No property found with that ID', 404);
  }

  res.status(200).json({
    status: 200,
    data: {
      property,
    },
  });
});*/
//

module.exports.deleteProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findByIdAndDelete(req.params.id);

  if (!property) {
    return next('No property found with that ID', 404);
  }

  res.status(204).json({
    status: 204,
    data: null,
  });
});