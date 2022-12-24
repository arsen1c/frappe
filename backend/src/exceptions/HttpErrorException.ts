export class HttpErrorException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    /* Custom Error messages */

    static unAuthorized(msg: string) {
        return new HttpErrorException(401, msg);
    }

    static booksAlreaydImported() {
        return new HttpErrorException(409, "Books already imported");
    }

    static resourceNotFound(message: string = "Not found") {
        return new HttpErrorException(404, message);
    }

    static alreadyExists(message: string = "Alreay exists") {
        return new HttpErrorException(403, message);
    }

    static forbidden(message: string = "Forbidden") {
        return new HttpErrorException(403, message);
    }
}