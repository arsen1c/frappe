import express, { Request, Response } from "express";
import userController from "controller/user.controller";
const Router = express.Router();

Router.get("/", (req: Request, res: Response) => { res.status(200).send("ok") });
Router.get("/find/:username", userController.getUser);
Router.get("/all", userController.getAllUsers);
Router.post("/create", userController.postUser);
Router.post("/login", userController.postUserLogin);
Router.get("/issues/:userid", userController.getIssueBook);
Router.post("/issue", userController.postIssueBook);
Router.delete("/issue", userController.deleteIssueBook);
Router.put("/update", userController.putUser);
Router.delete("/delete/:userid", userController.deleteUser);

export default Router;
