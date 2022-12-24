import { bookController } from "controller/book.controller";
import express, { Request, Response } from "express";
const Router = express.Router();

Router.get("/", (_req: Request, res: Response) => { res.status(200).send("ok") });
Router.get("/import", bookController.getBooks);
Router.get("/all", bookController.getAllBooks);
Router.get("/search/:bookname", bookController.getBook);
Router.get("/query", bookController.searchBooks);
Router.post("/import/single", bookController.importSingleBook);
Router.delete("/delete", bookController.deleteBook);

export default Router;
