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