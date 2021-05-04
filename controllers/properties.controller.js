const createError = require("http-errors");
const Property = require("../models/Property.model");
const Match = require("../models/Match.model");

module.exports.create = (req, res, next) => {
  req.body.owner = req.currentUser;
  req.body.images = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  console.log(req.body)
    Property.create(req.body)
    .then((property) => {
      console.log("creando")
      res.status(201).json(property)
    })
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
  
 //revisar si sirve esta quiero que me de el listado con todas las propiedades

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

  //controller renderize mi lista de matches

  module.exports.matchList = (req, res, next) => {
    Match.find( { $and: [ {match: true }, { $or: [ { userOne: req.currentUser }, { userTwo: req.currentUser } ] } ] } )
        .then((matchResponse) => {
          if (!matchResponse) {
            next(createError(404));
            return;
          }
          res.status(200).json({ matchResponse });
        }) .catch(next);
 };

 //me renderice las propiedades que yo he creado propiedades y las busque mi id

 module.exports.showMyProperties = (req, res, next) => {
  
  const owner = req.currentUser
  Property.findOne({owner})
  .then((property) => {
   
    if (!property) {
      next(createError(404));
      return;
    } else{
      res.status(200).json({ property });
    }
  }) .catch(next);
    };

    
    //controller de fecha (que me permita poner de esta fecha a esta fecha esta disponible )