import { HttpErrorException } from "exceptions/HttpErrorException";
import { IUserInput } from "interfaces/user.interface";
import UserModel, { UserDocument } from "models/User.model";
import { logger } from "utils/logger";

export async function findUser(username: string) {
    try {
        const user = await UserModel.findOne({ username });
        // Reflect.deleteProperty(user, "password");

        return { ...user };
    } catch (error: any) {
        throw new Error("Could not find the user.");
    }
}

/* Add user to the database */
export async function createUser({ name, password, username }: IUserInput) {
    try {
        const userRecord = await UserModel.create<IUserInput>({ name, password, username });

        const user = userRecord.toObject();
        // Remove password property from user
        Reflect.deleteProperty(user, "password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function loginUser({ username, password }: { username: string, password: string }) {
    try {
        const userRecord = await UserModel.findOne<UserDocument>({ username });
        if (!userRecord) return HttpErrorException.unAuthorized("Username not found");

        logger.info("Checking password");
        const isValid = await userRecord.comparePassword(password);
        if (!isValid) return HttpErrorException.unAuthorized("Invalid Password");

        const user = userRecord.toObject();
        // Remove password property from the user object
        Reflect.deleteProperty(user, "password");

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}