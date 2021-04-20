const mongoose = require("mongoose");

var express = require('express');
var router = express.Router();

const Property = require("../models/Property.model");
const Like = require("../models/Like.model");


module.exports.create = (req, res, next) => {
    res.render("properties/create");
};
  
module.exports.doCreate = (req, res, next) => {
    function renderWithErrors(errors) {
      res.status(400).json("properties/create", {
        errors: errors,
        product: req.body,
      });
    }
  
    Property.create(req.body)
    .then((product) => res.status(201).json(product))
      .catch((e) => {
        if (e instanceof mongoose.Error.ValidationError) {
          renderWithErrors(e.errors);
        } else {
          next(e);
        }

        /*
        Property.create(req.body)
        .then((product) => res.status(201).json(product))
        .catch(next);
        */
      });
};

module.exports.edit = (req, res, next) => {
    Property.findById(req.params.id)
      .then((property) => {
        if (
          !property ||
          property.owner.toString() !== req.currentUser.id.toString()
        ) {
          res.redirect("/");
        } else {
          res.json("/properties/${id}/edit", { property });
        }
      })
      .catch((e) => next(e));
};
  
module.exports.doEdit = (req, res, next) => {
    function renderWithErrors(errors) {
      res.status(400).json("/properties/${id}/edit", {
        errors: errors,
        product: req.body,
      });
    }
    Product.findById(req.params.id)
      .then((property) => {
        if (!property || property.owner.toString() !== req.currentUser.id.toString()) {
          res.redirect("/");
        } else {
          Object.entries(req.body).forEach(([k, v]) => (property[key] = value));
          return property.save().then(() => {
            res.json(`/properties/${req.params.id}`);
          });
        }
      })
      .catch((e) => {
        if (e instanceof mongoose.Error.ValidationError) {
          renderWithErrors(e.errors);
        } else {
          next(e);
        }
      });
};