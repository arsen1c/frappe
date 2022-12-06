import { NextFunction, Request, Response } from "express";
import { UserDocument } from "models/User.model";
import { createUser, findUser, loginUser } from "service/user.service";
import { logger } from "utils/logger";
import { z } from "zod";

const userController = {
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params;
            const user = await findUser(username);

            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    },

    /* Create new User in the database */
    async postUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, password, username } = req.body;

            logger.info("Validating user input for register.")
            // Input validation schema
            const InputValidation = z.object({
                name: z.string({ required_error: "Name is required. " }),
                username: z.string({ required_error: "Username is required. " }),
                password: z.string({ required_error: "Password is required. " })
            })

            InputValidation.parse({ name, username, password });
            logger.info("User input validated");

            const user = await createUser({ name, password, username });

            logger.info(`User ${user.username} created.`)
            res.status(201).json({ status: "success", data: user });
        } catch (error: any) {
            next(error);
        }
    },

    /* Login user */
    async postUserLogin(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info("Validating user input for login");
            const { username, password } = req.body;

            /* Input validation */
            const LoginInputValidatoin = z.object({
                username: z.string({ required_error: "Name is required" }),
                password: z.string({ required_error: "Password is required" })
            })

            LoginInputValidatoin.parse({ username, password });
            logger.info("User inputs are valid.")

            const user = await loginUser({ username, password });

            res.status(200).json(user);
        } catch (error: any) {
            next(error);
        }
    }
}

export default userController;