import { bookController } from "controller/book.controller";
import express, { Request, Response } from "express";
const Router = express.Router();

Router.get("/", (_req: Request, res: Response) => { res.status(200).send("ok") });
Router.get("/import", bookController.getBooks);

export default Router;
