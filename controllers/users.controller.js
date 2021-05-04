const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

module.exports.create = (req, res, next) => {
  User.findOne({
    email: req.body.email
  })
  .then((user) => {
    if (user) {
      // Error if email is already in the database
      next(
        createError(400, {
          errors: {
            email: "This email is already in use"
          },
        })
        );
      } else {
        // User creation
        return User.create(req.body).then((user) => {
          res.status(201).json({
            access_token: jwt.sign({
                id: user.id,
              },
              process.env.JWT_SECRET || "changeme OK?", {
                expiresIn: "1d",
              }
            )
          });
        });
      }
    })
    .catch(next);
};

module.exports.get = (req, res, next) => {

  User.findById(req.currentUser)
    .then(user => {
      if (!user) {
        next(createError(404))
      } else {
        res.json(user)
      }
    })
}

module.exports.authenticate = (req, res, next) => {
  const {
    email,
    password
  } = req.body

  User.findOne({
      email
    })
    .then(user => {
      if (!user) {
        next(createError(404, {
          errors: {
            email: 'Email or password is incorrect'
          }
        }))
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              next(createError(404, {
                errors: {
                  email: 'Email or password is incorrect'
                }
              }))
            } else {
              res.json({
                access_token: jwt.sign({
                    id: user.id
                  },
                  process.env.JWT_SECRET || 'changeme OK?', {
                    expiresIn: '1d'
                  }
                )
              })
            }
          })
      }
    })
}

//revisar para update el perfil
module.exports.profileUpdate = (req, res, next) => {

  if(req.file){
    req.body.image = req.file.path;
  } 
  User.findOneAndUpdate({_id: req.currentUser})
    .then((user) => {
     
      if (!user) {
        next(createError(404));
        return;
      }
      Object.entries(req.body).forEach(([key, value]) => {
        user[key] = value;
      });
        return user.save(save).then((user) => res.json({ user }));
    })
    .catch(next);
}; 

//otra opción
module.exports.editProfile = (req, res, next) => {

  User.findOneAndUpdate({_id: req.currentUser}, {image: req.file.path})
    .then((user) => { 
      console.log(user)
      if (!user) {
        next(createError(404, "User not found"));
      } else {
        res.status(201).json({})
          
      }
    })
    .catch((error) => next(error));
};