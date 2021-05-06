const {
  AuthenticationService,
  JWTStrategy,
} = require("@feathersjs/authentication");
const { LocalStrategy } = require("@feathersjs/authentication-local");
const { expressOauth } = require("@feathersjs/authentication-oauth");
const { END_POINTS } = require("./api-end-points");
const mongoose = require("mongoose");

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register("jwt", new JWTStrategy());
  authentication.register("local", new LocalStrategy());

  app.use("/user/login", authentication, checkLoggedIn, updateUserToken);

  function checkLoggedIn(req, res, next) {
    if (res.data.user.token) {
      res.status(400).send({ error: "This user is already logged in." });
    } else {
      next();
    }
  }

  function updateUserToken(req, res, next) {
    const userService = app.service(END_POINTS.user);
    const patchQuery = {
      _id: mongoose.Types.ObjectId(res.data.user._id),
    };
    const patchObj = {
      token: res.data.accessToken,
    };
    userService
      .patch(patchQuery, patchObj)
      .then((patchRes) => {
        next();
      })
      .catch((err) => res.send({ err: err }));
  }
  app.configure(expressOauth());
};
