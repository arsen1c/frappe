import mongoose from "mongoose";
import argon2 from "argon2";
import { IUserInput } from "../interfaces/user.interface";
import { logger } from "utils/logger";


/* User document interface */
export interface UserDocument extends IUserInput, mongoose.Document {
    booksIssued: mongoose.Schema.Types.ObjectId[];
    debt: number;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<Boolean>;
}

export interface IUserCreateInput {
    name: string;
    username: string;
    password: string;
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    booksIssued: { type: [mongoose.Schema.Types.ObjectId], ref: "Book" },
    debt: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false }
}, {
    timestamps: true
});

/* Hash the password before saving the user document */
UserSchema.pre("save", async function (next) {
    try {
        let user = this as UserDocument;

        // only run this is password is modified
        if (!user.isModified("password")) { return next() };

        logger.info("Hashing password")
        // hash the password
        const hash = await argon2.hash(user.password);
        // store the hashed password instead of plain text
        user.password = hash;

        logger.info("Password hashed succesfully");
        return next();
    } catch (error: any) {
        throw new Error(error);
    }
})

/* Add method on user model to compare passwords */
UserSchema.methods.comparePassword = async function (password: string): Promise<Boolean> {
    try {
        const user = this as UserDocument;

        // verify the plain text password with the hash password
        const isValid = await argon2.verify(user.password, password);

        return isValid;
    } catch (error: any) {
        throw new Error("Password did not match");
    }
}

export default mongoose.model<UserDocument>("User", UserSchema);