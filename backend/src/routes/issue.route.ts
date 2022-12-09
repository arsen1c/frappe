import express, { Request, Response } from "express";
import { issueController } from "controller/issue.controller";
const Router = express.Router();

Router.get("/all", issueController.getIssues);

export default Router;
