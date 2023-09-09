const express = require ('express');
const userRouter = express.Router();

const {
    signup,
    login
} = require ('../Controllers/user.controller');

// /auth/signup : post request : for registering new users to website
userRouter.post('/signup', signup);

// /auth/login : post request : for logging in the user and authenticating.
userRouter.post('/login', login);


module.exports = userRouter;