import express from "express";
import mongoose from "mongoose";

import { registerValidation, LoginValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

mongoose
  .connect(
    "mongodb+srv://admin:wwwwww@cluster0.hp8hyfv.mongodb.net/blog?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("DB ok");
  })
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.post("/auth/login", LoginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/posts", PostController.create);

app.listen(5000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
