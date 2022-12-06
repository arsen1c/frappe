import express, { Request, Response } from "express";
import userController from "controller/user.controller";
const Router = express.Router();

Router.get("/", (req: Request, res: Response) => { res.status(200).send("ok") });
Router.get("/:username", userController.getUser);
Router.post("/create", userController.postUser);
Router.post("/login", userController.postUserLogin);
Router.get("/issue/:userid", userController.getIssueBook);
Router.post("/issue", userController.postIssueBook);

export default Router;
