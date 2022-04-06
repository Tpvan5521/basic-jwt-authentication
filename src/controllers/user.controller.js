const express = require("express");
const bcrypt = require("bcryptjs");
const userServices = require("../services/UserServices.js");

function doRegister(req, res, next) {
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(password, salt);
  userServices
    .register(req.body)
    .then(res.json({ success: true }))
    .catch((err) => next(err));
}

function doLogin(req, res, next) {
  const { username, password } = req.body;
  userServices
    .login({ username, password })
    .then((user) => {
      user
        ? res.json(user)
        : res.json({ error: "Username or password is incorrect" });
    })
    .catch((err) => next(err));
}

function getUser(req, res, next) {
  userServices
    .getUserById(req.params.userId)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

module.exports = {
  getUser,
  doLogin,
  doRegister,
};
